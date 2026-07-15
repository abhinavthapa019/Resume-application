const resumeRepository = require("../repositories/resumeRepository");

const uploadResume = async (resumeData) => {
    return await resumeRepository.createResume(resumeData);
};


const getUserResumes = async (userId) => {
    return await resumeRepository.getUserResumes(userId);
};


const getResumeById = async (resumeId, userId) => {
    return await resumeRepository.findByIdAndUserId(
        resumeId,
        userId
    );
};

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById
};