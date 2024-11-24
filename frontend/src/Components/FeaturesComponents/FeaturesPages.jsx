import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalculator, FaBookmark, FaSearch, FaFlask, FaGlassMartini } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-[#EBDFC7] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#C1AC9A]">
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-[#51657D] bg-white rounded-full">
      {icon}
    </div>
    <h3 className="mb-3 text-xl font-semibold text-[#51657D] text-center">{title}</h3>
    <p className="text-[#6B5C4D] text-center">{description}</p>
  </div>
);

const FeaturesPages = () => {
  const navigate = useNavigate();

  const handleCalculatorClick = () => {
    navigate('/batch-calculator');
  };

  const features = [
    {
      icon: <FaCalculator className="w-8 h-8" />,
      title: "Batch Calculator",
      description: "Easily scale up your cocktail recipes for parties or events with our precise batching calculator."
    },
    {
      icon: <FaBookmark className="w-8 h-8" />,
      title: "Save YourCocktails",
      description: "Store your favorite cocktail recipes and batched calculations for future reference."
    },
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Cocktail Search",
      description: "Explore our extensive database of cocktail recipes and find your next favorite drink."
    },
    {
      icon: <MdOutlineScience className="w-8 h-8" />,
      title: "Dilution Control",
      description: "Calculate precise dilution rates for perfectly balanced batched cocktails."
    },
    {
      icon: <FaFlask className="w-8 h-8" />,
      title: "Unit Conversion",
      description: "Seamlessly convert between different measurement units (oz, ml, cl) for accurate recipes."
    },
    {
      icon: <FaGlassMartini className="w-8 h-8" />,
      title: "Smart Recommendations",
      description: "Get personalized cocktail suggestions based on your preferences and past favorites."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-16 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#51657D] mb-6">
          Features That Make Your Events Better
        </h1>
        <p className="text-xl text-[#6B5C4D] max-w-2xl mx-auto">
          Discover how our tools can help you create perfectly batched cocktails for any occasion
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      {/* Updated Call to Action */}
      <div className="max-w-7xl mx-auto text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
          Ready to Start Batching?
        </h2>
        <button 
          onClick={handleCalculatorClick}
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300"
        >
          Try Batch Calculator
        </button>
      </div>

      {/* Additional Info */}
      <div className="max-w-3xl mx-auto mt-20 text-center px-4">
        <p className="text-[#6B5C4D] italic">
          "Perfect for professional bartenders and home enthusiasts alike. 
          Our tools help you create consistently excellent batched cocktails every time."
        </p>
      </div>
    </div>
  );
};

export default FeaturesPages;
