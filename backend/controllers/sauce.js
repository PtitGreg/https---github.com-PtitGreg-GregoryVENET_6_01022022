// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET

const Sauce = require("../models/sauce");
const fs = require("fs");

// Création sauce
exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce);
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce créée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// récup détail sauce
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

// modification de sauce
exports.modifySauce = (req, res) => {
	let sauceObject = {};
	req.file
		?
		  (Sauce.findOne({
				_id: req.params.id,
		  }).then((sauce) => {
				const filename = sauce.imageUrl.split("/images/")[1];
				fs.unlinkSync(`images/${filename}`);
		  }),
		  (sauceObject = {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }))
		:
		  (sauceObject = {
				...req.body,
		  });
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id },
	)
		.then(() => res.status(200).json({ message: "Sauce modifiée" }))
		.catch((error) => res.status(400).json({ error }));
};

//Suppression sauce
exports.deleteSauce = (req, res) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Sauce supprimée !" }))
					.catch((error) => res.status(403).json({ error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

//Recup des sauces
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

// Gestion des likes
exports.likeSauce = (req, res) => {
	let like = req.body.like;
	let userId = req.body.userId;
	let sauceId = req.params.id;

	if (like === 1) {
		// Like
		Sauce.updateOne(
			{ _id: sauceId },
			{
				$push: { usersLiked: userId },
				$inc: { likes: +1 },
			},
		)
			.then(() => res.status(200).json({ message: "Like ajouté !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (like === -1) {
		Sauce.updateOne(
			{ _id: sauceId },
			{
				$push: { usersDisliked: userId },
				$inc: { dislikes: +1 },
			},
		)
			.then(() => {
				res.status(200).json({ message: "Dislike ajouté !" });
			})
			.catch((error) => res.status(400).json({ error }));
	}
	if (like === 0) {
		Sauce.findOne({ _id: sauceId })
			.then((sauce) => {
				if (sauce.usersLiked.includes(userId)) {
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$pull: { usersLiked: userId },
							$inc: { likes: -1 },
						},
					)
						.then(() => res.status(200).json({ message: "Like retiré !" }))
						.catch((error) => res.status(400).json({ error }));
				}
				if (sauce.usersDisliked.includes(userId)) {
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$pull: { usersDisliked: userId },
							$inc: { dislikes: -1 },
						},
					)
						.then(() => res.status(200).json({ message: "Dislike retiré !" }))
						.catch((error) => res.status(400).json({ error }));
				}
			})
			.catch((error) =>
				res.status(404).json({
					error,
				}),
			);
	}
};
