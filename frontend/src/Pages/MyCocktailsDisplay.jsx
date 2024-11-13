import React from 'react';
import MyCocktails from '../Components/Cocktails/SavedCocktails';  

function MyCocktailsDisplay() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Cocktails</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <MyCocktails />
      </div>
    </div>
  );
}


export default MyCocktailsDisplay;
