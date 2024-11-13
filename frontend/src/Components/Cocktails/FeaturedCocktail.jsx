import React from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturedCocktail({ cocktail }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (cocktail) {
      navigate('/featured-cocktail', { state: { cocktail } });
    }
  };

  return (
    <div 
      className="mt-8 bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <h2 className="text-2xl font-bold mb-4">Cocktail of the Week</h2>
      {cocktail ? (
        <div className="flex flex-col items-center">
          {cocktail.strDrinkThumb && (
            <img 
              src={cocktail.strDrinkThumb} 
              alt={cocktail.strDrink} 
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
          )}
          <p className="text-xl font-semibold">{cocktail.strDrink}</p>
          <p className="text-gray-600 mt-2">Click to view details</p>
        </div>
      ) : (
        <p>Loading cocktail...</p>
      )}
    </div>
  );
}

export default FeaturedCocktail;
