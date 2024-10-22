const express = require('express');
const batchRecipes = express.Router();
const db = require('../db/index');

// ... (keep existing routes)

batchRecipes.post('/save', async (req, res) => {
  try {
    const { event_id, cocktail_id, name, ingredients, total_volume, notes, dilution } = req.body;
    const newBatchRecipe = await db.one(
      'INSERT INTO batch_recipes (event_id, cocktail_id, name, ingredients, total_volume, notes, dilution) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [event_id, cocktail_id, name, ingredients, total_volume, notes, dilution]
    );
    res.status(201).json(newBatchRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = batchRecipes;

