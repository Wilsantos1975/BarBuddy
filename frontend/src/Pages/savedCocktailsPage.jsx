import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SavedCocktailsList from '../Components/CocktailsComponents/SavedCocktailsList';

function SavedCocktails() {
    const [savedCocktails, setSavedCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = 1;

    useEffect(() => {
        const fetchSavedCocktails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/cocktails/saved/list/${userId}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch saved cocktails');
                }
                
                console.log('Raw saved cocktails data:', data);
                const cocktailsData = data.data;
                console.log('Processed saved cocktails data:', cocktailsData);
                setSavedCocktails(cocktailsData);
            } catch (err) {
                console.error('Error fetching saved cocktails:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSavedCocktails();
    }, [userId]);

    const handleDelete = async (cocktailId) => {
        try {
            const response = await fetch(`http://localhost:3000/cocktails/saved/delete/${cocktailId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete saved cocktail');
            }
            
            console.log('Saved cocktail deleted successfully');
            setSavedCocktails(savedCocktails.filter(cocktail => cocktail.idDrink !== cocktailId));
        } catch (err) {
            console.error('Error deleting saved cocktail:', err);
            setError(err.message);
        }
    };

    if (loading) return <div>Loading saved cocktails...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!savedCocktails.length) return <div>No saved cocktails found.</div>;

    return (
        <SavedCocktailsList
            title="Saved Cocktails"
            cocktails={savedCocktails}
            onDelete={handleDelete}
        />
    );
}

export default SavedCocktails;