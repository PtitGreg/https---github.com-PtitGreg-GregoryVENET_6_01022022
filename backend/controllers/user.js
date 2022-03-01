// Controle de l'utilisateur
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passwordValidator = require("password-validator");
//Schema password
const schemaPassword = new passwordValidator();
schemaPassword
	.is()
	.min(8) // Minimum 8 caracteres
	.is()
	.max(20) // Maximum length 20
	.has()
	.uppercase() // Minimum 1 majuscule
	.has()
	.lowercase() // Minimum 1 minuscule
	.has()
	.digits(2); // Minimum 2 chiffre

// Middleware d'enregistrement utilsateur
exports.signup = (req, res) => {
	if (schemaPassword.validate(req.body.password)) {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) => {
				const user = new User({
					email: req.body.email,
					password: hash,
				});
				user
					.save()
					.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
					.catch((error) => res.status(400).json({ error }));
			})
			.catch((error) => res.status(500).json({ error }));
	} else {
		res.status(400).json({ error });
	}
};
// Middleware de connection utilsateur
exports.login = (req, res) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
							expiresIn: "24h",
						}),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
