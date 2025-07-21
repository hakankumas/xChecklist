const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

router.get("/getall", profileController.getall);
router.get("/:id", profileController.get);
router.post("/create", profileController.create);
router.post("/update", profileController.update);
router.get("/delete/:id", profileController.delete);
router.post("/update/stepno", profileController.stepno);

module.exports = router;
