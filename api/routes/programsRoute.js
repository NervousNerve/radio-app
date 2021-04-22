const express = require("express");

const router = express.Router();
const programsRoute = require("../controllers/programsController");

router.get("", programsRoute.getAllPrograms);
router.get("/:id", programsRoute.getProgram);

module.exports = router;
