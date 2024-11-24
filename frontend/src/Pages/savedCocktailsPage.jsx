import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SavedCocktailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/cocktails/saved/details/${id}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch cocktail details');
                }
                
                console.log('Raw cocktail data:', data);
                const cocktailData = data.data;
                console.log('Processed cocktail data:', cocktailData);
                setCocktail(cocktailData);
            } catch (err) {
                console.error('Error fetching cocktail:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCocktailDetails();
        }
    }, [id]);

    const renderIngredients = () => {
        if (!cocktail || !cocktail.ingredients) return null;

        return (
            <ul className="list-disc list-inside text-[#1E1C1A]">
                {cocktail.ingredients.map((item, index) => {
                    const quantity = isNaN(item.quantity) ? 0 : Number(item.quantity);
                    return (
                        <li key={index}>
                            {item.name}: {quantity.toFixed(2)} {item.unit}
                        </li>
                    );
                })}
            </ul>
        );
    };

    if (loading) return <div className="text-center p-8">Loading cocktail details...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    if (!cocktail) return <div className="text-center p-8">No cocktail data available</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#C1AC9A]">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        {cocktail.strDrinkThumb ? (
                            <img
                                src={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                className="w-full h-auto rounded-lg shadow-md object-cover"
                                onError={(e) => {
                                    e.target.src = '/default-cocktail.png';
                                    e.target.onerror = null;
                                }}
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400">No image available</span>
                            </div>
                        )}
                    </div>

                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-4 text-[#1E1C1A]">
                            {cocktail.strDrink}
                        </h1>
                        
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-[#51657D]">
                                Ingredients:
                            </h2>
                            {renderIngredients()}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-[#51657D]">
                                Instructions:
                            </h2>
                            <p className="text-[#1E1C1A]">
                                {cocktail.instructions}
                            </p>
                        </div>

                        {/* Only show these details for regular cocktails */}
                        {!cocktail.isBatched && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2 text-[#51657D]">
                                    Details:
                                </h2>
                                <p className="text-[#1E1C1A]">Glass: {cocktail.glass}</p>
                                <p className="text-[#1E1C1A]">Category: {cocktail.category}</p>
                            </div>
                        )}

                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-[#51657D] text-white rounded-lg hover:bg-[#51657D]/90"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SavedCocktailsPage;