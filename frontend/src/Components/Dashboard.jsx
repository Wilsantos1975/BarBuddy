import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeaturedCocktail from "./CocktailsComponents/FeaturedCocktail";
import EventList from "./EventsComponents/EventList";
import SavedCocktails from "./CocktailsComponents/SavedCocktailsCard";
import { buttonClasses } from '../Styles/buttonStyles';


function Dashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedCocktails, setSavedCocktails] = useState([]);
  const [cocktailOfWeek, setCocktailOfWeek] = useState(null);
  const userId = 1; // Replace with actual user ID from authentication

  useEffect(() => {
    fetchUserEvents();
    fetchSavedCocktails();
    fetchCocktailOfWeek();
  }, []);

  // Updated fetchData function to handle cocktailDB API differently
  const fetchData = async (url, options = {}) => {
    // Special handling for cocktailDB API
    if (url.includes('thecocktaildb.com')) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }

    // Original handling for your backend API
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options
    };

    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
    return response.json();
  };

  // Helper function for error handling
  const handleApiError = (error, customMessage) => {
    console.error(customMessage, error);
    setError(error.message);
  };

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchData('http://localhost:3000/events');
      setEvents(data);
    } catch (err) {
      handleApiError(err, "Error fetching events:");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedCocktails = async () => {
    try {
      const data = await fetchData(`http://localhost:3000/cocktails/saved/${userId}`);
      setSavedCocktails(data);
    } catch (error) {
      handleApiError(error, 'Error fetching saved cocktails:');
    }
  };

  // Updated fetchCocktailOfWeek function
  const fetchCocktailOfWeek = async () => {
    try {
      const data = await fetchData('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      if (data.drinks?.[0]) {
        setCocktailOfWeek(data.drinks[0]);
      }
    } catch (error) {
      handleApiError(error, 'Error fetching cocktail:');
      // Set a default cocktail or handle the error gracefully
      setCocktailOfWeek(null);
    }
  };

  const handleEventAction = async (eventId, action) => {
    try {
      const options = action === 'cancel' 
        ? {
            method: 'PUT',
            body: JSON.stringify({ status: 'cancelled' })
          }
        : { method: 'DELETE' };

      await fetchData(`http://localhost:3000/events/${eventId}`, options);
      console.log(`Event ${action}ed successfully`);
      fetchUserEvents();
    } catch (err) {
      handleApiError(err, `Error ${action}ing event:`);
    }
  };

  const handleCancelEvent = (eventId) => handleEventAction(eventId, 'cancel');
  const handleDeleteEvent = (eventId) => handleEventAction(eventId, 'delete');

  const currentDate = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > currentDate && event.status !== 'cancelled'
  );

  const cancelledEvents = events.filter(
    (event) => event.status === 'cancelled'
  );

  return (
    <main className="container mx-auto p-6 overflow-y-auto bg-bb-beige">
      <h1 className="text-3xl font-bold mb-6 text-bb-dark">Welcome, User!</h1>
      
      {/* Add loading and error handling for FeaturedCocktail */}
      {cocktailOfWeek ? (
        <FeaturedCocktail cocktail={cocktailOfWeek} />
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Failed to load featured cocktail
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-lg">
          Loading featured cocktail...
        </div>
      )}

      <div className="grid-container md:grid-cols-2 gap-6 mb-8">
        <Link 
          to="/event-wizard" 
          className={buttonClasses.primary}
        >
          Create New Event
        </Link>
        <Link 
          to="/batch-calculator" 
          className={buttonClasses.primary}
        >
          Batch Calculator
        </Link>
      </div>

      {loading ? (
        <p className="text-[#51657D]">Loading events...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
       
          <EventList 
            title="Upcoming Events" 
            events={upcomingEvents} 
            onCancelEvent={handleCancelEvent} 
            onDeleteEvent={handleDeleteEvent} 
          />
          <EventList 
            title="Cancelled Events" 
            events={cancelledEvents} 
            onCancelEvent={handleCancelEvent} 
            onDeleteEvent={handleDeleteEvent}
          />
          <SavedCocktails />
        </>
      )}
    </main>
  );
}

export default Dashboard;
