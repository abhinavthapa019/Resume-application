const resumeRepository = require("../repositories/resumeRepository");
const fs = require("fs/promises");
const pdfParserClient = require("../clients/pdfParserClient");

const uploadResume = async (resumeData) => {
      const { filePath } = resumeData;
    const text = await pdfParserClient.extractText(filePath);
console.log(text);
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

const getDownloadInfo = async (resumeId, userId) => {
    return await resumeRepository.findDownloadInfoByIdAndUserId(
        resumeId,
        userId
    );
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