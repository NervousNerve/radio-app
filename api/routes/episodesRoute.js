const express = require("express");

const router = express.Router();
const episodesController = require("../controllers/episodesController");

router.get("", episodesController.getAllEpisodes);
router.get("/:id", episodesController.getEpisode);

module.exports = router;
