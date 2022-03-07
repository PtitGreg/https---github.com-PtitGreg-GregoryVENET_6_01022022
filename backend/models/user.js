// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Import mongoose
const mongoose = require("mongoose");
// Package qui valide l'email unique pour éviter à plusieurs utilisateurs de se partager le meme mail
const uniqueValidator = require("mongoose-unique-validator");
// Package qui nettoie les mauvaises entrées
const sanitizerPlugin = require("mongoose-sanitizer-plugin");
// Création shema
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, "Veuillez entrer votre adresse email"],
		unique: true,
		trim: true,
		match: [
			/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
			"Veuillez entrer une adresse email correcte",
		],
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
});
// application du plugin pour la validation de l'email unique
userSchema.plugin(uniqueValidator);
// application du plugin pour la purification des champs du modele
userSchema.plugin(sanitizerPlugin);
// Exportation du modele donné ci-dessus appelé User
module.exports = mongoose.model("User", userSchema);
