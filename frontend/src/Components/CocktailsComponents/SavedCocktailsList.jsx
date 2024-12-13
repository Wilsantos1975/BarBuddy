import React from 'react';
import SavedCocktailCard from './SavedCocktailCard';

function SavedCocktailsList({ title, cocktails, onDelete }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-bb-dark">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cocktails.map((cocktail) => (
          <SavedCocktailCard
            key={cocktail.idDrink || cocktail.id}
            cocktail={cocktail}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedCocktailsList;
