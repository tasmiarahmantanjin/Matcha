-- CREATE DATABASE login_matcha;

CREATE TYPE gender AS ENUM ('female', 'male', 'others');
CREATE TYPE notification_type AS ENUM ('message', 'like', 'unlike', 'visit');
CREATE TYPE sex_orientation AS ENUM ('man', 'woman', 'both');

-- CREATE EXTENSION IF NOT EXISTS postgis;
-- CREATE EXTENSION IF NOT EXISTS postgis_topology;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
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
	birthdate DATE DEFAULT NULL,
	fame INTEGER DEFAULT 100,
	last_online TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	online SMALLINT NOT NULL DEFAULT 0,
    sexual_orientation VARCHAR(255)[],
    blocked_users VARCHAR(255)[]
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

-- Need to add the fake user to the database