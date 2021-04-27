const express = require("express");

const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

router.get("/channels", favoritesController.getAllFavoriteChannels);
router.get("/programs", favoritesController.getAllFavoritePrograms);
router.post("/channels", favoritesController.addFavoriteChannel);
router.post("/programs", favoritesController.addFavoriteProgram);

module.exports = router;
