import React from "react";
import { useNavigate } from 'react-router-dom';

import { motion } from "framer-motion"; // For smooth animations

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate('/dashboard')}
        className="mb-8 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
                   flex items-center gap-2 text-secondary hover:text-primary hover:border-primary 
                   transition-all duration-300"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        Back to Dashboard
      </motion.button>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Building Digital Experiences
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Software Developer & Creative Problem Solver
        </p>
      </motion.section>

      {/* Tech Stack Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {/* Add your tech stack badges here */}
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
              React
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
              Node.js
            </span>
            {/* Add more tech badges */}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-secondary">
            Core Values
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-secondary">▹</span> Clean, maintainable code
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondary">▹</span> User-centered design
            </li>
            {/* Add more values */}
          </ul>
        </motion.div>
      </section>

      {/* Project Journey */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-primary">The Journey</h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-3 text-secondary">
              Why I Built This
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              [Your app's origin story and motivation]
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-3 text-secondary">
              Vision & Future
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              [Your plans and vision for the app]
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact/Connect Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-primary">Let's Connect</h2>
        <div className="flex justify-center gap-6">
          <a
            href="[GitHub Link]"
            className="text-secondary hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="[LinkedIn Link]"
            className="text-secondary hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:[your@email.com]"
            className="text-secondary hover:text-primary transition-colors"
          >
            Email
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
