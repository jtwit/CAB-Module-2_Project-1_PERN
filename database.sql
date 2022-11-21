CREATE DATABASE users;

CREATE TABLE test (id SERIAL PRIMARY KEY, firstName VARCHAR(30), lastName VARCHAR(30));

INSERT INTO test (firstName, lastName) VALUES ("test1", "lastName1");

SELECT * FROM test;