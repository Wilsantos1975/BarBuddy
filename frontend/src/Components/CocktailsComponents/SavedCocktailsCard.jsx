import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";
import ConfirmationModal from "../Common/ConfirmationModal";

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${API_URL}/cocktails/saved/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch saved cocktails");
      }

      setSavedCocktails(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cocktailId) => {
    try {
      setDeleteLoading(true);
      const response = await fetch(`${API_URL}/cocktails/saved/${cocktailId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete cocktail");
      }

      // Remove the deleted cocktail from state
      setSavedCocktails((prevCocktails) =>
        prevCocktails.filter((cocktail) => cocktail.idDrink !== cocktailId)
      );
    } catch (error) {
      console.error("Delete error:", error);
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

  // Helper function to get cocktail display data
  const getCocktailData = (cocktail, field) => {
    return cocktail[field] || cocktail.cocktail_data?.[field];
  };

  // Helper function for batch information display
  const renderBatchInfo = (cocktail) => {
    const isBatched = getCocktailData(cocktail, "isBatched");
    if (!isBatched) return null;

    return (
      <div className="mt-1 mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#51657D] text-white">
          Batched Recipe
        </span>
        <p className="text-sm text-gray-600 mt-1">
          {getCocktailData(cocktail, "scaleType") === "servings" ? (
            <>
              Servings:{" "}
              {getCocktailData(cocktail, "servings") ||
                getCocktailData(cocktail, "numberOfServings")}
            </>
          ) : (
            <>
              Total Volume: {getCocktailData(cocktail, "totalVolume")}{" "}
              {getCocktailData(cocktail, "batchUnit")}
            </>
          )}
        </p>
      </div>
    );
  };

  // Helper function for cocktail image
  const renderCocktailImage = (cocktail) => {
    const imageUrl = getCocktailData(cocktail, "strDrinkThumb");
    const cocktailName = getCocktailData(cocktail, "strDrink");

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

  // Helper function for rendering a single cocktail card
  const renderCocktailCard = (cocktail) => (
    <div
      key={cocktail.idDrink || cocktail.id}
      className="bg-white rounded-lg shadow p-4"
    >
      {renderCocktailImage(cocktail)}

      <h3 className="text-lg font-semibold">
        {getCocktailData(cocktail, "strDrink")}
      </h3>

      {renderBatchInfo(cocktail)}

      <div className="button-container">
        <Link
          to={`/saved-cocktails/${
            cocktail.idDrink || cocktail.external_cocktail_id
          }`}
          className="btn-primary"
        >
          <FaEye className="text-2xl" />
          <span>View Details</span>
        </Link>
        <button
          onClick={() => confirmDelete(cocktail)}
          className="btn-secondary"
          disabled={deleteLoading}
        >
          <FaTimes className="text-2xl" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );

  if (loading) return <div>Loading saved cocktails...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!savedCocktails.length) return <div>No saved cocktails found.</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-bb-dark">Saved Cocktails</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedCocktails.map(renderCocktailCard)}
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
