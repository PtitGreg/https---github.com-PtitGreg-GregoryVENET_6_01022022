const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
	const sauce = new Sauce({
		name: req.body.name,
		manufacturer: req.body.manufacturer,
		description: req.body.description,
		mainPepper: req.body.mainPepper,
		imageUrl: req.body.imageUrl,
		heat: req.body.heat,
		likes: req.body.likes,
		dislikes: req.body.dislikes,
		usersLiked: req.body.usersLiked,
		userDisliked: req.body.userDisliked,
	});
	sauce.save()
		.then(() => {
			res.status(201).json({
				message: "Sauce enregistrée avec succès !",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.getOneSauce = (req, res) => {
	Sauce.findOne({
			_id: req.params.id,
		})
		.then((sauce) => {
			res.status(200).json(sauce);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.modifySauce = (req, res) => {
	const sauce = new Sauce({
		_id: req.params.id,
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		userId: req.body.userId,
	});
	Sauce.updateOne({ _id: req.params.id }, sauce)
		.then(() => {
			res.status(201).json({
				message: "Sauce mise à jour avec succès !",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.deleteThing = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }).then((thing) => {
		if (!thing) {
			res.status(404).json({
				error: new Error("No such Thing!"),
			});
		}
		if (thing.userId !== req.auth.userId) {
			res.status(400).json({
				error: new Error("Unauthorized request!"),
			});
		}
		Sauce.deleteOne({ _id: req.params.id })
			.then(() => {
				res.status(200).json({
					message: "Deleted!",
				});
			})
			.catch((error) => {
				res.status(400).json({
					error: error,
				});
			});
	});
};

exports.getAllSauce = (req, res) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
exports.createLike = (req, res) => {
	like.findOne({ _id: req.params})
}
