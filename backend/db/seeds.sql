-- Seed data for user table (single user)
INSERT INTO "user" (username, email, password, profile_picture) VALUES
('single_user', 'single_user@example.com', 'securepassword', 'profile_picture.jpg');

-- Seed data for events table
INSERT INTO events (name, date, time, location, theme, organizer_id) VALUES
('Birthday Party', '2024-01-01', '18:00:00', 'Home', 'Celebration', 1),
('Wedding Reception', '2024-02-14', '15:00:00', 'Banquet Hall', 'Romantic', 1),
('Corporate Meeting', '2024-03-10', '09:00:00', 'Office', 'Business', 1),
('Graduation Party', '2024-05-20', '17:00:00', 'University', 'Achievement', 1),
('Summer BBQ', '2024-06-15', '12:00:00', 'Backyard', 'Casual', 1),
('Halloween Party', '2024-10-31', '20:00:00', 'Community Center', 'Spooky', 1),
('New Years Eve', '2024-12-31', '21:00:00', 'City Square', 'Celebration', 1),
('Charity Gala', '2024-11-15', '19:00:00', 'Convention Center', 'Formal', 1),
('Family Reunion', '2024-07-04', '13:00:00', 'Park', 'Family', 1),
('Game Night', '2024-08-10', '19:00:00', 'Home', 'Fun', 1);

-- Seed data for invites table
INSERT INTO invites (event_id, invitee_email, status) VALUES
(1, 'friend1@example.com', 'Accepted'),
(1, 'friend2@example.com', 'Pending'),
(1, 'friend3@example.com', 'Declined'),
(2, 'family1@example.com', 'Accepted'),
(2, 'family2@example.com', 'Pending'),
(2, 'family3@example.com', 'Declined'),
(3, 'colleague1@example.com', 'Accepted'),
(3, 'colleague2@example.com', 'Pending'),
(3, 'colleague3@example.com', 'Declined'),
(4, 'friend4@example.com', 'Accepted'),
(4, 'friend5@example.com', 'Pending'),
(4, 'friend6@example.com', 'Declined'),
(5, 'neighbor1@example.com', 'Accepted'),
(5, 'neighbor2@example.com', 'Pending'),
(5, 'neighbor3@example.com', 'Declined'),
(6, 'partygoer1@example.com', 'Accepted'),
(6, 'partygoer2@example.com', 'Pending'),
(6, 'partygoer3@example.com', 'Declined'),
(7, 'celebrant1@example.com', 'Accepted'),
(7, 'celebrant2@example.com', 'Pending'),
(7, 'celebrant3@example.com', 'Declined'),
(8, 'donor1@example.com', 'Accepted'),
(8, 'donor2@example.com', 'Pending'),
(8, 'donor3@example.com', 'Declined'),
(9, 'relative1@example.com', 'Accepted'),
(9, 'relative2@example.com', 'Pending'),
(9, 'relative3@example.com', 'Declined'),
(10, 'gamer1@example.com', 'Accepted'),
(10, 'gamer2@example.com', 'Pending'),
(10, 'gamer3@example.com', 'Declined');

-- Seed data for cocktails table
INSERT INTO cocktails (name, description, recipe, image) VALUES
('Mojito', 'A refreshing cocktail with mint and lime.', '50ml rum, 30ml lime juice, 10g mint leaves, 15g sugar, 100ml soda water. Muddle mint and sugar, add rum and lime juice, shake with ice, strain into glass, top with soda water.', 'mojito.jpg'),
('Margarita', 'A classic cocktail with tequila and lime.', '50ml tequila, 20ml triple sec, 30ml lime juice. Shake all ingredients with ice, strain into a salt-rimmed glass.', 'margarita.jpg'),
('Pina Colada', 'A tropical cocktail with rum and coconut.', '50ml rum, 100ml pineapple juice, 30ml coconut cream. Blend all ingredients with ice until smooth.', 'pina_colada.jpg'),
('Daiquiri', 'A sweet cocktail with rum and lime.', '50ml rum, 30ml lime juice, 15g sugar. Shake all ingredients with ice, strain into a chilled glass.', 'daiquiri.jpg'),
('Old Fashioned', 'A timeless cocktail with whiskey and bitters.', '50ml whiskey, 1 sugar cube, 2-3 dashes Angostura bitters. Muddle sugar and bitters, add whiskey and ice, stir until chilled.', 'old_fashioned.jpg'),
('Cosmopolitan', 'A stylish cocktail with vodka and cranberry.', '50ml vodka, 20ml triple sec, 30ml cranberry juice, 15ml lime juice. Shake all ingredients with ice, strain into a martini glass.', 'cosmopolitan.jpg'),
('Martini', 'A sophisticated cocktail with gin and vermouth.', '60ml gin, 10ml dry vermouth. Stir ingredients with ice, strain into a chilled martini glass. Garnish with olive or lemon twist.', 'martini.jpg'),
('Whiskey Sour', 'A tangy cocktail with whiskey and lemon.', '50ml whiskey, 30ml lemon juice, 20ml simple syrup, egg white (optional). Shake all ingredients with ice, strain into a glass over fresh ice.', 'whiskey_sour.jpg'),
('Bloody Mary', 'A savory cocktail with vodka and tomato juice.', '50ml vodka, 100ml tomato juice, 15ml lemon juice, 2-3 dashes Worcestershire sauce, 2-3 dashes hot sauce, salt and pepper. Stir all ingredients with ice, strain into a glass.', 'bloody_mary.jpg'),
('Mai Tai', 'A fruity cocktail with rum and orange.', '50ml white rum, 25ml dark rum, 30ml orange curaçao, 30ml lime juice, 15ml orgeat syrup. Shake all ingredients with ice, strain into a glass filled with crushed ice.', 'mai_tai.jpg');

-- Seed data for ingredients table
INSERT INTO ingredients (name, type, measurement_unit) VALUES
('Vodka', 'Spirit', 'ml'),
('Rum', 'Spirit', 'ml'),
('Tequila', 'Spirit', 'ml'),
('Gin', 'Spirit', 'ml'),
('Whiskey', 'Spirit', 'ml'),
('Triple Sec', 'Liqueur', 'ml'),
('Lime Juice', 'Juice', 'ml'),
('Mint Leaves', 'Herb', 'g'),
('Sugar', 'Sweetener', 'g'),
('Soda Water', 'Mixer', 'ml'),
('Cranberry Juice', 'Juice', 'ml'),
('Tomato Juice', 'Juice', 'ml'),
('Orange Juice', 'Juice', 'ml');

-- Seed data for cocktail_ingredients table
TRUNCATE TABLE cocktail_ingredients;  -- Optional: Clear existing data

INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantity, measurement_unit) VALUES
(1, 2, 50, 'ml'),  -- Mojito (Rum)
(1, 7, 30, 'ml'),  -- Lime Juice
(1, 8, 10, 'g'),   -- Mint Leaves
(1, 9, 15, 'g'),   -- Sugar
(1, 10, 100, 'ml'), -- Soda Water
(2, 3, 50, 'ml'),  -- Margarita (Tequila)
(2, 6, 20, 'ml'),  -- Triple Sec
(2, 7, 30, 'ml'),  -- Lime Juice
(3, 2, 50, 'ml'),  -- Pina Colada (Rum)
(3, 13, 100, 'ml'), -- Orange Juice (replacing
(4, 1, 50, 'ml'),  -- Daiquiri (Rum)
(4, 7, 30, 'ml'),  -- Lime Juice
(4, 9, 15, 'g'),   -- Sugar
(5, 5, 50, 'ml'),  -- Old Fashioned (Whiskey)
(5, 7, 30, 'ml'),  -- Lime Juice
(5, 9, 100, 'ml'), -- Sugar
(6, 1, 50, 'ml'),  -- Cosmopolitan (Vodka)
(6, 11, 30, 'ml'), -- Cranberry Juice
(6, 9, 100, 'ml'), -- Sugar
(7, 1, 50, 'ml'),  -- Martini (Gin)
(7, 10, 30, 'ml'), -- Vermouth
(7, 9, 100, 'ml'), -- Sugar
(8, 1, 50, 'ml'),  -- Whiskey Sour (Whiskey)
(8, 8, 30, 'ml'),  -- Lemon Juice
(8, 9, 100, 'ml'), -- Sugar
(9, 1, 50, 'ml'),  -- Bloody Mary (Vodka)
(9, 12, 30, 'ml'), -- Tomato Juice
(9, 9, 100, 'ml'), -- Sugar
(10, 1, 50, 'ml'),  -- Mai Tai (Rum)
(10, 13, 30, 'ml'), -- Orange Juice
(10, 9, 100, 'ml'); -- Sugar

-- Seed data for saved_recipes table
INSERT INTO saved_recipes (user_id, cocktail_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10);
