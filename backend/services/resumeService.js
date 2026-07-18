const resumeRepository = require("../repositories/resumeRepository");
const fs = require("fs/promises");
const pdfParserClient = require("../clients/pdfParserClient");
const aiService = require("./aiService");



const getUserResumes = async (userId) => {
    return resumeRepository.getUserResumes(userId);
};


const uploadResume = async (resumeData) => {
    const { filePath } = resumeData;

    // Extract text from PDF
    const text = await pdfParserClient.extractText(filePath);

    // Run AI analysis
    const analysis = await aiService.analyzeResume(text);

    // Save resume in DB
    const createdResume = await resumeRepository.createResume(resumeData);

    // Return both together
    return {
        createdResume,
        analysis
    };
};




const getResumeById = async (resumeId, userId) => {
    return resumeRepository.findByIdAndUserId(resumeId, userId);
};

const getDownloadInfo = async (resumeId, userId) => {
    return resumeRepository.findDownloadInfoByIdAndUserId(resumeId, userId);
};

const deleteResume = async (resumeId, userId) => {

    const resume = await resumeRepository.findByIdAndUserId(
        resumeId,
        userId
    );

    if (!resume) {
        return null;
    }

    await fs.unlink(resume.file_path);

    const result = await resumeRepository.deleteByIdAndUserId(
        resumeId,
        userId
    );

    return result;
};

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    getDownloadInfo,
    deleteResume
};