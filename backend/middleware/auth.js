// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Récup et déclaration de jsonwebtoken
const jwt = require("jsonwebtoken");
// Import de la gestion des variables d'environnement
require("dotenv").config();
// Middleware qui appliquera la sécurité à toutes les routes
module.exports = (req, res, next) => {
	try {
		// Récup du 2eme élément du token dans le header avec la méthode split
		const token = req.headers.authorization.split(" ")[1];
		// Vérif de la correspondance du token
		req.token = jwt.verify(token, process.env.TOKEN_KEY);
		// Condition user id et user id encodé dans le token
		if (req.body.userId && req.body.userId !== req.token.userId) {
			throw "Id utilisateur non valable";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error });
	}
};
