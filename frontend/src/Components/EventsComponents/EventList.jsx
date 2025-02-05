import React from 'react';
import EventsCard from './EventsCard';
import { motion } from "framer-motion";

function EventList({ title, events, onCancelEvent, onDeleteEvent }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-fascinate text-white mb-6">{title}</h2>
      <div className="card-grid">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.01 }}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <EventsCard
              event={event}
              onCancelEvent={onCancelEvent}
              onDeleteEvent={onDeleteEvent}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default EventList;