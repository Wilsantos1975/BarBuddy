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
    const savedCocktails = await getSavedCocktails(userId);
    res.json({
      success: true,
      data: savedCocktails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Save a cocktail
router.post('/save', async (req, res) => {
  try {
    const { userId, cocktailId, isBatched, batchSize } = req.body;
    
    // Validate required fields
    if (!userId || !cocktailId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: userId and cocktailId are required' 
      });
    }

    const savedCocktail = await saveCocktail({
      user_id: userId,
      cocktail_id: cocktailId,
      is_batched: isBatched || false,
      batch_size: batchSize || null
    });

    res.status(201).json({
      success: true,
      data: savedCocktail
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
    await deleteSavedCocktail(userId, cocktailId);
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

module.exports = router;
