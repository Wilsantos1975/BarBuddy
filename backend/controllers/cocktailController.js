const express = require('express');
const router = express.Router();
const db = require('../db');

const { saveCocktail, getSavedCocktails, deleteSavedCocktail } = require('../queries/cocktailQueries');

// Get all cocktails
router.get('/', async (req, res) => {
  try {
    const cocktails = await db.any(`
      SELECT * FROM cocktails
      ORDER BY created_at DESC
    `);
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cocktail of the week
router.get('/cocktail-of-week', async (req, res) => {
  try {
    const cocktailOfWeek = await db.oneOrNone(`
      SELECT * FROM cocktails
      WHERE is_cocktail_of_week = TRUE
      LIMIT 1
    `);
    res.json(cocktailOfWeek);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved cocktails for a user
router.get('/saved/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const savedCocktails = await db.any(`
      SELECT * FROM user_saved_cocktails
      WHERE user_id = $1
      ORDER BY created_at DESC
    `, [userId]);

    res.json({
      success: true,
      data: savedCocktails.map(saved => ({
        ...saved.cocktail_data,
        idDrink: saved.external_cocktail_id,
        saved_at: saved.created_at
      }))
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Save a cocktail
router.post('/saved', async (req, res) => {
    try {
        const { userId, external_cocktail_id, cocktail_data } = req.body;
        
        // Validate required fields
        if (!userId || !external_cocktail_id || !cocktail_data) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Insert into database
        const result = await db.one(`
            INSERT INTO user_saved_cocktails 
            (user_id, external_cocktail_id, cocktail_data)
            VALUES ($1, $2, $3)
            RETURNING id
        `, [userId, external_cocktail_id, cocktail_data]);

        res.json({
            success: true,
            data: {
                id: result.id,
                message: 'Cocktail saved successfully'
            }
        });

    } catch (error) {
        console.error('Error saving cocktail:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a saved cocktail
router.delete('/saved/:cocktailId', async (req, res) => {
  try {
    const { cocktailId } = req.params;
    const userId = 1; // Replace with actual user ID from auth
    
    await db.none(`
      DELETE FROM user_saved_cocktails 
      WHERE user_id = $1 AND external_cocktail_id = $2
    `, [userId, cocktailId.toString()]);

    res.json({
      success: true,
      message: 'Cocktail removed from saved list'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get saved cocktail details by ID
router.get('/saved/details/:id', async (req, res) => {
    try {
        const cocktailId = req.params.id;
        const cocktail = await db.oneOrNone(`
            SELECT cocktail_data, external_cocktail_id 
            FROM user_saved_cocktails 
            WHERE external_cocktail_id = $1
        `, [cocktailId]);
        
        if (!cocktail) {
            return res.status(404).json({
                success: false,
                error: 'Cocktail not found'
            });
        }

        // Format the response data
        const formattedData = {
            ...cocktail.cocktail_data,
            idDrink: cocktail.external_cocktail_id,
            strDrinkThumb: cocktail.cocktail_data.strDrinkThumb || null
        };
        
        console.log('Formatted cocktail data:', formattedData);
        
        res.json({
            success: true,
            data: formattedData
        });
    } catch (error) {
        console.error('Error fetching cocktail details:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Add this new endpoint after your other routes
router.post('/saved/check', async (req, res) => {
  try {
    const { user_id, cocktail_name, is_batched } = req.body;
    
    // Check for existing cocktail with the same name for this user
    const existingCocktail = await db.oneOrNone(`
      SELECT id FROM user_saved_cocktails 
      WHERE user_id = $1 
      AND cocktail_data->>'strDrink' = $2
      AND cocktail_data->>'isBatched' = $3
    `, [user_id, cocktail_name, is_batched.toString()]);
    
    res.json({
      success: true,
      exists: !!existingCocktail
    });
  } catch (error) {
    console.error('Error checking for existing cocktail:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
