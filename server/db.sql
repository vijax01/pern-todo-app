CREATE DATABASE testdb;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255),
  completed BOOLEAN DEFAULT false
);