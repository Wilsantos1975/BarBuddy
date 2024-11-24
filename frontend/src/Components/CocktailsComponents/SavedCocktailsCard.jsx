import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../Common/ConfirmationModal';

function SavedCocktailsCard() {
    const [savedCocktails, setSavedCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [cocktailToDelete, setCocktailToDelete] = useState(null);
    const [imageLoading, setImageLoading] = useState(true);
    const userId = 1;

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

    const confirmDelete = (cocktail) => {
        setCocktailToDelete(cocktail);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = async () => {
        if (cocktailToDelete) {
            await handleDelete(cocktailToDelete.idDrink);
            setShowDeleteModal(false);
            setCocktailToDelete(null);
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
                        {cocktail.strDrinkThumb || cocktail.cocktail_data?.strDrinkThumb ? (
                            <img 
                                src={cocktail.strDrinkThumb || cocktail.cocktail_data?.strDrinkThumb} 
                                alt={cocktail.strDrink || cocktail.cocktail_data?.strDrink} 
                                className={`w-full h-48 object-cover rounded-lg mb-2 ${
                                    imageLoading ? 'animate-pulse bg-gray-200' : ''
                                }`}
                                onLoad={() => setImageLoading(false)}
                                onError={(e) => {
                                    setImageLoading(false);
                                    e.target.src = '/default-cocktail.png';
                                    e.target.onerror = null;
                                }}
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                                <span className="text-gray-400">No image available</span>
                            </div>
                        )}
                        
                        <h3 className="text-lg font-semibold">
                            {cocktail.strDrink || cocktail.cocktail_data?.strDrink}
                        </h3>
                        
                        {(cocktail.isBatched || cocktail.cocktail_data?.isBatched) && (
                            <div className="mt-1 mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#51657D] text-white">
                                    Batched Recipe
                                </span>
                                <p className="text-sm text-gray-600 mt-1">
                                    {(cocktail.scaleType === 'servings' || cocktail.cocktail_data?.scaleType === 'servings') ? (
                                        <>Servings: {cocktail.servings || cocktail.cocktail_data?.servings || cocktail.numberOfServings || cocktail.cocktail_data?.numberOfServings}</>
                                    ) : (
                                        <>Total Volume: {cocktail.totalVolume || cocktail.cocktail_data?.totalVolume} {cocktail.batchUnit || cocktail.cocktail_data?.batchUnit}</>
                                    )}
                                </p>
                            </div>
                        )}
                        
                        <div className="flex gap-2 mt-2">
                            <Link 
                                to={`/saved-cocktails/${cocktail.idDrink || cocktail.external_cocktail_id}`}
                                className="flex-1 px-4 py-2 rounded bg-[#51657D] text-white hover:bg-[#51657D]/80 text-center"
                            >
                                View Details
                            </Link>
                            <button 
                                onClick={() => confirmDelete(cocktail)}
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                disabled={deleteLoading}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmationModal 
                isOpen={showDeleteModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this cocktail?"
                primaryAction={handleDeleteConfirmed}
                secondaryAction={() => setShowDeleteModal(false)}
                primaryButtonText="Delete"
                secondaryButtonText="Cancel"
            />
        </div>
    );
}

export default SavedCocktailsCard;