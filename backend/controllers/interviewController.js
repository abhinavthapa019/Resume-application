const interviewService = require("../services/interviewService");

const generateInterview = async (req, res) => {
    try {

        const { stack, difficulty } = req.body;

        const questions = await interviewService.generateInterview(
            stack,
            difficulty
        );

        res.status(200).json({
            questions,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    generateInterview,
};