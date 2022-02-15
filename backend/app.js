const express = require("express");
const { findById } = require("./models/sauce");
const mongoose = require("mongoose");
const Sauce = require("./models/sauce");
const sauceRoutes = require("./routes/sauce");
const likeRoutes = require("./routes/like");
require("dotenv").config();
const userRoutes = require("./routes/user");
const app = express();

// Connection à MongoDB
mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS",
	);
	next();
});
app
	.use("/api/sauces", sauceRoutes)
	.use("/api/auth", userRoutes);
module.exports = app;
