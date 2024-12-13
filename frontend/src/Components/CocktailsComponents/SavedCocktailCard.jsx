import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTimes } from 'react-icons/fa';
import ConfirmationModal from '../Common/ConfirmationModal';

function SavedCocktailCard({ cocktail, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getCocktailData = (field) => {
    return cocktail[field] || cocktail.cocktail_data?.[field];
  };

  const renderBatchInfo = () => {
    const isBatched = getCocktailData("isBatched");
    if (!isBatched) return null;

    return (
      <div className="mt-1 mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#51657D] text-white">
          Batched Recipe
        </span>
        <p className="text-sm text-gray-600 mt-1">
          {getCocktailData("scaleType") === "servings" ? (
            <>
              Servings:{" "}
              {getCocktailData("servings") ||
                getCocktailData("numberOfServings")}
            </>
          ) : (
            <>
              Total Volume: {getCocktailData("totalVolume")}{" "}
              {getCocktailData("batchUnit")}
            </>
          )}
        </p>
      </div>
    );
  };

  const renderCocktailImage = () => {
    const imageUrl = getCocktailData("strDrinkThumb");
    const cocktailName = getCocktailData("strDrink");

    if (!imageUrl) {
      return (
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      );
    }

    return (
      <img
        src={imageUrl}
        alt={cocktailName}
        className={`w-full h-48 object-cover rounded-lg mb-2 ${
          imageLoading ? "animate-pulse bg-gray-200" : ""
        }`}
        onLoad={() => setImageLoading(false)}
        onError={(e) => {
          setImageLoading(false);
          e.target.src = "/default-cocktail.png";
          e.target.onerror = null;
        }}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {renderCocktailImage()}

      <h3 className="text-lg font-semibold">
        {getCocktailData("strDrink")}
      </h3>

      {renderBatchInfo()}

      <div className="button-container">
        <Link
          to={`/saved-cocktails/${cocktail.idDrink || cocktail.external_cocktail_id}`}
          className="btn-primary"
        >
          <FaEye className="text-2xl" />
          <span>View Details</span>
        </Link>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="btn-secondary"
        >
          <FaTimes className="text-2xl" />
          <span>Delete</span>
        </button>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this cocktail?"
        primaryAction={() => {
          onDelete(cocktail.idDrink);
          setShowDeleteModal(false);
        }}
        secondaryAction={() => setShowDeleteModal(false)}
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
      />
    </div>
  );
}

export default SavedCocktailCard;