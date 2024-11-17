import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const calculateBatchedIngredients = (ingredients, scaleQuantity) => {
  return ingredients.map(ingredient => ({
    ...ingredient,
    quantity: parseFloat(ingredient.quantity) * parseFloat(scaleQuantity)
  }));
};

const addDilution = (batchedIngredients, dilutionPercentage) => {
  let totalVolume = batchedIngredients.reduce((sum, ingredient) => sum + ingredient.quantity, 0);
  let dilutionAmount = 0;

  if (dilutionPercentage > 0) {
    dilutionAmount = totalVolume * (dilutionPercentage / 100);
    batchedIngredients.push({ name: 'Water', quantity: dilutionAmount, unit: 'oz' });
    totalVolume += dilutionAmount;
  }

  return { batchedIngredients, totalVolume };
};

const formatIngredient = (ingredient) => {
  if (!ingredient || typeof ingredient !== 'object') return '';

  let quantity = 0;
  if (typeof ingredient.quantity === 'number') {
    quantity = ingredient.quantity;
  } else if (typeof ingredient.quantity === 'string') {
    quantity = parseFloat(ingredient.quantity) || 0;
  }

  return `${ingredient.name}: ${quantity.toFixed(2)} ${ingredient.unit || 'oz'}`;
};

function BatchCalculator() {
  const location = useLocation();
  const prePopulatedData = location.state || {};
  


  const [cocktailName, setCocktailName] = useState(prePopulatedData.cocktailName || '');
  const [ingredients, setIngredients] = useState(
    prePopulatedData.ingredients || [{ name: '', quantity: '', unit: 'oz' }]
  );
  const [scaleType, setScaleType] = useState('servings');
  const [scaleQuantity, setScaleQuantity] = useState(prePopulatedData.scaleQuantity || '1');
  const [scaleUnit, setScaleUnit] = useState('oz');
  const [dilution, setDilution] = useState(0);
  const [notes, setNotes] = useState('');
  const [batchResult, setBatchResult] = useState(null);
  const [customDilution, setCustomDilution] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (prePopulatedData.cocktailName) {
      setCocktailName(prePopulatedData.cocktailName);
    }
    if (prePopulatedData.ingredients && prePopulatedData.ingredients.length > 0) {
      setIngredients(prePopulatedData.ingredients);
    }
    if (prePopulatedData.scaleQuantity) {
      setScaleQuantity(prePopulatedData.scaleQuantity);
    }
  }, [prePopulatedData]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: 'oz' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const calculateBatch = () => {
    console.log('Calculating batch with:', {
      ingredients,
      scaleQuantity,
      dilution
    });

    const missingData = {
      hasIngredients: ingredients.length > 0 && ingredients.every(ing => ing.name && ing.quantity),
      scaleQuantity: scaleQuantity.trim() !== ''
    };

    console.log('Missing required data:', missingData);

    if (!missingData.hasIngredients || !missingData.scaleQuantity) {
      alert('Please fill in all required fields (ingredients and scale quantity)');
      return;
    }

    let batchedIngredients = calculateBatchedIngredients(ingredients, scaleQuantity);

    const { batchedIngredients: finalIngredients, totalVolume } = addDilution(
      batchedIngredients,
      parseFloat(customDilution || dilution)
    );

    setBatchResult({
      cocktailName: cocktailName || 'Batched Cocktail',
      ingredients: finalIngredients,
      totalVolume,
      notes
    });
  };

  const renderBatchResult = () => {
    if (!batchResult) return null;

    return (
      <section className="mt-8 p-6 bg-[#EBDFC7] rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#1E1C1A]">
          Batched Recipe: {batchResult.cocktailName}
        </h2>
        <h3 className="text-xl font-semibold mb-2 text-[#1E1C1A]">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4 text-[#1E1C1A]">
          {batchResult.ingredients.map((ingredient, index) => (
            <li key={index}>{formatIngredient(ingredient)}</li>
          ))}
        </ul>
        <p className="font-semibold text-[#51657D]">
          Total Volume: {batchResult.totalVolume.toFixed(2)} oz
        </p>
        {batchResult.notes && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-[#1E1C1A]">Notes:</h3>
            <p className="text-[#1E1C1A]">{batchResult.notes}</p>
          </div>
        )}
      </section>
    );
  };

  const handleDilutionChange = (value) => {
    setDilution(Number(value));
    setCustomDilution('');
  };

  const handleCustomDilutionChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setCustomDilution(value);
      setDilution(Number(value));
    }
  };

  const saveCocktail = async () => {
    if (!batchResult) return;
    
    try {
        setIsSaving(true);
        setSaveError(null);
        
        const cocktailData = {
            strDrink: batchResult.cocktailName,
            strInstructions: notes,
            isBatched: true,
            dateCreated: new Date().toISOString(),
            ingredients: batchResult.ingredients.map(ing => ({
                name: ing.name,
                quantity: parseFloat(ing.quantity) || 0,
                unit: ing.unit
            })),
            batchDetails: {
                scaleQuantity: scaleQuantity,
                scaleUnit: scaleUnit,
                dilution: parseFloat(dilution) || 0,
                totalVolume: batchResult.totalVolume
            },
            strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
            strDrinkThumbFallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzUxNjU3RCIvPjwvc3ZnPg==',
            totalVolume: batchResult.totalVolume,
            batchUnit: 'oz'
        };

        const response = await fetch('http://localhost:3000/cocktails/saved', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 1,
                external_cocktail_id: `batch_${Date.now()}`,
                cocktail_data: cocktailData
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save cocktail');
        }

        alert('Batched cocktail saved successfully!');
        handleClearForm();
    } catch (error) {
        console.error('Error saving cocktail:', error);
        setSaveError(`Failed to save cocktail: ${error.message}`);
    } finally {
        setIsSaving(false);
    }
  };

  const handleClearForm = () => {
    setCocktailName('');
    setIngredients([{ name: '', quantity: '', unit: 'oz' }]);
    setScaleType('servings');
    setScaleQuantity('');
    setScaleUnit('oz');
    setDilution(0);
    setNotes('');
    setBatchResult(null);
    setCustomDilution('');
    setSaveError(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-[#EBDFC7]">
      <h1 className="text-3xl font-bold mb-6 text-[#1E1C1A]">Batch Cocktail Calculator</h1>

      {/* Step 1: Cocktail Name */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-[#1E1C1A]">Step 1: Enter Cocktail Name</h2>
        <input
          type="text"
          value={cocktailName}
          onChange={(e) => setCocktailName(e.target.value)}
          className="w-full p-2 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
          placeholder="Cocktail Name"
        />
      </section>

      {/* Step 2: Add Ingredients */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-[#1E1C1A]">Step 2: Add Ingredients</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
              className="flex-grow p-2 border border-[#C1AC9A] rounded-lg mr-2 focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
              placeholder="Ingredient name"
            />
            <input
              type="number"
              value={ingredient.quantity}
              onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
              className="w-20 p-2 border border-[#C1AC9A] rounded-lg mr-2 focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
              placeholder="Quantity"
            />
            <select
              value={ingredient.unit}
              onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
              className="p-2 border border-[#C1AC9A] rounded-lg mr-2 focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
            >
              <option value="oz">oz</option>
              <option value="ml">ml</option>
              <option value="cl">cl</option>
            </select>
            <button 
              onClick={() => removeIngredient(index)} 
              className="p-2 bg-red-500 text-[#EBDFC7] rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          onClick={addIngredient} 
          className="mt-2 p-2 bg-[#51657D] text-[#EBDFC7] rounded-lg hover:bg-[#51657D]/90 transition-colors"
        >
          Add Ingredient
        </button>
      </section>

      {/* Step 3: Scale Recipe */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-[#1E1C1A]">Step 3: Scale Recipe</h2>
        <div className="flex mb-2 text-[#1E1C1A]">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              value="servings"
              checked={scaleType === 'servings'}
              onChange={() => setScaleType('servings')}
              className="mr-2 text-[#51657D] focus:ring-[#51657D]"
            /> 
            Scale by Number of Servings
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="volume"
              checked={scaleType === 'volume'}
              onChange={() => setScaleType('volume')}
              className="mr-2 text-[#51657D] focus:ring-[#51657D]"
            /> 
            Scale by Total Volume
          </label>
        </div>
        <div className="flex">
          <input
            type="number"
            value={scaleQuantity}
            onChange={(e) => setScaleQuantity(e.target.value)}
            className="w-20 p-2 border border-[#C1AC9A] rounded-lg mr-2 focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
            placeholder="Quantity"
          />
          {scaleType === 'volume' && (
            <select
              value={scaleUnit}
              onChange={(e) => setScaleUnit(e.target.value)}
              className="p-2 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
            >
              <option value="oz">oz</option>
              <option value="ml">ml</option>
              <option value="L">L</option>
              <option value="gal">gal</option>
            </select>
          )}
        </div>
      </section>

      {/* Step 4: Add Dilution */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-[#1E1C1A]">Step 4: Add Dilution (Optional)</h2>
        <div className="flex flex-col space-y-2 text-[#1E1C1A]">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="0"
              checked={dilution === 0 && customDilution === ''}
              onChange={() => handleDilutionChange(0)}
              className="mr-2 text-[#51657D] focus:ring-[#51657D]"
            />
            <span>0% (No Dilution)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="18"
              checked={dilution === 18 && customDilution === ''}
              onChange={() => handleDilutionChange(18)}
              className="mr-2 text-[#51657D] focus:ring-[#51657D]"
            />
            <span>18% (Spirit-Driven Cocktails)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="25"
              checked={dilution === 25 && customDilution === ''}
              onChange={() => handleDilutionChange(25)}
              className="mr-2 text-[#51657D] focus:ring-[#51657D]"
            />
            <span>25% (Shaken Cocktails)</span>
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              checked={customDilution !== ''}
              onChange={() => {}}
              className="mr-2 text-[#51657D] focus:ring-[#51657D]"
            />
            <input
              type="number"
              value={customDilution}
              onChange={handleCustomDilutionChange}
              className="ml-2 w-20 p-2 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
              placeholder="Custom %"
              min="0"
              max="100"
            />
            <span className="ml-2">% (Custom)</span>
          </div>
        </div>
      </section>

      {/* Step 5: Add Recipe Notes */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-[#1E1C1A]">Step 5: Add Recipe Notes (Optional)</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent"
          placeholder="Add any notes here..."
          maxLength={500}
        />
      </section>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={calculateBatch} 
          className="p-2 bg-[#51657D] text-[#EBDFC7] rounded-lg hover:bg-[#51657D]/90 transition-colors flex-1"
        >
          Calculate Batch
        </button>

        <button 
          onClick={handleClearForm}
          className="p-2 bg-red-500 text-[#EBDFC7] rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Form
        </button>
      </div>

      {/* Results Section */}
      {renderBatchResult()}

      {/* Save Recipe Button */}
      {batchResult && (
        <div className="mt-4">
          <button
            onClick={saveCocktail}
            disabled={isSaving}
            className={`p-2 bg-[#51657D] text-[#EBDFC7] rounded-lg hover:bg-[#51657D]/90 transition-colors ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving your cocktail...' : 'Save Batched Cocktail'}
          </button>
          {saveError && <p className="text-red-500 mt-2">{saveError}</p>}
        </div>
      )}
    </div>
  );
}

export default BatchCalculator;
