import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function FeaturedCocktailDetails() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isBatchSave, setIsBatchSave] = useState(false);
  const [batchSize, setBatchSize] = useState('');
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

  // Confirmation Modal
  const ConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-[#1E1C1A]">Save Recipe</h3>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isBatchSave}
              onChange={(e) => setIsBatchSave(e.target.checked)}
              className="mr-2"
            />
            <span className="text-[#1E1C1A]">Save as Batch Recipe</span>
          </label>
          
          {isBatchSave && (
            <input
              type="number"
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
              placeholder="Enter batch size"
              className="w-full p-2 border border-[#C1AC9A] rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#51657D] text-[#EBDFC7] rounded-lg hover:bg-[#51657D]/90 transition-colors"
          >
            Confirm Save
          </button>
        </div>
      </div>
    </div>
  );

  const handleSaveClick = () => {
    setShowConfirmModal(true);
  };

  const handleSaveRecipe = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
        const response = await fetch('http://localhost:3000/cocktails/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1, // Replace with actual user ID
                cocktailId: parseInt(cocktail.idDrink),
                isBatched: isBatchSave,
                batchSize: isBatchSave ? parseInt(batchSize) : null
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to save recipe');
        }

        setSaveSuccess(true);
        setIsSaved(true);
        setShowConfirmModal(false);
        navigate('/');
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleSaveRecipe}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-lg p-8 border border-[#C1AC9A]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="md:w-1/3">
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="w-full rounded-lg shadow-md"
            />
            
            {/* Save Recipe Button */}
            <div className="mt-4">
              <button
                onClick={isSaved ? handleUnsaveRecipe : handleSaveClick}
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
              {saveError && (
                <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {saveError}
                </div>
              )}
            </div>
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
  );
}

export default FeaturedCocktailDetails;

