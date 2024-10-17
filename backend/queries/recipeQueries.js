const db = require('../db/index');

const getAllRecipes = async () => {
  try {
    const recipes = await db.any('SELECT * FROM recipes');
    console.log('Recipes fetched:', recipes);
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

const getRecipeById = async (id) => {
  try {
    const recipe = await db.one('SELECT * FROM recipes WHERE id = $1', id);
    return recipe;
  } catch (error) {
    throw error;
  }
};

const createRecipe = async (recipe) => {
  try {
    const newRecipe = await db.one(
      'INSERT INTO recipes (name, ingredients, total_volume, notes, dilution) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [recipe.name, JSON.stringify(recipe.ingredients), recipe.totalVolume, recipe.notes, recipe.dilution]
    );
    return newRecipe;
  } catch (error) {
    throw error;
  }
};

const updateRecipe = async (id, recipe) => {
  try {
    const updatedRecipe = await db.one(
      'UPDATE recipes SET name = $1, ingredients = $2, total_volume = $3, notes = $4, dilution = $5 WHERE id = $6 RETURNING *',
      [recipe.name, JSON.stringify(recipe.ingredients), recipe.totalVolume, recipe.notes, recipe.dilution, id]
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
};

const deleteRecipe = async (id) => {
  try {
    const deletedRecipe = await db.one('DELETE FROM recipes WHERE id = $1 RETURNING *', id);
    return deletedRecipe;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
