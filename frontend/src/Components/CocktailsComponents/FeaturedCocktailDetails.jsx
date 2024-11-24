import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function FeaturedCocktailDetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const cocktail = location.state?.cocktail;
  console.log(cocktail);

  if (!cocktail) {
    return (
      <div className="text-center p-8">
        <p className="text-[#1E1C1A]">No cocktail data available</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 bg-[#51657D] text-[#EBDFC7] px-4 py-2 rounded-lg hover:bg-[#51657D]/90 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSaveRecipe = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
        // Transform the cocktail data to match your backend's expected format
        const transformedCocktailData = {
            strDrink: cocktail.strDrink,
            strDrinkThumb: cocktail.strDrinkThumb,
            ingredients: [],
            instructions: cocktail.strInstructions,
            glass: cocktail.strGlass,
            category: cocktail.strCategory,
            isBatched: true,
            scaleType: scaleType, // 'servings' or 'volume'
            servings: scaleType === 'servings' ? numberOfServings : null,
            totalVolume: scaleType === 'volume' ? totalVolume : null,
            batchUnit: scaleType === 'volume' ? volumeUnit : null,
        };

        // Extract and transform ingredients
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            
            if (ingredient && measure) {
                // Parse the measure to extract quantity and unit
                const measureParts = measure.trim().split(' ');
                const quantity = parseFloat(measureParts[0]) || 1;
                const unit = measureParts[1]?.toLowerCase() === 'oz' ? 'oz' : 'ml';

                transformedCocktailData.ingredients.push({
                    name: ingredient,
                    quantity: quantity,
                    unit: unit
                });
            }
        }

        const response = await fetch('http://localhost:3000/cocktails/saved', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1, // Replace with actual user ID
                external_cocktail_id: cocktail.idDrink,
                cocktail_data: transformedCocktailData
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            setSaveSuccess(true);
            setIsSaved(true);
            setTimeout(() => {
                setShowConfirmModal(false);
                navigate('/dashboard');
            }, 2000);
        } else {
            throw new Error(data.error || 'Failed to save recipe');
        }
    } catch (error) {
        console.error('Error saving recipe:', error);
        setSaveError(error.message);
    } finally {
        setIsSaving(false);
    }
  };

  const handleUnsaveRecipe = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(`http://localhost:3000/cocktails/saved/${cocktail.idDrink}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unsave recipe');
      }

      setIsSaved(false);
      setSaveSuccess(false);
    } catch (error) {
      console.error('Error unsaving recipe:', error);
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Create ingredients array (existing code)
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  const handleBatchCalculator = () => {
    // Format ingredients for the batch calculator
    const formattedIngredients = ingredients.map(item => ({
      name: item.ingredient,
      quantity: parseFloat(item.measure) || 1, // Default to 1 if measure is not a number
      unit: 'oz'
    }));

    // Navigate to batch calculator with cocktail data
    navigate('/batch-calculator', {
      state: {
        cocktailName: cocktail.strDrink,
        ingredients: formattedIngredients,
        scaleQuantity: '1',
        fromFeatured: true,
        strDrinkThumb: cocktail.strDrinkThumb
      }
    });
  };

  // Simplified ConfirmationModal component
  const ConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#1E1C1A]">
                {saveSuccess ? 'Success!' : 'Save Recipe'}
            </h3>
            
            {saveSuccess ? (
                <div className="text-green-600 mb-4">
                    Recipe saved successfully!
                </div>
            ) : (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isSaving}
                        className="px-4 py-2 bg-[#51657D] text-[#EBDFC7] rounded-lg hover:bg-[#51657D]/90 transition-colors"
                    >
                        {isSaving ? 'Saving...' : 'Confirm Save'}
                    </button>
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="md:w-1/3">
              {cocktail.strDrinkThumb ? (
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="w-full h-auto rounded-lg shadow-md object-cover"
                  onError={(e) => {
                    e.target.src = '/default-cocktail.png'; // Add a default image
                    e.target.onerror = null; // Prevent infinite loop
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              <div className="mt-4 space-y-2">
                {/* Save Recipe Button */}
                <button
                  onClick={isSaved ? handleUnsaveRecipe : handleSaveRecipe}
                  disabled={isSaving}
                  className={`w-full px-6 py-2 rounded-lg transition-colors ${
                    isSaved 
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : saveSuccess 
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-[#51657D] text-[#EBDFC7] hover:bg-[#51657D]/90'
                  } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSaving 
                    ? 'Processing...' 
                    : isSaved 
                      ? 'Unsave Recipe' 
                      : saveSuccess 
                        ? 'Recipe Saved!' 
                        : 'Save Recipe'}
                </button>

                {/* Batch Calculator Button */}
                <button
                  onClick={handleBatchCalculator}
                  className="w-full px-6 py-2 rounded-lg bg-[#51657D] text-[#EBDFC7] hover:bg-[#51657D]/90 transition-colors"
                >
                  Batch Cocktail
                </button>
              </div>
              
              {saveError && (
                <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {saveError}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-4 text-[#1E1C1A]">{cocktail.strDrink}</h1>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#51657D]">Ingredients:</h2>
                <ul className="list-disc list-inside text-[#1E1C1A]">
                  {ingredients.map((item, index) => (
                    <li key={index}>
                      {item.measure} {item.ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#51657D]">Instructions:</h2>
                <p className="text-[#1E1C1A]">{cocktail.strInstructions}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#51657D]">Details:</h2>
                <p className="text-[#1E1C1A]">Glass: {cocktail.strGlass}</p>
                <p className="text-[#1E1C1A]">Category: {cocktail.strCategory}</p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="bg-[#51657D] text-[#EBDFC7] px-6 py-2 rounded-lg hover:bg-[#51657D]/90 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCocktailDetails;

