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
		.then(() => res.status(201).json("Sauce créée !"))
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
	if (req.file) {
		//si on trouve un fichier image dans la requête alors
		Sauce.findOne({ _id: req.params.id }) //Recherche la sauce avec cet Id
			.then((sauce) => {
				// Suppression de l'ancienne image du server
				const filename = sauce.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, (err) => {
					//supprime l'ancienne photo
					if (err) throw err;
				});
			})
			.catch((error) => res.status(400).json({ error }));
	}
	const sauceObject = req.file // si on trouve un fichier image dans la requête alors
		? {
				...JSON.parse(req.body.sauce), //on récupère l'objet json
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`, //et on ajoute l'image URL
		  }
		: { ...req.body }; //sinon on prend le corps de la requête
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
			// Récup et split du fichier image
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
		// Si ok, renvoi des sauces avec ode 200
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
	// Like du body
	let like = req.body.like;
	// User id
	let userId = req.body.userId;
	// Sauce id
	let sauceId = req.params.id;
	// Condition des likes et dislikes
	switch (like) {
		case 1: //si like
			Sauce.findOne({ _id: sauceId })
				.then((sauce) => {
					// Si l'utilisateur n'a pas déjà liké et like = 1
					if (!sauce.usersLiked.includes(userId) && like === 1) {
						Sauce.updateOne(
							{ _id: sauceId },
							// ajout id utilisateur et incrément du like
							{ $push: { usersLiked: userId }, $inc: { likes: +1 } },
						)
							.then(() => res.status(200).json({ message: "J'aime" }))
							.catch((error) => res.status(400).json({ error }));
						console.log(req.body);
					}
				})
				.catch((error) => res.status(404).json({ error }));
			break;

		case 0: //no like
			Sauce.findOne({ _id: sauceId })
				.then((sauce) => {
					// Si utilisateur déjà liké et like = 0
					if (sauce.usersLiked.includes(userId) && req.body.like === 0) {
						Sauce.updateOne(
							{ _id: sauceId },
							// Supression de il user et décrémente le like de 1
							{ $pull: { usersLiked: userId }, $inc: { likes: -1 } },
						)
							.then(() => res.status(200).json({ message: "Neutre" }))
							.catch((error) => res.status(400).json({ error }));
					}
					// si user déjà disliké et like = 0
					if (sauce.usersDisliked.includes(userId) && req.body.like === 0) {
						Sauce.updateOne(
							{ _id: sauceId },
							// Supression de user et décrémente le dislike a 0
							{ $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } },
						)
							.then(() => res.status(200).json({ message: "Neutre" }))
							.catch((error) => res.status(400).json({ error }));
					}
					console.log(req.body);
				})
				.catch((error) => res.status(404).json({ error }));
			break;

		case -1: //dislike
			Sauce.findOne({ _id: sauceId })
				.then((sauce) => {
					// si utlisateur non enregistré et like =-1
					if (!sauce.usersLiked.includes(userId) && req.body.like === -1) {
						Sauce.updateOne(
							{ _id: sauceId },
							// Ajout id user et incrémente 1dislike
							{ $push: { usersDisliked: userId }, $inc: { dislikes: +1 } },
						)
							.then(() => {
								res.status(200).json({ message: "Je n'aime pas" });
								console.log(req.body);
							})
							.catch((error) => res.status(400).json({ error }));
					}
				})
				.catch((error) => res.status(404).json({ error }));
			break;
		default:
			console.log(error);
	}
};
