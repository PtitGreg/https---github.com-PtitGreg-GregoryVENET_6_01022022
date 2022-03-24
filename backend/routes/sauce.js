// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégory VENET

const router = require("express").Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");
const isOwner = require("../middleware/isOwner")

//Route du CRUD des sauces
router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, isOwner, multer, sauceCtrl.modifySauce);
router.delete("/:id", isOwner, auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);
module.exports = router;
