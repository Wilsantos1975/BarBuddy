import React from 'react';
import { Link } from 'react-router-dom';
import djParty from "../../assets/DJ party-bro.svg";

function LandingHero() {
  return (
    <div className="landing-container bg-white">
      <div className="hero-content px-4 md:px-8">
        <div className="hero-text">
          <h1 className="hero-title text-4xl md:text-6xl">BarBuddy</h1>
          <h2 className="hero-subtitle text-xl md:text-2xl">Bartender's digital guide</h2>
          <p className="hero-description text-gray-600">
            Your ultimate companion for crafting perfect cocktails and managing bar events. 
            From recipe calculations to event planning, we've got you covered.
          </p>
          <div className="button-group mt-8">
            <Link to="/dashboard" className="cta-button">
              Get Started
            </Link>
            <Link to="/features" className="secondary-button">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src={djParty} 
            alt="Cocktail Party Illustration" 
            className="hero-image w-full max-w-[500px] md:max-w-[600px]"
          />
          <div className="attribution text-center">
            <a href="https://storyset.com/happy" className="attribution-link text-sm">
              Happy illustrations by Storyset
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingHero;