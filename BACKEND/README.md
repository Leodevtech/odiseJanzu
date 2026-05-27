# Ô di Sé Janzu

PROJECT: "backend"

backend/
├─ package.json
├─ .env
├─ server.js
├─ app.js
├─ config/
│ └─ db.js
├─ models/
│ └─ user.model.js
├─ middleware/
│ ├─ auth.middleware.js
│ └─ validation.middleware.js
├─ controllers/
│ └─ auth.controller.js
├─ routes/
│ └─ auth.routes.js
└─ services/
└─ mailer.service.js

# Initialisation npm

npm init -y

# Installation modules

npm install express mysql12 dotenv jsonwebtoken argon2 nodemailer uuid zod validator
npm install -D nodemon

"dependencies": {
"argon": "^2.0.21", <!--Bibliotèque de hachage de mots de passe -->
"cors": "^2.8.6", <!--Middleware pour pour gérer les requêtes Cross-Origin, permet a l'api du serveur express d'accepter les requêtes venant d'un front qui tourne sur un autre domaine (port:3000 à port:5000) -->
"dotenv": "^17.4.2", <!-- Charge les variables dun fichier .env -->
"express": "^5.2.1", <!--Framework pour Node.js coeur de l'appli c'est lui qui s'occupe des routes, middlewares, gestion des req HTTP  -->
"jsonwebtoken": "^9.0.3", <!-- création et vérification de json web tokens(jwt) -->
"mysql2": "^3.22.0", <!-- Driver MySQL pour Node.js(async/await) -->
"nodemailer": "^8.0.5", <!--Envoi d'emails depuis Node.js pour la verif de compte (SMTP) -->
"nodemon": "^3.1.14", <!--outils dev redémarre de façon auto le serveur à chaque modif fichier  -->
"zod": "^4.3.6" <!--Bibliothèque de validation de schéma  -->
}

# Création structure des dossiers

config models controllers routes middleware

# Création des fichiers principaux

.env server.js app.js

# Création fichiers config

config/db.js config/mailer.js

# Création modèles

models/user.model.js

# Création middleware

middleware/auth.middleware.js middleware/validation.middleware.js

# Création controllers

middleware/auth.middleware.js middleware/auth.controllers.js

# Création routes

routes/auth.routes.js

# Ajout contenu minimal dans .env

.env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=auth_db

# création db :

toujours regarder l'import pour vérifier l'ordre de création

source: nodemailer project + le mauvais coincoin projet pour le front, ainsi que pour la partie upload photo

1. dotenv / db.js
2. app.js
3. server.js
4. model
5. validation
6. controllers

"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p

smtp key: xsmtpsib-c38e709a5ec7476b7347cf8269c2b7c7eadb01108f50240d3f1d38903a41cfa9-WfKjZkWLaeE5kRV4
# Janzu-Project
# Janzu-Project
