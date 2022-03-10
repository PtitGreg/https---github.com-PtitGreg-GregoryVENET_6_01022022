// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Récup et déclaration du modèle de sauce
const Sauce = require("../models/sauce");
// Intégration gestion de fichier
const fs = require("fs");
// Création sauce
exports.createSauce = (req, res) => {
	const sauceObject = JSON.parse(req.body.sauce); //transforme la sauce de json en object
	// Création instance du modèle sauce
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`, //Génère l'URL de l'image en créant une chaîne dynamique de l'URL
	});
	// Sauvegarde de la sauce dans la base de données
	sauce
		.save()
		//Envoi de la réponse au front si ok avec statut 201
		.then(() => res.status(201).json({ message: "Sauce créée !" }))
		// Envoi du code d'erreur en cas de problèmes
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
		? // Si la modification contient une image alors
		  (Sauce.findOne({
				_id: req.params.id,
		  }).then((sauce) => {
				// On supprime l'ancienne image du serveur
				const filename = sauce.imageUrl.split("/images/")[1];
				fs.unlinkSync(`images/${filename}`);
		  }),
		  (sauceObject = {
				// On modifie les données et on ajoute la nouvelle image
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }))
		: // Si la modification ne contient pas de nouvelle image
		  (sauceObject = {
				...req.body,
		  }); //sinon on prend le corps de la requête
	Sauce.updateOne(
		{ _id: req.params.id },
		{ ...sauceObject, _id: req.params.id },
	) //On modifie celui dont l'ID est égale à l'ID envoyé dans les paramètres de requêtes
		.then(() => res.status(200).json({ message: "Sauce modifiée" }))
		.catch((error) => res.status(400).json({ error }));
};
//Suppression sauce
exports.deleteSauce = (req, res) => {
	// Cherche le produit
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			// Split du fichier image
			const filename = sauce.imageUrl.split("/images/")[1];
			// Suppression de l'image et de la sauce en question
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
	// On utilise la méthode find pour obtenir la liste complète des sauces trouvées dans la base
	Sauce.find()
		// Si ok, renvoi des sauces avec code 200
		.then((sauces) => {
			res.status(200).json(sauces);
		})
		// Sinon erreur avec message
		.catch((error) => {
			res.status(404).json({
				error,
			});
		});
};
// Gestion des likes
exports.likeSauce = (req, res) => {
	// Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
	// Like présent dans le body
	let like = req.body.like;
	// Recuper UserId
	let userId = req.body.userId;
	// On prend l'id de la sauce
	let sauceId = req.params.id;

	if (like === 1) {
		// Like
		Sauce.updateOne(
			{ _id: sauceId },
			{
				// On push l'utilisateur et on incrémente le compteur de 1
				$push: { usersLiked: userId },
				$inc: { likes: +1 },
			},
		)
			.then(() => res.status(200).json({ message: "Like ajouté !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (like === -1) {
		Sauce.updateOne(
			// Dislike
			{ _id: sauceId },
			{
				$push: { usersDisliked: userId },
				$inc: { dislikes: +1 }, // On incrémente de 1
			},
		)
			.then(() => {
				res.status(200).json({ message: "Dislike ajouté !" });
			})
			.catch((error) => res.status(400).json({ error }));
	}
	if (like === 0) {
		// Si il s'agit d'annuler un like ou un dislike
		Sauce.findOne({ _id: sauceId })
			.then((sauce) => {
				if (sauce.usersLiked.includes(userId)) {
					// Pour annuler un like
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$pull: { usersLiked: userId },
							$inc: { likes: -1 }, // On incrémente de -1
						},
					)
						.then(() => res.status(200).json({ message: "Like retiré !" }))
						.catch((error) => res.status(400).json({ error }));
				}
				if (sauce.usersDisliked.includes(userId)) {
					// pour annuler un dislike
					Sauce.updateOne(
						{ _id: sauceId },
						{
							$pull: { usersDisliked: userId },
							$inc: { dislikes: -1 }, // On incrémente de -1
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
