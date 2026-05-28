CREATE DATABASE IF NOT EXISTS odise_project;
USE odise_project;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username varchar(191)  NOT NULL,
  password_hash varchar(255)  NOT NULL,
  role enum('USER','ADMIN')  NOT NULL DEFAULT 'USER',
  is_verified tinyint(1) NOT NULL DEFAULT '0',
  verify_token varchar(36)  DEFAULT NULL,
  reset_token varchar(36)  DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filepath VARCHAR(255),
  original_name VARCHAR(255),
  alt VARCHAR(255),
  description VARCHAR(255),
  user_id INT NOT NULL ,
  uploaded_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE site_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre_section1 VARCHAR(500),
  titre_section2 VARCHAR(500),
  titre_lieux1 VARCHAR(500),
  titre_lieux2 VARCHAR(500),
  titre_lieux3 VARCHAR(500),
  titre_lieux4 VARCHAR(500) 
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  lu TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  contenu TEXT NOT NULL,
  actif TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)