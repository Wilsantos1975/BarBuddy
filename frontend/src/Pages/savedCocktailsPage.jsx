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
                
                setCocktail(data.data);
                console.log('Fetched cocktail:', data.data);
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

    if (loading) return <div className="text-center p-8">Loading cocktail details...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    if (!cocktail) {
        return (
            <div className="text-center p-8">
                <p className="text-[#1E1C1A]">No cocktail data available</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 rounded bg-[#51657D] text-white hover:bg-[#51657D]/80"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    // Create ingredients array
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#C1AC9A]">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Section */}
                    <div className="md:w-1/3">
                        <img
                            src={cocktail.strDrinkThumb}
                            alt={cocktail.strDrink}
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-4 text-[#1E1C1A]">
                            {cocktail.strDrink}
                        </h1>
                        
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-[#51657D]">
                                Ingredients:
                            </h2>
                            <ul className="list-disc list-inside text-[#1E1C1A]">
                                {ingredients.map((item, index) => (
                                    <li key={index}>
                                        {item.measure} {item.ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-[#51657D]">
                                Instructions:
                            </h2>
                            <p className="text-[#1E1C1A]">{cocktail.strInstructions}</p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-[#51657D]">
                                Details:
                            </h2>
                            <p className="text-[#1E1C1A]">Glass: {cocktail.strGlass}</p>
                            <p className="text-[#1E1C1A]">Category: {cocktail.strCategory}</p>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 rounded bg-[#51657D] text-white hover:bg-[#51657D]/80"
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