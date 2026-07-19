const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const interviewController = require("../controllers/interviewController");

router.post(
    "/generate",
    authMiddleware,
    interviewController.generateInterview
);

module.exports = router;