// Import Mongoose
const mongoose = require("mongoose");
// Condition Caractères
const regex = (entry) => (/[$\/<>;]/.test(entry) ? false : true);
// Schéma sauce
const sauceSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
		validate: [regex, 'Caractères interdits'],
	},
	name: {
		type: String,
		required: true,
		// validate: regex,
	},
	manufacturer: {
		type: String,
		required: true,
		// validate: regex,
	},
	description: {
		type: String,
		required: true,
		// validate: regex,
	},
	mainPepper: {
		type: String,
		required: true,
		// validate: regex,
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
// Export Schema
module.exports = mongoose.model("Sauce", sauceSchema);
