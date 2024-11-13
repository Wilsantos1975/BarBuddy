// import React, { useState, useEffect } from 'react';

// function RecipeList() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/recipes');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setRecipes(data);
//     } catch (e) {
//       setError('Could not fetch recipes: ' + e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading recipes...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Recipes</h2>
//       {recipes.length === 0 ? (
//         <p>No recipes found.</p>
//       ) : (
//         <ul>
//           {recipes.map((recipe) => (
//             <li key={recipe.id}>{recipe.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default RecipeList;