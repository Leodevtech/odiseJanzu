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
  titre_section1 TEXT DEFAULT 'Bienvenue sur Ô di Sé Janzu pour un voyage aquatique',
  titre_section2 TEXT DEFAULT 'Janzu signifie en Chinois « rivière pacifique »...',
  titre_lieux1 VARCHAR(100) DEFAULT 'Lieu 1',
  titre_lieux2 VARCHAR(100) DEFAULT 'Lieu 2',
  titre_lieux3 VARCHAR(100) DEFAULT 'Lieu 3',
  titre_lieux4 VARCHAR(100) DEFAULT 'Lieu 4',
  prestation1_titre VARCHAR(100) DEFAULT 'Prestation 1',
  prestation1_duree VARCHAR(20)  DEFAULT '0.45h',
  prestation1_prix  VARCHAR(20)  DEFAULT '100€',
  prestation2_titre VARCHAR(100) DEFAULT 'Prestation 2',
  prestation2_duree VARCHAR(20)  DEFAULT '1h',
  prestation2_prix  VARCHAR(20)  DEFAULT '100€',
  prestation3_titre VARCHAR(100) DEFAULT 'Forfait 1',
  prestation3_duree VARCHAR(20)  DEFAULT '2h',
  prestation3_prix  VARCHAR(20)  DEFAULT '200€',
  prestation4_titre VARCHAR(100) DEFAULT 'Forfait 2',
  prestation4_duree VARCHAR(20)  DEFAULT '2h',
  prestation4_prix  VARCHAR(20)  DEFAULT '200€'
);
INSERT INTO site_content (id) VALUES (1);