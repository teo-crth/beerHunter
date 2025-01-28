BEGIN;

-- Supprimer toutes les données des tables
TRUNCATE TABLE "favorite_bar" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "user_comment" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "comment_image" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "beer_available" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "beer" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "beer_type" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "bar_image" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "bar_city" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "bar" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "city" RESTART IDENTITY CASCADE;

-- Insérer les nouvelles données
-- Insert into "city"
INSERT INTO "city" ("name", "region") VALUES
('AVIGNON', 84),
('VALENCE', 26),
('MARSEILLE', 13),
('AIX EN PROVENCE', 13),
('TOULOUSE', 31);

-- Insert into "bar"
INSERT INTO "bar" ("name", "address", "latitude", "longitude", "rate", "opening_hours", "created_at", "updated_at", "city_id") VALUES
('O''Collin''s Irish Pub', '34 Cr Jean Jaurès, 84000 Avignon', 43.9445, 4.80535, 4.4, 'Monday: 8:00 AM – 1:00 AM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('The Pipeline', '34 Cr Jean Jaurès, 84000 Avignon', 43.9451, 4.8054, 4.5, 'Monday: 9:00 AM – 0:00 AM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('Le Bar des Artistes', '12 Rue des Artistes, 13000 Marseille', 43.2965, 5.3698, 4.2, 'Tuesday: 10:00 AM – 2:00 AM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3),
('La Brasserie', '5 Rue des Champs, 13100 Aix en Provence', 43.5297, 5.4474, 4.3, 'Monday: 7:00 AM – 12:00 AM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4),
('L''Alchimiste', '10 Rue de Toulouse, 31000 Toulouse', 43.6047, 1.4442, 4.6, 'Wednesday: 9:00 AM – 1:00 AM', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5);

-- Insert into "bar_city"
INSERT INTO "bar_city" ("bar_id", "city_id") VALUES
(1, 1),
(2, 1),
(3, 3),
(4, 4),
(5, 5);

-- Insert into "bar_image"
INSERT INTO "bar_image" ("bar_id", "image_link", "created_at", "updated_at") VALUES
(1, '/assets/images/ocollins-pub-avignon.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '/assets/images/the-pipeline-avignon.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '/assets/images/bar-des-artistes-marseille.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '/assets/images/la-brasserie-aix-en-provence.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '/assets/images/alchimiste-toulouse.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into "beer_type"
INSERT INTO "beer_type" ("name", "created_at", "updated_at") VALUES
('Blonde', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Brune', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Blanche', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('IPA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ambrée', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into "beer"
INSERT INTO "beer" ("name", "subtitle", "alcool_degree", "description", "image_link", "beer_type_id", "created_at", "updated_at") VALUES
('Heineken', 'Bière blonde', 5, 'Bière hollandaise légère', '/images/heineken.png', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Chimay', 'Chimay blanche', 4.5, 'Bière d''abbaye belge', '/images/chimay.png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pelforth', 'Pelforth brune', 5, 'Bière brune française', '/images/pelforth.png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Eku Kulminator', 'Bière forte', 28, 'Bière brune allemande', '/images/eku-kulminator.png', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Punk IPA', 'IPA', 6.5, 'IPA anglaise avec une bonne amertume', '/images/punk-ipa.png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into "beer_available"
INSERT INTO "beer_available" ("bar_id", "beer_id") VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 4),
(4, 5);

-- Insert into "users"
INSERT INTO "users" ("email", "birth_date", "password", "address", "city", "name", "theme", "profil_picture", "created_at", "updated_at") VALUES
('user1@example.com', '1990-05-15', 'Password123!', '1 Rue de Paris', 'Marseille', 'Alice', 'dark', '/images/alice.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user2@example.com', '1988-12-30', 'SecretPassword1$', '2 Rue de Lyon', 'Avignon', 'Bob', 'light', '/images/bob.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user3@example.com', '1992-03-12', 'MyPassword#2025', '3 Rue de Toulouse', 'Aix en Provence', 'Charlie', 'dark', '/images/charlie.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user4@example.com', '1985-06-25', 'StrongP@ssw0rd', '4 Rue de Nice', 'Toulouse', 'David', 'light', '/images/david.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('user5@example.com', '1991-08-19', 'Eve$Password2025', '5 Rue de Marseille', 'Marseille', 'Eve', 'dark', '/images/eve.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into "user_comment"
INSERT INTO "user_comment" ("text", "rate", "comment_image_id", "user_id", "bar_id", "created_at", "updated_at") VALUES
('Super pub, très agréable', 5, NULL, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Le service est un peu lent', 3, NULL, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ambiance sympa mais trop bruyant', 4, NULL, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bière excellente mais prix un peu élevé', 4, NULL, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ambiance chaleureuse, très bon moment', 5, NULL, 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into "comment_image"
INSERT INTO "comment_image" ("image_link", "image_alt", "user_comment_id", "created_at", "updated_at") VALUES
('/assets/images/comment1.png', 'photo pub irlandais', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('/assets/images/comment2.png', 'photo bar pipeline', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('/assets/images/comment3.png', 'photo bar des artistes', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('/assets/images/comment4.png', 'photo la brasserie', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('/assets/images/comment5.png', 'photo l''alchimiste', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into "favorite_bar"
INSERT INTO "favorite_bar" ("user_id", "bar_id") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

COMMIT;
