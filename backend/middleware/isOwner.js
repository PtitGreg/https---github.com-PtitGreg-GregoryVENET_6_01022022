const Sauce = require("../models/sauce");

module.exports = (req, res, next) => {
	try {
		console.log(Sauce);
		Sauce.findOne({
			_id: req.params.id,
		}).then((sauce) => {
			if (sauce.userId === req.token.userId) next();
			else {
				return res.status(403).json({message: "Vous n'êtes pas le propriétaire"})
			};
		});
	} catch (error) {
		res.status(403).json({ error });
	}
};
