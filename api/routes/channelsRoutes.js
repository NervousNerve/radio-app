const express = require("express");

const router = express.Router();
const channelsController = require("../controllers/channelsController");

router.get("", channelsController.getAllChannels);

module.exports = router;
