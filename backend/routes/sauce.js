// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les sauces
// Dans le routeur on ne veut QUE la logique de routing, ainsi la logique métier sera enregistrée dans le controller sauce.js
// Appel et déclaration du router d'express
const router = require("express").Router();
// Appel et declaration du middleware pour securiser les routes
const auth = require("../middleware/auth");
// Appel et déclaration de multer pour la gestion de fichiers images
const multer = require("../middleware/multer-config");
// Importation du controleur sauce.js aux routes
const sauceCtrl = require("../controllers/sauce");
const isOwner = require("../middleware/isOwner")

//Route du CRUD des sauces
// Route qui permet de récupérer toutes les sauces
// Renvoie le tableau de toutes les sauces dans la base de données
router.get("/", auth, sauceCtrl.getAllSauces);
// Route qui permet de créer "une sauce"
router.post("/", auth, multer, sauceCtrl.createSauce);
// Route qui permet de cliquer sur une des sauces précise
// Renvoie la sauce avec l'ID fourni
router.get("/:id", auth, sauceCtrl.getOneSauce);
// Route qui permet de modifier "une sauce"
router.put("/:id", auth, isOwner, multer, sauceCtrl.modifySauce);
// Route qui permet de supprimer "une sauce"
// Supprime la sauce avec l'ID fourni.
router.delete("/:id", isOwner, auth, sauceCtrl.deleteSauce);
// Route qui permet de gérer les likes des sauces
router.post("/:id/like", auth, sauceCtrl.likeSauce);
// Export des routes
module.exports = router;
