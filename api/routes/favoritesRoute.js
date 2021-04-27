const express = require("express");

const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

router.get("/programs", favoritesController.getAllFavoritePrograms);
router.post("/programs", favoritesController.addFavoriteProgram);

module.exports = router;
