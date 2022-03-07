// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Import Mongoose
const mongoose = require("mongoose");
// Sanitizeur(nettoyeur) de modele mongoose
const sanitizerPlugin = require("mongoose-sanitizer-plugin");

// Condition Caractères
const regex = (entry) => (/[$\/<>;]/.test(entry) ? false : true);
// Schéma sauce
const sauceSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		validate: [regex, "Caractères interdits"],
	},
	manufacturer: {
		type: String,
		required: true,
		validate: [regex, "Caractères interdits"],
	},
	description: {
		type: String,
		required: true,
		validate: [regex, "Caractères interdits"],
	},
	mainPepper: {
		type: String,
		required: true,
		validate: [regex, "Caractères interdits"],
	},
	imageUrl: {
		type: String,
		required: true,
	},
	heat: {
		type: Number,
		required: true,
		min: 1,
		max: 10,
	},
	likes: {
		type: Number,
		required: true,
		default: 0,
	},
	dislikes: {
		type: Number,
		required: true,
		default: 0,
	},
	usersLiked: {
		type: Array,
		required: true,
		max: 1,
	},
	usersDisliked: {
		type: Array,
		required: true,
		min: -1,
	},
});
// Plugin pour mongoose qui purifie les champs du model avant de les enregistrer dans la base mongoDB
sauceSchema.plugin(sanitizerPlugin);
// Export Schema
module.exports = mongoose.model("Sauce", sauceSchema);
