-- Seed data for user table (single user)
INSERT INTO "user" (username, email, password, profile_picture) VALUES
('single_user', 'single_user@example.com', 'securepassword', 'profile_picture.jpg');

-- Seed data for events table
INSERT INTO events (name, date, time, location, theme, organizer_id, invitee_count) VALUES
('Birthday Party', '2024-01-01', '18:00:00', 'Home', 'Celebration', 1, 20),
('Wedding Reception', '2024-02-14', '15:00:00', 'Banquet Hall', 'Romantic', 1, 100),
('Corporate Meeting', '2024-03-10', '09:00:00', 'Office', 'Business', 1, 15),
('Graduation Party', '2024-05-20', '17:00:00', 'University', 'Achievement', 1, 50),
('Summer BBQ', '2024-06-15', '12:00:00', 'Backyard', 'Casual', 1, 30),
('Halloween Party', '2024-10-31', '20:00:00', 'Community Center', 'Spooky', 1, 25),
('New Years Eve', '2024-12-31', '21:00:00', 'City Square', 'Celebration', 1, 100),
('Charity Gala', '2024-11-15', '19:00:00', 'Convention Center', 'Formal', 1, 75),
('Family Reunion', '2024-07-04', '13:00:00', 'Park', 'Family', 1, 40),
('Game Night', '2024-08-10', '19:00:00', 'Home', 'Fun', 1, 20);

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

-- First, create tables if they don't exist




-- Update your cocktails INSERT statement to use 'instructions' instead of 'recipe'
INSERT INTO cocktails (name, description, instructions, is_featured, is_custom) VALUES
('Mojito', 'A refreshing cocktail with mint and lime.', '1.7 oz rum, 1 oz lime juice, 0.35 oz mint leaves, 0.5 oz sugar, 3.4 oz soda water. Muddle mint and sugar, add rum and lime juice, shake with ice, strain into glass, top with soda water.', FALSE, FALSE),
('Margarita', 'A classic cocktail with tequila and lime.', '1.7 oz tequila, 0.7 oz triple sec, 1 oz lime juice. Shake all ingredients with ice, strain into a salt-rimmed glass.', FALSE, FALSE),
('Pina Colada', 'A tropical cocktail with rum and coconut.', '1.7 oz rum, 3.4 oz pineapple juice, 1 oz coconut cream. Blend all ingredients with ice until smooth.', TRUE, FALSE),
('Daiquiri', 'A sweet cocktail with rum and lime.', '1.7 oz rum, 1 oz lime juice, 0.5 oz sugar. Shake all ingredients with ice, strain into a chilled glass.', FALSE, FALSE),
('Old Fashioned', 'A timeless cocktail with whiskey and bitters.', '1.7 oz whiskey, 1 sugar cube, 2-3 dashes Angostura bitters. Muddle sugar and bitters, add whiskey and ice, stir until chilled.', FALSE, FALSE),
('Cosmopolitan', 'A stylish cocktail with vodka and cranberry.', '1.7 oz vodka, 0.7 oz triple sec, 1 oz cranberry juice, 0.5 oz lime juice. Shake all ingredients with ice, strain into a martini glass.', FALSE, FALSE),
('Martini', 'A sophisticated cocktail with gin and vermouth.', '2 oz gin, 0.3 oz dry vermouth. Stir ingredients with ice, strain into a chilled martini glass. Garnish with olive or lemon twist.', FALSE, FALSE),
('Whiskey Sour', 'A tangy cocktail with whiskey and lemon.', '1.7 oz whiskey, 1 oz lemon juice, 0.7 oz simple syrup, egg white (optional). Shake all ingredients with ice, strain into a glass over fresh ice.', FALSE, FALSE),
('Bloody Mary', 'A savory cocktail with vodka and tomato juice.', '1.7 oz vodka, 3.4 oz tomato juice, 0.5 oz lemon juice, 2-3 dashes Worcestershire sauce, 2-3 dashes hot sauce, salt and pepper. Stir all ingredients with ice, strain into a glass.', FALSE, FALSE),
('Mai Tai', 'A fruity cocktail with rum and orange.', '1.7 oz white rum, 0.85 oz dark rum, 1 oz orange curaçao, 1 oz lime juice, 0.5 oz orgeat syrup. Shake all ingredients with ice, strain into a glass filled with crushed ice.', FALSE, FALSE);

-- Then insert ingredients


-- Finally insert cocktail_ingredients



-- Seed data for saved_recipes table


-- Add seed data for batch_recipes table

