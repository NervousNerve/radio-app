const express = require("express");

const router = express.Router();
const categoriesRoute = require("../controllers/categoriesController");

router.get("", categoriesRoute.getAllCategories);

module.exports = router;
