const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const interviewController = require("../controllers/interviewController");
const {generateInterviewSchema,submitInterviewSchema}=require("../validator/interviewValidator")
const validate=require("../middleware/validate")


router.post(
    "/generate",
    authMiddleware,
       validate(generateInterviewSchema),
    interviewController.generateInterview
);


router.post(
    "/submit",
    authMiddleware,
       validate(submitInterviewSchema),
    interviewController.submitInterview
);

router.patch(
    "/save/:id",
    authMiddleware,
    interviewController.saveInterview
);

router.delete(
    "/:id",
    authMiddleware,
    interviewController.deleteInterview
);

router.get(
    "/history",
    authMiddleware,
    interviewController.getInterviewHistory
);

module.exports = router;