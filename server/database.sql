-- Create database
CREATE DATABASE login_matcha;

CREATE TYPE gender AS ENUM ('female', 'male', 'others');
-- CREATE TYPE orientation AS ENUM ('f', 'm', 'o', 'fm', 'fo', 'mo', 'fmo');
CREATE TYPE notification_type AS ENUM ('message', 'like', 'unlike', 'visit');
CREATE TYPE sex_orientation AS ENUM ('man', 'woman', 'both');
--set uuid extenstion & other needed extension
-- https://thecodersblog.com/PostgreSQL-PostGIS-installation/
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

CREATE TABLE users (
	user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	user_name VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	gender varchar(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	token varchar(255) DEFAULT NULL,
	verified SMALLINT NOT NULL DEFAULT 0,
	sex_orientation varchar(255) DEFAULT NULL,
	avatar varchar(255) DEFAULT NULL,
	bio VARCHAR(1000),
	interest VARCHAR(255)[],
	tags VARCHAR(255),
	latitude float NULL ,
 	longitude float NULL ,
	country varchar(255) NULL ,
	-- geolocation geography(Point,4326),
	-- latitude DOUBLE PRECISION,
	-- longitude DOUBLE PRECISION,
	birthdate DATE DEFAULT NULL,
	fame INTEGER DEFAULT 100,
	last_online TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	online SMALLINT NOT NULL DEFAULT 0,
  sexual_orientation VARCHAR(255)[]
);

CREATE TABLE likes
(
    like_id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_id character varying(255) NOT NULL,
    liked_user character varying(255) NOT NULL
);

--Insert predifined users for admin use
INSERT INTO users (first_name, last_name, user_name, email, password, verified, gender, orientation, tags, latitude, longitude, birthdate, fame, sexual_orientation)
VALUES 
('hille', 'haa', 'hille', 'hille@h', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'female', 'fo', '#hot', 60.1695, 24.9354, '1987-02-1', 100, '{female,other}'),
('liina', 'lol', 'liina', 'liina@h', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'female', 'fmo', '#hot', 60.1695, 24.9354, '1984-02-1', 100, '{female,male,other}'),
('kaisa', 'varis', 'hiihtaja', 'ski@hi', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'female', 'm', '#hot', 60.1695, 24.9354, '1990-02-1', 50, '{male}'),
('muumi', 'maa', 'muumi', 'peikko@born', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'mo', '#hot', 60.1695, 24.9354, '2000-02-1', 100, '{male,other}'),
('ada', 'l', 'ada', 'binar@h', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'f', '#hot', 60.1695, 24.9354, '1999-02-1', 100, '{female}'),
('heikki', 'h', 'heikki', 'heikki@heikki', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'male', 'fmo', '#hot', 60.1695, 24.9354, '1987-02-1', 90, '{female,male,other}'),
('muumi', 'maa', 'muumio', 'peikko@born1', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'mo', '#hot', 61.1695, 24.9354, '2000-02-1', 100, '{male,other}'),
('ada', 'l', 'adalmiina', 'binar@h1', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'f', '#hot', 60.1695, 25.1354, '1999-02-1', 100, '{female}'),
('kalle', 'pihlajakatunen', 'totori', 'ponihepatoequards@gmail.com', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'male', 'fmo', '#hot', 60.5695, 24.9354, '1987-02-1', 90, '{female,male,other}');