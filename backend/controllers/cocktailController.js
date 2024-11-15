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
router.post('/save', async (req, res) => {
  try {
    const { userId, cocktailId, cocktailData } = req.body;
    
    // Validate required fields
    if (!userId || !cocktailId || !cocktailData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: userId, cocktailId, and cocktailData are required' 
      });
    }

    const savedCocktail = await db.one(`
      INSERT INTO user_saved_cocktails 
        (user_id, external_cocktail_id, cocktail_data)
      VALUES 
        ($1, $2, $3)
      RETURNING *
    `, [userId, cocktailId.toString(), cocktailData]);

    res.status(201).json({
      success: true,
      data: savedCocktail
    });
  } catch (error) {
    console.error('Error saving cocktail:', error);
    // Check for unique constraint violation
    if (error.code === '23505') { // unique_violation
      res.status(400).json({
        success: false,
        error: 'This cocktail is already saved'
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
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
            SELECT cocktail_data 
            FROM user_saved_cocktails 
            WHERE external_cocktail_id = $1
        `, [cocktailId]);
        
        if (!cocktail) {
            return res.status(404).json({
                success: false,
                error: 'Cocktail not found'
            });
        }
        
        res.json({
            success: true,
            data: cocktail.cocktail_data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
