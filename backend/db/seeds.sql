-- Seed data for user table (single user)
INSERT INTO user (username, email, password, profile_picture) VALUES
('single_user', 'single_user@example.com', 'securepassword', 'profile_picture.jpg');

-- Seed data for events table
INSERT INTO events (name, date, time, location, theme, user_id) VALUES
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
INSERT INTO cocktails (name, description, image) VALUES
('Mojito', 'A refreshing cocktail with mint and lime.', 'mojito.jpg'),
('Margarita', 'A classic cocktail with tequila and lime.', 'margarita.jpg'),
('Pina Colada', 'A tropical cocktail with rum and coconut.', 'pina_colada.jpg'),
('Daiquiri', 'A sweet cocktail with rum and lime.', 'daiquiri.jpg'),
('Old Fashioned', 'A timeless cocktail with whiskey and bitters.', 'old_fashioned.jpg'),
('Cosmopolitan', 'A stylish cocktail with vodka and cranberry.', 'cosmopolitan.jpg'),
('Martini', 'A sophisticated cocktail with gin and vermouth.', 'martini.jpg'),
('Whiskey Sour', 'A tangy cocktail with whiskey and lemon.', 'whiskey_sour.jpg'),
('Bloody Mary', 'A savory cocktail with vodka and tomato juice.', 'bloody_mary.jpg'),
('Mai Tai', 'A fruity cocktail with rum and orange.', 'mai_tai.jpg');

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
('Soda Water', 'Mixer', 'ml');

-- Seed data for cocktail_ingredients table
INSERT INTO cocktail_ingredients (cocktail_id, ingredient_id, quantity, measurement_unit) VALUES
(1, 1, 50, 'ml'),
(1, 7, 30, 'ml'),
(1, 9, 100, 'ml'),
(2, 3, 50, 'ml'),
(2, 7, 30, 'ml'),
(2, 9, 100, 'ml'),
(3, 2, 50, 'ml'),
(3, 8, 100, 'ml'),
(3, 9, 100, 'ml'),
(4, 1, 50, 'ml'),
(4, 7, 30, 'ml'),
(4, 9, 100, 'ml'),
(5, 5, 50, 'ml'),
(5, 7, 30, 'ml'),
(5, 9, 100, 'ml'),
(6, 1, 50, 'ml'),
(6, 11, 30, 'ml'),
(6, 9, 100, 'ml'),
(7, 1, 50, 'ml'),
(7, 10, 30, 'ml'),
(7, 9, 100, 'ml'),
(8, 1, 50, 'ml'),
(8, 8, 30, 'ml'),
(8, 9, 100, 'ml'),
(9, 1, 50, 'ml'),
(9, 12, 30, 'ml'),
(9, 9, 100, 'ml'),
(10, 1, 50, 'ml'),
(10, 13, 30, 'ml'),
(10, 9, 100, 'ml');

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