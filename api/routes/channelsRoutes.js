const express = require("express");

const router = express.Router();
const channelsController = require("../controllers/channelsController");

router.get("/", channelsController.getChannels);

module.exports = router;
