const express = require('express');
const router = express.Router();
const db = require('../db');

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

// Get saved cocktails for a user (including batch information)
router.get('/saved/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const savedCocktails = await db.any(`
      SELECT 
        sr.id as saved_recipe_id,
        c.*,
        sr.is_batched,
        br.batch_size,
        br.created_at as batch_created_at
      FROM saved_recipes sr
      JOIN cocktails c ON sr.cocktail_id = c.id
      LEFT JOIN batch_recipes br ON (
        br.cocktail_id = c.id AND 
        br.user_id = sr.user_id AND 
        sr.is_batched = true
      )
      WHERE sr.user_id = $1
      ORDER BY sr.created_at DESC
    `, [userId]);
    res.json(savedCocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save a cocktail (regular or batched)
router.post('/save', async (req, res) => {
  try {
    const { userId, cocktailId, isBatched, batchSize } = req.body;
    
    // Start a transaction
    return await db.tx(async t => {
      // Check if recipe is already saved
      const existing = await t.oneOrNone(`
        SELECT id FROM saved_recipes 
        WHERE user_id = $1 AND cocktail_id = $2
      `, [userId, cocktailId]);

      if (existing) {
        return res.status(400).json({ error: 'Recipe already saved' });
      }

      // Save the recipe
      const savedRecipe = await t.one(`
        INSERT INTO saved_recipes (user_id, cocktail_id, is_batched)
        VALUES ($1, $2, $3)
        RETURNING id
      `, [userId, cocktailId, isBatched]);

      // If it's a batch recipe, save batch information
      if (isBatched && batchSize) {
        await t.none(`
          INSERT INTO batch_recipes (user_id, cocktail_id, batch_size)
          VALUES ($1, $2, $3)
        `, [userId, cocktailId, batchSize]);
      }

      return res.json({ 
        id: savedRecipe.id, 
        message: 'Cocktail saved successfully' 
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a saved cocktail
router.delete('/saved/:savedRecipeId', async (req, res) => {
  try {
    const { savedRecipeId } = req.params;
    
    await db.tx(async t => {
      // Get the recipe details first
      const recipe = await t.oneOrNone(`
        SELECT user_id, cocktail_id, is_batched 
        FROM saved_recipes 
        WHERE id = $1
      `, [savedRecipeId]);

      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      // If it's batched, remove from batch_recipes
      if (recipe.is_batched) {
        await t.none(`
          DELETE FROM batch_recipes 
          WHERE user_id = $1 AND cocktail_id = $2
        `, [recipe.user_id, recipe.cocktail_id]);
      }

      // Remove from saved_recipes
      await t.none(`
        DELETE FROM saved_recipes WHERE id = $1
      `, [savedRecipeId]);
    });

    res.json({ message: 'Cocktail removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
