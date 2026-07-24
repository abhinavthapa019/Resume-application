const express = require("express");
const router = express.Router();

const resumeController = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const rolemiddleware=require("../middleware/roleMiddleware")

router.post(
    "/",
    authMiddleware,
    upload.single("resume"),
    resumeController.uploadResume
);

router.get(
    "/",
    authMiddleware,
    resumeController.getUserResumes
);

router.get(
    "/:id",
    authMiddleware,
    resumeController.getResumeById
);

router.get(
    "/:id/download",
    authMiddleware,
    resumeController.downloadResume
);

router.delete(
    "/:id",
    authMiddleware,
    rolemiddleware,
    resumeController.deleteResume
);


router.get(
    "/:id/analysis",
    authMiddleware,
    resumeController.getResumeAnalysis
);
module.exports = router;