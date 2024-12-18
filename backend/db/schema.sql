-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_saved_cocktails CASCADE;
DROP TABLE IF EXISTS cocktail_ingredients CASCADE;
DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS cocktails CASCADE;
DROP TABLE IF EXISTS invites CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;


-- Create the user table
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255)
);

-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    organizer_id INTEGER REFERENCES "user"(id),
    invitee_count INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the invites table
CREATE TABLE IF NOT EXISTS invites (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    invitee_email VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending'
);

-- Create the cocktails table
CREATE TABLE IF NOT EXISTS cocktails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    is_batched BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_custom BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES "user"(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the user_saved_cocktails table
CREATE TABLE IF NOT EXISTS user_saved_cocktails (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    external_cocktail_id VARCHAR(255) NOT NULL,
    cocktail_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, external_cocktail_id)
);

-- Update the user_saved_cocktails table to include unit validation
ALTER TABLE user_saved_cocktails
ADD CONSTRAINT valid_units CHECK (
  (cocktail_data->>'unit')::text IN ('oz', 'ml', 'dash')
);

-- Create a new table for batch recipes
CREATE TABLE IF NOT EXISTS batch_recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id),
    cocktail_id INTEGER REFERENCES cocktails(id),
    batch_size INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
