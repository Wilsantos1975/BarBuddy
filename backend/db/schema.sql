-- Drop existing tables if they exist
DROP TABLE IF EXISTS saved_recipes;
DROP TABLE IF EXISTS cocktail_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS cocktails;
DROP TABLE IF EXISTS invites;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS "user";  
DROP TABLE IF EXISTS recipes;

-- Create the user table
CREATE TABLE "user" (  
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture TEXT
);

-- Create the events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255),
    theme VARCHAR(50),
    organizer_id INTEGER REFERENCES "user"(id),
    recommended_cocktails INTEGER[] -- Array of cocktail IDs
);

-- Create the invites table
CREATE TABLE invites (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    invitee_email VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- Create the cocktails table
CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    recipe TEXT,        
    image TEXT
);

-- Create the ingredients table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    measurement_unit VARCHAR(20) DEFAULT 'oz'
);

-- Create the cocktail_ingredients junction table
CREATE TABLE cocktail_ingredients (
    cocktail_id INTEGER REFERENCES cocktails(id),
    ingredient_id INTEGER REFERENCES ingredients(id),
    quantity DECIMAL(5,2),
    measurement_unit VARCHAR(20) DEFAULT 'oz',
    PRIMARY KEY (cocktail_id, ingredient_id)
);

-- Create the saved_recipes table
CREATE TABLE saved_recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),  
    cocktail_id INTEGER REFERENCES cocktails(id)
);

-- Create the recipes table
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  ingredients JSONB NOT NULL,
  total_volume DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  dilution DECIMAL(5, 2)
);

-- Update the events table
ALTER TABLE events ADD COLUMN recommended_cocktails INTEGER[];

-- Create a new table for batch recipes
CREATE TABLE batch_recipes (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    name VARCHAR(255) NOT NULL,
    ingredients JSONB NOT NULL,
    total_volume DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    dilution DECIMAL(5, 2)
);
