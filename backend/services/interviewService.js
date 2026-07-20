const aiService = require("./aiService");
const interviewRepository = require("../repositories/interviewRepository");

const generateInterview = async (
    userId,
    stack,
    difficulty
) => {

    // Generate complete quiz from Gemini
    const quiz = await aiService.generateInterviewQuiz(
        stack,
        difficulty
    );

    // Save complete quiz (includes correctAnswer & explanation)
    const result = await interviewRepository.createQuiz({
        userId,
        stack,
        difficulty,
        questions: quiz.questions,
    });

    // Remove sensitive fields before sending to frontend
    const questions = quiz.questions.map(question => ({
        question: question.question,
        options: question.options,
        category: question.category,
        difficulty,
    }));

    return {
        quizId: result.insertId,
        questions,
    };
};

const submitInterview = async (
    userId,
    quizId,
    answers
) => {

    // Load quiz from database
    const quiz = await interviewRepository.getQuizById(quizId);

    // Check quiz exists
    if (!quiz) {
        throw new Error("Quiz not found");
    }

    // Check ownership
    if (quiz.user_id !== userId) {
        throw new Error("Unauthorized access");
    }

    // Parse stored questions JSON
    const questions = JSON.parse(quiz.questions);

    // Validate answer count
    if (answers.length !== questions.length) {
        throw new Error("Invalid number of answers submitted");
    }

    let score = 0;

    // Compare answers
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].correctAnswer) {
            score++;
        }
    }

    const totalQuestions = questions.length;
    const percentage = Number(
        ((score / totalQuestions) * 100).toFixed(2)
    );

    return {
        score,
        totalQuestions,
        percentage,
    };
};

module.exports = {
    generateInterview,
    submitInterview,
};