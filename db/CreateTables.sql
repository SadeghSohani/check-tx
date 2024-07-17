CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(128),
    verified BOOLEAN DEFAULT FALSE
);