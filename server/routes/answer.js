const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer");

router.get("/getall/:profile_id/:rank", answerController.getall_profile_rank);
router.get("/getall/:profile_id", answerController.getall_profile);
router.post("/create", answerController.create);
router.post("/update", answerController.update);
router.get("/update/rank", answerController.update_rank);
router.get("/delete/:id", answerController.delete);

module.exports = router;
