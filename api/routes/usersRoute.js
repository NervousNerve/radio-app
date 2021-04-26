const express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/whoami", usersController.whoami);
router.post("/login", usersController.login);
router.get("/logout", usersController.logout);
router.post("/register", usersController.register);

module.exports = router;
