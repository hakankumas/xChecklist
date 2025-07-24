const express = require("express");
const router = express.Router();
const logController = require("../controllers/log");

router.get("/:id", logController.get);

module.exports = router;
