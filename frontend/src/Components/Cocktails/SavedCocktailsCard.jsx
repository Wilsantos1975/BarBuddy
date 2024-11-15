import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SavedCocktailsCard() {
    const [savedCocktails, setSavedCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                            src={cocktail.strDrinkThumb} 
                            alt={cocktail.strDrink} 
                            className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <h3 className="text-lg font-semibold">{cocktail.strDrink}</h3>
                        <Link 
                            to={`/saved-cocktails/${cocktail.idDrink}`}
                            className="mt-2 inline-block px-4 py-2 rounded bg-[#51657D] text-white hover:bg-[#51657D]/80"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SavedCocktailsCard;