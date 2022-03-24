// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET

const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");

const regex = (entry) => (/[$\/<>;]/.test(entry) ? false : true);
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
		type: [String],
		required: true,
	},
	usersDisliked: {
		type: [String],
		required: true,
	},
});

sauceSchema.plugin(sanitizerPlugin);
module.exports = mongoose.model("Sauce", sauceSchema);
