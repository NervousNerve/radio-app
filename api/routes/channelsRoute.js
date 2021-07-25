const express = require("express");

const router = express.Router();
const channelsController = require("../controllers/channelsController");

router.get("", channelsController.getAllChannels);
router.get("/:id", channelsController.getChannel);

module.exports = router;
