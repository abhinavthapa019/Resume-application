const aiService = require("./aiService");

const generateInterview = async (
    stack,
    difficulty
) => {

    const questions =
        await aiService.generateInterviewQuiz(
            stack,
            difficulty
        );

    return questions;
};

module.exports = {
    generateInterview,
};