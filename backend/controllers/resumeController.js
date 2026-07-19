const resumeService = require("../services/resumeService");



const uploadResume = async (req, res) => {
    try {
        const userId = req.user.id;

        const resumeData = {
            userId,
            originalName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
        };

        // Call service
        const { createdResume, analysis } = await resumeService.uploadResume(resumeData);

        res.status(201).json({
            message: "Resume uploaded successfully",
            resume: createdResume,
            analysis
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserResumes = async (req, res) => {
    try {
        const userId = req.user.id;

        const resumes = await resumeService.getUserResumes(userId);

        res.status(200).json({
            resumes,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getResumeById = async (req, res) => {
    try {
        const resumeId = req.params.id;
        const userId = req.user.id;

        const resume = await resumeService.getResumeById(
            resumeId,
            userId
        );

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.status(200).json({
            resume
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const downloadResume = async (req, res) => {
    try {
        const resumeId = req.params.id;
        const userId = req.user.id;

        const downloadInfo = await resumeService.getDownloadInfo(
            resumeId,
            userId
        );

        if (!downloadInfo) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        res.download(
            downloadInfo.file_path,
            downloadInfo.original_name
        );

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


const deleteResume = async (req, res) => {
    try {
        const resumeId = req.params.id;
        const userId = req.user.id;

        const deleted = await resumeService.deleteResume(
            resumeId,
            userId
        );

        if (!deleted) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        res.status(200).json({
            message: "Resume deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getResumeAnalysis = async (req, res) => {
    try {
        const resumeId = req.params.id;
        const userId = req.user.id;

        const analysis = await resumeService.getResumeAnalysis(
            resumeId,
            userId
        );

        if (!analysis) {
            return res.status(404).json({
                message: "Analysis not found"
            });
        }

        res.status(200).json({
            analysis
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    downloadResume, 
    deleteResume,
    getResumeAnalysis
};