import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ConfirmationModal from './Common/ConfirmationModal';

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

  if (ingredient.quantity.toString().includes('dash')) {
    const dashCount = ingredient.quantity === 'dash' ? '1' : ingredient.quantity.replace('dash', '');
    return `${ingredient.name}: ${dashCount} ${dashCount === '1' ? 'dash' : 'dashes'}`;
  }

  let quantity = 0;
  if (typeof ingredient.quantity === 'number') {
    quantity = ingredient.quantity;
  } else if (typeof ingredient.quantity === 'string') {
    quantity = parseFloat(ingredient.quantity) || 0;
  }

  return `${ingredient.name}: ${quantity.toFixed(2)} ${ingredient.unit || 'oz'}`;
};

const defaultIngredient = { name: '', quantity: '', unit: 'oz' };

const inputClassNames = "p-2 border border-[#C1AC9A] rounded-lg focus:ring-2 focus:ring-[#51657D] focus:border-transparent";

const buttonClassNames = (color = '[#51657D]', textColor = '[#EBDFC7]') => 
  `p-2 bg-${color} text-${textColor} rounded-lg hover:bg-${color}/90 transition-colors`;

const handleFormField = (setter) => (e) => setter(e.target.value);

function BatchCalculator() {
  const location = useLocation();
  const prePopulatedData = location.state || {};
  
  const [isFromFeatured] = useState(!!prePopulatedData.fromFeatured);

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (prePopulatedData.cocktailName) {
      setCocktailName(prePopulatedData.cocktailName);
    }
    if (prePopulatedData.ingredients && prePopulatedData.ingredients.length > 0) {
      setIngredients(prePopulatedData.ingredients);
    }
  }, [prePopulatedData]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: 'oz' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleIngredientChange = (index, field) => (e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = e.target.value;
    setIngredients(newIngredients);
  };

  const calculateBatch = () => {
    console.log('Calculating batch with:', {
      ingredients,
      scaleQuantity,
      dilution
    });

    if (!ingredients.length) {
      console.log('No ingredients found');
      return;
    }

    const batchedIngredients = ingredients.map(ing => {
      const quantity = parseFloat(ing.quantity) || 0;
      return {
        name: ing.name,
        quantity: quantity * (parseFloat(scaleQuantity) || 1),
        unit: ing.unit || 'oz'
      };
    });

    const totalVolume = batchedIngredients.reduce((sum, ing) => sum + ing.quantity, 0);

    setBatchResult({
      cocktailName: cocktailName || 'Batched Cocktail',
      ingredients: batchedIngredients,
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

  const resetForm = () => ({
    cocktailName: '',
    ingredients: [defaultIngredient],
    scaleType: 'servings',
    scaleQuantity: '',
    scaleUnit: 'oz',
    dilution: 0,
    notes: '',
    batchResult: null,
    customDilution: '',
    saveError: null
  });

  const handleClearForm = () => {
    const defaultState = resetForm();
    Object.entries(defaultState).forEach(([key, value]) => {
      const setter = eval(`set${key.charAt(0).toUpperCase() + key.slice(1)}`);
      setter(value);
    });
  };

  const handleBatchAnother = () => {
    setShowConfirmModal(false);
    handleClearForm();
  };

  const handleGoToDashboard = () => {
    setShowConfirmModal(false);
    navigate('/dashboard');
  };

  const saveCocktailToAPI = async (cocktailData) => {
    try {
        // Make sure all required fields are present
        const transformedCocktailData = {
            strDrink: cocktailData.strDrink,
            strDrinkThumb: cocktailData.strDrinkThumb,
            ingredients: cocktailData.ingredients,
            instructions: cocktailData.instructions,
            glass: cocktailData.glass,
            category: cocktailData.category,
            isBatched: true,
            scaleType: cocktailData.scaleType, // 'servings' or 'volume'
            servings: cocktailData.scaleType === 'servings' ? cocktailData.numberOfServings : null,
            totalVolume: cocktailData.scaleType === 'volume' ? cocktailData.totalVolume : null,
            batchUnit: cocktailData.scaleType === 'volume' ? cocktailData.volumeUnit : null
        };

        // Log the data being sent for debugging
        console.log('Sending cocktail data:', {
            userId: 1, // Replace with actual user ID when auth is implemented
            external_cocktail_id: cocktailData.idDrink,
            cocktail_data: transformedCocktailData
        });

        const response = await fetch('http://localhost:3000/cocktails/saved', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 1, // Replace with actual user ID when auth is implemented
                external_cocktail_id: cocktailData.idDrink,
                cocktail_data: transformedCocktailData
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save cocktail');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in saveCocktailToAPI:', error);
        throw error;
    }
};

  const saveCocktail = async () => {
    try {
        if (!batchResult) {
            throw new Error('No batch result available to save');
        }

        // Get the original image if it exists from the prePopulatedData
        const strDrinkThumb = prePopulatedData.strDrinkThumb || null;

        // Prepare the cocktail data
        const cocktailData = {
            idDrink: `batch_${Date.now()}`,
            strDrink: batchResult.cocktailName,
            strDrinkThumb: strDrinkThumb, // Use the original image if available
            ingredients: batchResult.ingredients,
            instructions: notes || 'Combine all ingredients according to the batched recipe.',
            glass: prePopulatedData.strGlass || 'Batch Container',
            category: prePopulatedData.strCategory || 'Batched Cocktail',
            isBatched: true,
            scaleType: scaleType,
            servings: scaleType === 'servings' ? parseInt(scaleQuantity) : null,
            numberOfServings: scaleType === 'servings' ? parseInt(scaleQuantity) : null,
            totalVolume: scaleType === 'volume' ? parseFloat(scaleQuantity) : batchResult.totalVolume,
            batchUnit: scaleType === 'volume' ? scaleUnit : null,
            cocktail_data: {  // Add nested cocktail_data structure
                strDrinkThumb: strDrinkThumb,
                strDrink: batchResult.cocktailName,
                isBatched: true,
                scaleType: scaleType,
                servings: scaleType === 'servings' ? parseInt(scaleQuantity) : null,
                numberOfServings: scaleType === 'servings' ? parseInt(scaleQuantity) : null,
                totalVolume: scaleType === 'volume' ? parseFloat(scaleQuantity) : batchResult.totalVolume,
                batchUnit: scaleType === 'volume' ? scaleUnit : null
            }
        };

        await saveCocktailToAPI(cocktailData);
        setShowConfirmModal(true);
        console.log('Cocktail saved successfully');
        
    } catch (error) {
        console.error('Error saving cocktail:', error);
        setSaveError(error.message);
    }
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
              onChange={handleIngredientChange(index, 'name')}
              className={`${inputClassNames} flex-grow mr-2`}
              placeholder="Ingredient name"
            />
            <select
              value={ingredient.quantity}
              onChange={handleIngredientChange(index, 'quantity')}
              className={`${inputClassNames} w-28 mr-2`}
            >
              <option value="">Select</option>
              <option value="0.25">1/4 oz</option>
              <option value="0.5">1/2 oz</option>
              <option value="0.75">3/4 oz</option>
              <option value="1">1 oz</option>
              <option value="1.25">1 1/4 oz</option>
              <option value="1.5">1 1/2 oz</option>
              <option value="1.75">1 3/4 oz</option>
              <option value="2">2 oz</option>
              <option value="2.25">2 1/4 oz</option>
              <option value="2.5">2 1/2 oz</option>
              <option value="2.75">2 3/4 oz</option>
              <option value="3">3 oz</option>
              <option value="3.25">3 1/4 oz</option>
              <option value="3.5">3 1/2 oz</option>
              <option value="3.75">3 3/4 oz</option>
              <option value="4">4 oz</option>
            </select>
            <select
              value={ingredient.unit}
              onChange={handleIngredientChange(index, 'unit')}
              className={`${inputClassNames} mr-2`}
            >
              {['oz', 'ml', 'dash'].map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <button 
              onClick={() => removeIngredient(index)} 
              className={buttonClassNames('red-500')}
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          onClick={addIngredient} 
          className={buttonClassNames()}
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
          className={buttonClassNames()}
        >
          Calculate Batch
        </button>

        <button 
          onClick={handleClearForm}
          className={buttonClassNames('red-500')}
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
            className={`${buttonClassNames()} ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving your cocktail...' : 'Save Batched Cocktail'}
          </button>
          {saveError && <p className="text-red-500 mt-2">{saveError}</p>}
        </div>
      )}

      <ConfirmationModal 
        isOpen={showConfirmModal}
        title="Recipe Saved Successfully!"
        message="Your batched cocktail has been saved. What would you like to do next?"
        primaryAction={handleBatchAnother}
        secondaryAction={handleGoToDashboard}
        primaryButtonText="Batch Another"
        secondaryButtonText="Go to Dashboard"
      />
    </div>
  );
}

export default BatchCalculator;
