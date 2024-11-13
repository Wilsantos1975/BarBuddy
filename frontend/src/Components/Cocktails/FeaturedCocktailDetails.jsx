import React from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturedCocktailDetails({ cocktail }) {
  const navigate = useNavigate();

  if (!cocktail) {
    return (
      <div className="text-center p-8">
        <p>No cocktail data available</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Create an array of ingredients from the cocktail object
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* ... rest of your JSX ... */}
      </div>
    </div>
  );
}

// Add this default export
export default FeaturedCocktailDetails;
