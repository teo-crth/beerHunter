BEGIN;

-- Drop tables if they exist
DROP TABLE IF EXISTS "favorite_bar" CASCADE;
DROP TABLE IF EXISTS "user_comment" CASCADE;
DROP TABLE IF EXISTS "comment_image" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "beer_available" CASCADE;
DROP TABLE IF EXISTS "beer" CASCADE;
DROP TABLE IF EXISTS "beer_type" CASCADE;
DROP TABLE IF EXISTS "bar_image" CASCADE;
DROP TABLE IF EXISTS "bar_city" CASCADE;
DROP TABLE IF EXISTS "bar" CASCADE;
DROP TABLE IF EXISTS "city" CASCADE;

-- Create table "city"
CREATE TABLE "city" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(250) NOT NULL,
  "region" INTEGER NOT NULL
);

-- Create table "bar"
CREATE TABLE "bar" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "address" TEXT NOT NULL,
  "latitude" REAL DEFAULT NULL,
  "longitude" REAL DEFAULT NULL,
  "rate" REAL CHECK ("rate" >= 0 AND "rate" <= 5),
  "opening_hours" TEXT DEFAULT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "city_id" INTEGER DEFAULT NULL,
  CONSTRAINT fk_city_id FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE CASCADE
);

-- Create table "bar_city"
CREATE TABLE "bar_city" (
  "id" SERIAL PRIMARY KEY,
  "bar_id" INTEGER DEFAULT NULL,
  "city_id" INTEGER DEFAULT NULL,
  CONSTRAINT "bar_city_ibfk_1" FOREIGN KEY ("bar_id") REFERENCES "bar" ("id") ON DELETE CASCADE,
  CONSTRAINT "bar_city_ibfk_2" FOREIGN KEY ("city_id") REFERENCES "city" ("id") ON DELETE CASCADE
);

-- Create table "bar_image"
CREATE TABLE "bar_image" (
  "id" SERIAL PRIMARY KEY,
  "bar_id" INTEGER DEFAULT NULL,
  "image_link" VARCHAR(255) DEFAULT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "bar_image_ibfk_1" FOREIGN KEY ("bar_id") REFERENCES "bar" ("id") ON DELETE CASCADE
);

-- Create table "beer_type"
CREATE TABLE "beer_type" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "beer_type_name_unique" UNIQUE ("name") 
);
-- Create table "beer"
CREATE TABLE "beer" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "subtitle" VARCHAR(50) DEFAULT NULL,
  "alcool_degree" REAL NOT NULL,
  "description" TEXT DEFAULT NULL,
  "image_link" VARCHAR(255) NOT NULL,
  "beer_type_id" INTEGER DEFAULT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "beer_ibfk_1" FOREIGN KEY ("beer_type_id") REFERENCES "beer_type" ("id") ON DELETE CASCADE
);

-- Create table "beer_available"
CREATE TABLE "beer_available" (
  "id" SERIAL PRIMARY KEY,
  "bar_id" INTEGER DEFAULT NULL,
  "beer_id" INTEGER DEFAULT NULL,
  CONSTRAINT "beer_available_ibfk_1" FOREIGN KEY ("bar_id") REFERENCES "bar" ("id") ON DELETE CASCADE,
  CONSTRAINT "beer_available_ibfk_2" FOREIGN KEY ("beer_id") REFERENCES "beer" ("id") ON DELETE CASCADE
);


-- Create table "users"
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "birth_date" DATE DEFAULT NULL,
  "password" VARCHAR(100) NOT NULL,
  "address" TEXT DEFAULT NULL,
  "city" VARCHAR(50) DEFAULT NULL,
  "name" VARCHAR(50) DEFAULT NULL,
  "theme" VARCHAR(10) CHECK ("theme" IN ('dark', 'light')) DEFAULT 'dark',
  "profil_picture" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table "user_comment" sans les contraintes de clé étrangère
CREATE TABLE "user_comment" (
  "id" SERIAL PRIMARY KEY,
  "text" TEXT NOT NULL,
  "rate" REAL CHECK ("rate" >= 0 AND "rate" <= 5),
  "comment_image_id" INTEGER DEFAULT NULL,
  "user_id" INTEGER DEFAULT NULL,
  "bar_id" INTEGER DEFAULT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table "comment_image" sans les contraintes de clé étrangère
CREATE TABLE "comment_image" (
  "id" SERIAL PRIMARY KEY,
  "image_link" VARCHAR(2083) NOT NULL,
  "image_alt" VARCHAR(255) DEFAULT NULL,
  "user_comment_id" INTEGER DEFAULT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table "favorite_bar"
CREATE TABLE "favorite_bar" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER DEFAULT NULL,
  "bar_id" INTEGER DEFAULT NULL,
  CONSTRAINT "favorite_bar_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE,
  CONSTRAINT "favorite_bar_ibfk_2" FOREIGN KEY ("bar_id") REFERENCES "bar" ("id") ON DELETE CASCADE
);


COMMIT;
