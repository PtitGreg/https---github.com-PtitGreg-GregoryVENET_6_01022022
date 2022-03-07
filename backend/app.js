// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Import et déclaration appli express
const express = require("express");
const app = express();
// Import et déclaration de mongoose pour gérer mongoDB
const mongoose = require("mongoose");
// Import et déclaration de la route des sauces
const sauceRoutes = require("./routes/sauce");
// Import et déclaration de la route des utilisateurs
const userRoutes = require("./routes/user");
// déclaration accès au chemin du systeme de fichier
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require("dotenv").config();
// Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
// L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts
// qui permettent de rendre notre application plus robuste
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));
// Initialise Express
app.use(express.json());
// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //Donne accès a l'api de tout origine
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
	);
	//Gestion des requêtes
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});
// Applique les limites
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // durée 15 minutes
	max: 100, // Applique une limite de 100 requêtes par fenêtre en 15min
	standardHeaders: true, // Informations limites de taux de retour dans les en-têtes Ratelimit
	legacyHeaders: false, // Désactiver les en-têtes `x-ratelimit- *` `
});
// Nettoyer les données utilisateurs contre les injections
app.use(limiter);
// Sécuriser Express en définissant divers en-têtes HTTP - https://www.npmjs.com/package/helmet#how-it-works
// On utilise helmet pour plusieurs raisons notamment la mise en place du X-XSS-Protection afin d'activer le filtre de script intersites(XSS) dans les navigateurs web
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	}),
);

app.use(mongoSanitize());
// Gestion de la ressource image de façon statique
// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use("/images", express.static(path.join(__dirname, "images")));
// Déclaration des routes
// On importe la route dédiée aux sauces
app.use("/api/auth", userRoutes);
// on importe la route dédiée aux utilisateurs
app.use("/api/sauces", sauceRoutes);
// Export de l'appli express pour la déclaration dans server.js
module.exports = app;
