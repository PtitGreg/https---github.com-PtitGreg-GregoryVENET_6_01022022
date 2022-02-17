// Gestion d'authentification
const jwt = require("jsonwebtoken");
// Middleware décodage,du token, comparaison Id et renvoi
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
		const userId = decodedToken.userId;
		req.auth = { userId };
		if (req.body.userId && req.body.userId !== userId) {
			throw "ID utilisiteur invalide !";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Requête invalide!"),
		});
	}
};
