const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");
const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [isEmail],
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
