const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdf");

router.post("/update", pdfController.update);

module.exports = router;
