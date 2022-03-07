// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET

// Imports du package http
const http = require("http");
// Import pour utilisation de l'appli sur le serveur
const app = require("./app");
// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne - Cela configure le port de connection en fonction de l'environnement

const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
// Ajout du port de connection si celui-ci n'est pas declarer par l environnement
// Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || "3000");
// Set du port de connection
app.set("port", port);
// la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée
// pour ensuite enregistrée dans le serveur
const errorHandler = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}
	const address = server.address();
	const bind =
		typeof address === "string" ? "pipe " + address : "port: " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break;
		default:
			throw error;
	}
};
// Création serveur
const server = http.createServer(app);
// Lancement serveur
server.on("error", errorHandler);
server.on("listening", () => {
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + port;
	console.log("Listening on " + bind);
});
// Ecoute du port défini plus haut
server.listen(port);
