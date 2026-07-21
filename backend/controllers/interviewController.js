const interviewService = require("../services/interviewService");

const generateInterview = async (req, res) => {
    try {

        const { stack, difficulty } = req.body;
        const userId = req.user.id;

        const { quizId, questions } =
            await interviewService.generateInterview(
                userId,
                stack,
                difficulty
            );

        res.status(200).json({
            quizId,
            stack,
            difficulty,
            totalQuestions: questions.length,
            questions,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const submitInterview = async (req, res) => {
    try {

        const { quizId, answers } = req.body;
        const userId = req.user.id;

        const result =
            await interviewService.submitInterview(
                userId,
                quizId,
                answers
            );

        res.status(200).json({
            message: "Interview submitted successfully.",
            ...result,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    generateInterview,
    submitInterview,
};