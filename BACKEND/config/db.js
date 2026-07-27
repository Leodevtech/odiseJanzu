import mysql from "mysql2/promise";

import "dotenv/config";

// Création d'une pool de connexions Mysql
// Permet de réutiliser les connexions et gérer plusieurs requêtes simultannées
//
// IMPORTANT (contexte serverless / Vercel) : ce module est rechargé à chaque
// cold start d'une nouvelle instance de fonction. On ne doit ni bloquer le
// chargement du module sur un test de connexion, ni tuer le process avec
// process.exit(1) si la DB est momentanément injoignable — cela plantait la
// fonction entière avant même que la requête HTTP soit traitée, et comme
// AlwaysData limite le nombre de connexions simultanées, plusieurs instances
// Vercel actives en même temps suffisaient à saturer le pool et provoquer ce
// crash silencieux (page blanche / anciens tarifs affichés côté front).
//
// connectionLimit bas pour rester sous la limite du plan AlwaysData même si
// plusieurs instances serverless tournent en parallèle. waitForConnections
// fait patienter les requêtes au lieu d'échouer immédiatement si le pool est
// momentanément plein.
const db = mysql.createPool({
  host: process.env.DB_HOST, // Adresse du serveur MySQL
  user: process.env.DB_USER, // Utilisateur MySQL
  password: process.env.DB_PASS, // Mot de passe MySQL
  database: process.env.DB_NAME, // Nom de la db
  connectionLimit: 3,
  waitForConnections: true,
  queueLimit: 0,
  connectTimeout: 10000,
});

// Les erreurs de connexion sont désormais gérées route par route (chaque
// controller a déjà un try/catch qui renvoie un 500 propre). On log ici
// uniquement les erreurs de pool imprévues, sans jamais tuer le process.
db.on("error", (error) => {
  console.error("Erreur pool MySQL:", error.message);
});

// export de la pool pour l'utiliser dans les modèles
export { db };
