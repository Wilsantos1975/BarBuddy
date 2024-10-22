const db = require('../db/index');

const saveBatchRecipe = async (eventId, batchRecipe) => {
  try {
    const savedRecipe = await db.one(
      'INSERT INTO batch_recipes (event_id, name, ingredients, total_volume, notes, dilution) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [eventId, batchRecipe.name, JSON.stringify(batchRecipe.ingredients), batchRecipe.totalVolume, batchRecipe.notes, batchRecipe.dilution]
    );
    return savedRecipe;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  saveBatchRecipe
};

