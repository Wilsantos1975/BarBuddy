import React from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturedCocktail({ cocktail }) {
  const navigate = useNavigate();
  console.log('cocktail', cocktail);
  
  const handleClick = () => {
    if (cocktail) {
      navigate('/featured-cocktail', { 
        state: { cocktail } 
      });
    }
  };

  return (
    <div 
      className="mt-8 p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow border border-[#C1AC9A] relative h-64 overflow-hidden"
      onClick={handleClick}
    >
      {/* Background Image with Overlay */}
      {cocktail?.strDrinkThumb && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${cocktail.strDrinkThumb})`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <h2 className="text-2xl font-bold mb-4 text-white">Featured Cocktail</h2>
        
        {cocktail ? (
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-white">{cocktail.strDrink}</p>
            <p className="text-white/80 mt-2">Click to view details</p>
          </div>
        ) : (
          <p className="text-white">Loading cocktail... Please wait.</p>
        )}
      </div>
    </div>
  );
}

export default FeaturedCocktail;
