const express = require("express");

const router = express.Router();
const programsController = require("../controllers/programsController");

router.get("", programsController.getAllPrograms);
router.get("/:id", programsController.getProgram);

module.exports = router;
