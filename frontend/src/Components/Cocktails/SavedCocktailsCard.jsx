import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzUxNjU3RCIvPjwvc3ZnPg==';
const BATCH_DEFAULT_IMAGE = 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg';

function SavedCocktailsCard() {
    const [savedCocktails, setSavedCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const userId = 1; // Replace with actual user ID

    useEffect(() => {
        fetchSavedCocktails();
    }, []);

    const fetchSavedCocktails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cocktails/saved/${userId}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch saved cocktails');
            }
            
            setSavedCocktails(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (cocktailId) => {
        try {
            setDeleteLoading(true);
            const response = await fetch(`http://localhost:3000/cocktails/saved/${cocktailId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete cocktail');
            }

            // Remove the deleted cocktail from state
            setSavedCocktails(prevCocktails => 
                prevCocktails.filter(cocktail => cocktail.idDrink !== cocktailId)
            );
        } catch (error) {
            console.error('Delete error:', error);
            setError(error.message);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (loading) return <div>Loading saved cocktails...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!savedCocktails.length) return <div>No saved cocktails found.</div>;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-bb-dark">Saved Cocktails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCocktails.map((cocktail) => (
                    <div key={cocktail.idDrink || cocktail.id} className="bg-white rounded-lg shadow p-4">
                        <img 
                            src={cocktail.isBatched ? 
                                (cocktail.strDrinkThumb || BATCH_DEFAULT_IMAGE) : 
                                (cocktail.strDrinkThumb || DEFAULT_IMAGE)
                            } 
                            alt={cocktail.strDrink} 
                            className="w-full h-48 object-cover rounded-lg mb-2"
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                // If the first image fails, try the fallback
                                if (e.target.src !== cocktail.strDrinkThumbFallback && cocktail.strDrinkThumbFallback) {
                                    e.target.src = cocktail.strDrinkThumbFallback;
                                } else {
                                    // If both fail, use the default image
                                    e.target.src = DEFAULT_IMAGE;
                                }
                            }}
                        />
                        <h3 className="text-lg font-semibold">{cocktail.strDrink}</h3>
                        
                        {cocktail.isBatched && (
                            <div className="mt-1 mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#51657D] text-white">
                                    Batched Recipe
                                </span>

                            </div>
                        )}
                        
                        <div className="flex gap-2 mt-2">
                            <Link 
                                to={`/saved-cocktails/${cocktail.idDrink}`}
                                className="flex-1 px-4 py-2 rounded bg-[#51657D] text-white hover:bg-[#51657D]/80 text-center"
                            >
                                View Details
                            </Link>
                            <button 
                                onClick={() => handleDelete(cocktail.idDrink)}
                                disabled={deleteLoading}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SavedCocktailsCard;