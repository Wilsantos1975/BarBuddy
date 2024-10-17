const express = require('express');
const recipes = express.Router();

const { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../queries/recipeQueries');

recipes.get('/', async (req, res) => {
  try {
    const allRecipes = await getAllRecipes();
    console.log('All recipes:', allRecipes);
    res.json(allRecipes);
  } catch (error) {
    console.error('Error in GET /recipes:', error);
    res.status(500).json({ error: error.message });
  }
});

recipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  console.log(recipe);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

recipes.post('/', async (req, res) => {
  const newRecipe = req.body;
  const createdRecipe = await createRecipe(newRecipe);
  res.json(createdRecipe);
});

recipes.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;
  const recipe = await updateRecipe(id, updatedRecipe);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

recipes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedRecipe = await deleteRecipe(id);
  if (deletedRecipe) {
    res.json(deletedRecipe, { message: 'Recipe deleted successfully' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

module.exports = recipes;




