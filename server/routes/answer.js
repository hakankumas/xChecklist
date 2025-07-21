const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer");

router.get("/getall/:profile_id/:rank", answerController.getall_profile_rank);
router.get("/getall/:profile_id", answerController.getall_profile);
router.post("/create", answerController.create);
router.get("/update/rank", answerController.update_rank);
router.get("/remove", answerController.remove);

module.exports = router;
