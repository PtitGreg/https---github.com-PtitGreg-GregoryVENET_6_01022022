const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
// Connection à MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));
// Initialise Express
app.use(express.json());
// Ajout des headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //Donne accès a l'api de tout origine
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
	);
	//Gestion des requêtes
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE",
	);
	next();
});
// Applique les limites
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // durée 15 minutes
	max: 100, // Applique une limite de 100 requêtes par fenêtre en 15min
	standardHeaders: true, // Informations limites de taux de retour dans les en-têtes Ratelimit
	legacyHeaders: false, // Désactiver les en-têtes `x-ratelimit- *` `
});
// Apply the rate limiting middleware to all requests
app.use(limiter);
// Protection des entetes
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	}),
);
//utilisation des images en mode statique
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
