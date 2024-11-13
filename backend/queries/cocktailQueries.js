const db = require('../db');

const saveCocktail = async (cocktailData) => {
    try {
        const { user_id, cocktail_id, is_batched, batch_size } = cocktailData;
        
        const query = `
            INSERT INTO user_saved_cocktails 
            (user_id, cocktail_id, is_batched, batch_size) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (user_id, cocktail_id) 
            DO UPDATE SET 
                is_batched = $3,
                batch_size = $4
            RETURNING *
        `;
        
        const result = await db.one(query, [
            user_id,
            cocktail_id,
            is_batched,
            batch_size
        ]);
        
        return result;
    } catch (error) {
        console.error('Database error in saveCocktail:', error);
        throw error;
    }
};

const getSavedCocktails = async (userId) => {
    try {
        return await db.any(`
            SELECT 
                usc.*,
                c.*
            FROM user_saved_cocktails usc
            LEFT JOIN cocktails c ON c.id = usc.cocktail_id
            WHERE usc.user_id = $1
        `, [userId]);
    } catch (error) {
        throw error;
    }
};

const deleteSavedCocktail = async (userId, cocktailId) => {
    try {
        return await db.one(
            'DELETE FROM user_saved_cocktails WHERE user_id = $1 AND cocktail_id = $2 RETURNING *',
            [userId, cocktailId]
        );
    } catch (error) {
        throw error;
    }
};

module.exports = {
    saveCocktail,
    getSavedCocktails,
    deleteSavedCocktail
};
