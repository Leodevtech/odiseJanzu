import mysql from "mysql2/promise";

import "dotenv/config";

let db;

try {
  // Création d'une pool de connexions Mysql
  // Permet de réutiliser les connexions et gérer plusieurs requêtes simultannées
  db = mysql.createPool({
    host: process.env.DB_HOST, // Adresse du serveur MySQL
    user: process.env.DB_USER, // Utilisateur MySQL
    password: process.env.DB_PASS, // Mot de passe MySQL
    database: process.env.DB_NAME, // Nom de la db
  });

  // Test de connexion initiale
  await db.getConnection();
  console.log("database connexion", process.env.DB_NAME);
} catch (error) {
  console.error(
    "erreurs lors de la connexion de la base de donnée ",
    error.message,
  );
  process.exit(1); // Arrêt du serveur si la DB n'est pas accessible
}

// export de la pool pour l'utiliser dans les modèles 
export { db };
