CREATE DATABASE IF NOT EXISTS odise_project;
USE odise_project;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(191) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  is_verified TINYINT(1) NOT NULL DEFAULT 0,
  verify_token VARCHAR(36) DEFAULT NULL,
  reset_token VARCHAR(36) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filepath VARCHAR(500) NOT NULL,
  cloudflare_id VARCHAR(255) DEFAULT NULL,
  type ENUM('image', 'video') NOT NULL DEFAULT 'image',
  original_name VARCHAR(255),
  alt VARCHAR(255),
  description VARCHAR(255),
  user_id INT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE avis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  contenu TEXT NOT NULL,
  actif TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  lu TINYINT(1) DEFAULT 0,
  rgpd_consent TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE site_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre_section1 VARCHAR(500),
  titre_section2 VARCHAR(500),
  titre_lieux1 VARCHAR(500),
  titre_lieux2 VARCHAR(500),
  titre_lieux3 VARCHAR(500),
  titre_lieux4 VARCHAR(500),
  prestation1_titre VARCHAR(255),
  prestation1_duree VARCHAR(50),
  prestation1_prix VARCHAR(50),
  prestation2_titre VARCHAR(255),
  prestation2_duree VARCHAR(50),
  prestation2_prix VARCHAR(50),
  prestation3_titre VARCHAR(255),
  prestation3_duree VARCHAR(50),
  prestation3_prix VARCHAR(50),
  prestation4_titre VARCHAR(255),
  prestation4_duree VARCHAR(50),
  prestation4_prix VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;