CREATE TABLE IF NOT EXISTS employees (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(256) UNIQUE NOT NULL,
    role VARCHAR(256),
    salary DECIMAL NOT NULL,
    age INT NOT NULL,
    profile_picture VARCHAR(256),
    PRIMARY KEY (id)
);
