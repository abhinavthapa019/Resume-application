const aiService = require("./aiService");

const generateInterview = async (stack, difficulty) => {

    const quiz = await aiService.generateInterviewQuiz(
        stack,
        difficulty
    );

    const questions = quiz.questions.map(question => ({
        question: question.question,
        options: question.options,
        category: question.category,
        difficulty
    }));

    return questions;
};

module.exports = {
    generateInterview,
};