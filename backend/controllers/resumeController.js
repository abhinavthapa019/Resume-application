const resumeService = require("../services/resumeService");



const uploadResume = async (req, res) => {
    try {
        const userId = req.user.id;
        // const file = req.file;

        const resume = await resumeService.uploadResume({
    userId,
    originalName: req.file.originalname,
    filePath: req.file.path,
    fileSize: req.file.size,
    mimeType: req.file.mimetype,
}
);

        res.status(201).json({
            message: "Resume uploaded successfully",
            resume,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
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
            downloadInfo.filePath,
            downloadInfo.originalName
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

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    downloadResume, 
    deleteResume
};