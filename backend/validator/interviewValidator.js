const Joi = require("joi");

const generateInterviewSchema = Joi.object({
    stack: Joi.string().required(),
    difficulty: Joi.string()
        .valid("Easy", "Medium", "Hard")
        .required(),
});

const submitInterviewSchema = Joi.object({
    quizId: Joi.number().integer().required(),
    answers: Joi.array()
        .items(Joi.number().integer().min(0).max(3))
        .required(),
});

module.exports = {
    generateInterviewSchema,
    submitInterviewSchema,
};