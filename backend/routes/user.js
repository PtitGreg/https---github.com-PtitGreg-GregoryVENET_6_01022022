// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET
// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs
// Import d'express et création du router
const router = require("express").Router();
// Import et déclaration du control utilisateur
const userCtrl = require("../controllers/user");
// Création d'un nouvel utilisateur
router.post("/signup", userCtrl.signup);
// Connection d'un utilisateur
router.post("/login", userCtrl.login);
// export du router
module.exports = router;
