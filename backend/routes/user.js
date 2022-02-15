const router = require("express").Router();

const userCtrl = require("../controllers/user");

router.post("/api/auth/signup", userCtrl.signup);
router.post("/api/auth/login", userCtrl.login);

module.exports = router;
