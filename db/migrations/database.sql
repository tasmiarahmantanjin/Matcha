-- CREATE DATABASE login_matcha;

CREATE TYPE gender AS ENUM ('female', 'male', 'others');
CREATE TYPE notification_type AS ENUM ('message', 'like', 'unlike', 'visit');
CREATE TYPE sex_orientation AS ENUM ('man', 'woman', 'both');

-- CREATE EXTENSION IF NOT EXISTS postgis;
-- CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
	sex_orientation varchar(255) DEFAULT NULL, -- Should be removed.
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
  sexual_orientation VARCHAR(255)[],
  blocked_users VARCHAR(255)[] NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS likes
(
    like_id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_id character varying(255) NOT NULL,
    liked_user character varying(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS fake_account_reports 
(
    report_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    reported_user VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversations
(
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    user_one_id character varying(255) NOT NULL,
    user_two_id character varying(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages
(
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    sender_id character varying(255) NOT NULL,
    conversation_id character varying(255) NOT NULL,
    message_text text,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
	id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	from_id uuid NOT NULL,
	read SMALLINT NOT NULL DEFAULT '0',
	notification TEXT,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id)
		REFERENCES users(user_id)
		ON DELETE CASCADE,
	FOREIGN KEY(from_id)
		REFERENCES users(user_id)
		ON DELETE CASCADE
);

CREATE TABLE gallery
(
    image_id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner_id character varying(255) NOT NULL,
    path character varying(255) NOT NULL
);

-- Need to add the fake user to the database
--Insert predifined users for admin use
INSERT INTO users (first_name, last_name, user_name, email, verified, password, gender, sex_orientation, tags, latitude, longitude, birthdate, fame, sexual_orientation, interest)
VALUES 
('hille', 'haa', 'hille', 'hille@h', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'female', 'fo', '#hot', 60.1695, 24.9354, '1987-02-1', 100, '{female,other}', '{#debugging}'),
('liina', 'lol', 'liina', 'liina@h', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'female', 'fmo', '#hot', 60.1695, 24.9354, '1984-02-1', 100, '{female,male,other}', '{#debugging}'),
('kaisa', 'varis', 'hiihtaja', 'ski@hi', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'female', 'm', '#hot', 60.1695, 24.9354, '1990-02-1', 50, '{male}', '{#debugging}'),
('muumi', 'maa', 'muumi', 'peikko@born', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'mo', '#hot', 60.1695, 24.9354, '2000-02-1', 100, '{male,other}', '{#debugging}'),
('ada', 'l', 'ada', 'binar@h', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'f', '#hot', 60.1695, 24.9354, '1999-02-1', 100, '{female}', '{#debugging}'),
('heikki', 'h', 'heikki', 'heikki@heikki', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'male', 'fmo', '#hot', 60.1695, 24.9354, '1987-02-1', 90, '{female,male,other}', '{#debugging}'),
('muumi', 'maa', 'muumio', 'peikko@born1', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'mo', '#hot', 61.1695, 24.9354, '2000-02-1', 100, '{male,other}', '{#debugging}'),
('ada', 'l', 'adalmiina', 'binar@h1', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'other', 'f', '#hot', 60.1695, 25.1354, '1999-02-1', 100, '{female}', '{#debugging}'),
('kalle', 'pihlajakatunen', 'totori', 'ponihepatoequards@gmail.com', '1', '$2a$10$PAM0GqbRGkOS2bVupYY0he23LiSv2THGyfvtULZpcdRTzSM7BQ01u', 'male', 'fmo', '#hot', 60.5695, 24.9354, '1987-02-1', 90, '{female,male,other}', '{#debugging}'),
('Pontus', 'Andersson', 'panderss', 'testing@gmail.com', '1', '$2b$10$xWGC3uyaKhHa8px8NUXDZuJquruXFSV37CRQe/wy9U13hRO5lWNDq', 'male', 'fmo', '#hot', 60.5695, 24.9354, '1987-02-1', 90, '{female,male,other}', '{#debugging}'),
('tasmia', 'rahman', 'trahman', 'tasmiata@gmail.com', '1', '$2b$10$xWGC3uyaKhHa8px8NUXDZuJquruXFSV37CRQe/wy9U13hRO5lWNDq', 'male', 'fmo', '#hot', 60.5695, 24.9354, '1987-02-1', 90, '{female,male,other}', '{#debugging}');
