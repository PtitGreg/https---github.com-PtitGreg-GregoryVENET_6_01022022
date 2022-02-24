const Sauce = require("../models/sauce");
const fs = require("fs");
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	});
	sauce.save()
		.then(() => res.status(201).json({ message: "sauce enregistrée !" }))
		.catch((error) => res.status(400).json({ error }));
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
				error,
			});
		});
};

exports.modifySauce = (req, res) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id },
	)
		.then(() => res.status(201).json({ message: "Sauce modifiée !" }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "sauce supprimée !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res) => {
	Sauce.find()
		.then((sauces) => {
			res.status(200).json(sauces);
		})
		.catch((error) => {
			res.status(404).json({
				error,
			});
		});
};

exports.likeSauce = (req, res) => {
	const like = req.body.like;
	const userId = req.body.userId;
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			let userLike = sauce.usersLiked.find((id) => id === userId);
			let userDislike = sauce.usersDisliked.find((id) => id === userId);
			switch (like) {
				case 1:
					sauce.likes += 1;
					sauce.usersLiked.push(userId);
					break;
				case 0:
					if (userLike) {
						sauce.likes -= 1;
						sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
					}
					if (userDislike) {
						sauce.dislikes -= 1;
						sauce.usersDisliked = sauce.usersDisliked.filter(
							(id) => id !== userId,
						);
					}
					break;
				case -1:
					sauce.dislikes += 1;
					sauce.usersDisliked.push(userId);
					break;
				default:
					null;
			}
			sauce
				.save()
				.then(() => res.status(201).json({ message: "Statut crée !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};
