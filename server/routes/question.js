const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question");

router.get("/getall", questionController.getall);
router.get("/:id", questionController.get);
router.get("/rank/:id", questionController.rank);
router.post("/create", questionController.create);
router.post("/update", questionController.update);
router.post("/update/rank", questionController.update_rank);
router.get("/delete/:id", questionController.delete);

module.exports = router;
