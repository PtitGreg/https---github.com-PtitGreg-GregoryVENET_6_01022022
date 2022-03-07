// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Importation du package qui gère les images dans les requêtes
const multer = require("multer");
// On crée un dictionnaire des types MIME pour définire le format des images
// Donc la creation d'un objet pour ajouter une extention en fonction du type mime du ficher
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};
// Création d'objet pour indiquer à multer ou enregistrer l'image, et le renommer
const storage = multer.diskStorage({
	// Destination d'enregistrement d'image
	destination: (req, file, callback) => {
		// Déclaration du dossier images
		callback(null, "images");
	},
	// gestion nom d'image
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		// Création filename avec timestamp, un point et l'extension
		callback(null, name + Date.now() + "." + extension);
	},
});
// Export multer avec objet storage, méthode simple qui est une image
module.exports = multer({ storage }).single("image");
