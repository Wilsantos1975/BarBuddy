import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MyCocktails() {
  const [cocktail, setCocktail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCocktailDetails();
  }, [id]);

  const fetchCocktailDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cocktails/${id}`);
      const data = await response.json();
      setCocktail(data);
    } catch (error) {
      console.error('Error fetching cocktail details:', error);
    }
  };

  if (!cocktail) return <div>Loading...</div>;

  return (
    <div className="cocktail-view">
      <h2>{cocktail.name}</h2>
      <img src={cocktail.image} alt={cocktail.name} />
      <p>{cocktail.description}</p>
      <h3>Recipe:</h3>
      <p>{cocktail.recipe}</p>
      {cocktail.is_batched && (
        <div className="batch-info">
          <h3>Batch Information:</h3>
          <p>Batch Size: {cocktail.batch_size}</p>
        </div>
      )}
    </div>
  );
}

export default MyCocktails;