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

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      console.log('Fetching events...');
      const response = await fetch('http://localhost:3000/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedCocktails = async () => {
    try {
      console.log('Fetching saved cocktails...');
      const response = await fetch(`http://localhost:3000/cocktails/saved/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSavedCocktails(data);
    } catch (error) {
      console.error('Error fetching saved cocktails:', error);
    }
  };

  const fetchCocktailOfWeek = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php');
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        setCocktailOfWeek(data.drinks[0]);
      }
    } catch (error) {
      console.error('Error fetching cocktail:', error);
    }
  };

  const handleCancelEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel event: ${response.status} ${response.statusText}`);
      }

      const updatedEvent = await response.json();
      console.log('Event cancelled successfully:', updatedEvent);

      // Refresh events after cancellation
      fetchUserEvents();
    } catch (err) {
      console.error("Error cancelling event:", err);
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.status} ${response.statusText}`);
      }

      console.log('Event deleted successfully');
      // Refresh events after deletion
      fetchUserEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      setError(err.message);
    }
  };

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
      <FeaturedCocktail cocktail={cocktailOfWeek} />
      
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
