DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE
    department (
        id INT NOT NULL PRIMARY KEY auto_increment,
        name VARCHAR(30) NOT NULL
    );

CREATE TABLE
    roles (
        id INT PRIMARY KEY auto_increment,
        title VARCHAR(30) NOT NULL,
        department VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL
    );

CREATE TABLE
    employees (
        id INT NOT NULL PRIMARY KEY auto_increment,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        title VARCHAR(30) NOT NULL,
        department VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL,
        manager VARCHAR(30) NOT NULL
    );