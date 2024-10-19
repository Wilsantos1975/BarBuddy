import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CocktailOfTheWeek from "./CocktailOfTheWeek";
import EventList from "./EventsComponents/EventList";
import RecipeList from "./RecipesComponents/RecipeList";


function Dashboard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        // Replace with your actual backend URL
        const response = await fetch("http://localhost:3000/events/");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch events: ${response.status} ${response.statusText}\n${responseText}`
          );
        }

        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            `Received non-JSON response from server. Content-Type: ${contentType}`
          );
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

    fetchUserEvents();
  }, []);

  const currentDate = new Date();

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > currentDate && event.status !== "cancelled"
  );

  const cancelledEvents = events.filter(
    (event) => event.status === "cancelled" && new Date(event.date) > currentDate
  );

  console.log("All events:", events);
  console.log("Upcoming events:", upcomingEvents);
  console.log("Cancelled events:", cancelledEvents);

  return (
    <div className="flex h-screen bg-gray-100">
   
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, User!</h1>
        <CocktailOfTheWeek />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
       
        
        </div>
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <RecipeList />  
            <EventList title="Upcoming Events" events={upcomingEvents} />
            <EventList title="Cancelled Events" events={cancelledEvents} />
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
