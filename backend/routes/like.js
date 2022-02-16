const router = require("express").Router()

const likeCtrl = require("../controllers/like")

router.post("/:id/like"), likeCtrl.likeStat;

module.exports = router
