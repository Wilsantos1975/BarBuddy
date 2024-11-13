import React, { useState, useEffect } from 'react';

function SavedCocktails() {
  const [savedCocktails, setSavedCocktails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = 1; // Replace with actual user ID from authentication

  const fetchSavedCocktails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/cocktails/saved/${userId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      
      if (result.success) {
        setSavedCocktails(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch saved cocktails');
      }
  
    } catch (error) {
      console.error('Error fetching saved cocktails:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedCocktails();
  }, [userId]); // Add userId as dependency

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Saved Cocktails</h2>
      {savedCocktails.length === 0 ? (
        <p>No saved cocktails yet.</p>
      ) : (
        <div className="grid-container">
          {savedCocktails.map((cocktail) => (
            <div 
              key={cocktail.cocktail_id}
              className="bg-white p-4 rounded-lg shadow"
            >
              {cocktail.strDrinkThumb && (
                <img 
                  src={cocktail.strDrinkThumb} 
                  alt={cocktail.strDrink} 
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{cocktail.strDrink}</h3>
              <p className="text-gray-600">{cocktail.strCategory}</p>
              {cocktail.is_batched && (
                <p className="text-sm text-gray-500">
                  Batch size: {cocktail.batch_size}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedCocktails;