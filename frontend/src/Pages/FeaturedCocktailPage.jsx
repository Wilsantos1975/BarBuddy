import { useLocation } from 'react-router-dom';
import FeaturedCocktailDetails from '../Components/CocktailsComponents/FeaturedCocktailDetails';

const FeaturedCocktailPage = () => {
    const location = useLocation();
    const cocktail = location.state?.cocktail;

    return (
        <FeaturedCocktailDetails cocktail={cocktail} />
    );
};

export default FeaturedCocktailPage;

