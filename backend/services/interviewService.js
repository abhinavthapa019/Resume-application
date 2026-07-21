const aiService = require("./aiService");
const interviewRepository = require("../repositories/interviewRepository");
const interviewResultRepository = require("../repositories/interviewResultRepository");

const generateInterview = async (
    userId,
    stack,
    difficulty
) => {

    const quiz = await aiService.generateInterviewQuiz(
        stack,
        difficulty
    );

    const result = await interviewRepository.createQuiz({
        userId,
        stack,
        difficulty,
        questions: quiz.questions,
    });

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

    const quiz =
        await interviewRepository.getQuizById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    if (quiz.user_id !== userId) {
        throw new Error("Unauthorized access");
    }

    const questions = JSON.parse(quiz.questions);

    let score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (answers[i] === questions[i].correctAnswer) {
            score++;
        }

    }

    const totalQuestions = questions.length;

    const percentage =
        Number(((score / totalQuestions) * 100).toFixed(2));

    await interviewResultRepository.createResult({
        quizId,
        answers,
        score,
        percentage,
    });

    return {
        score,
        totalQuestions,
        percentage,
    };

};

const saveInterview = async (
    userId,
    quizId
) => {

    const quiz =
        await interviewRepository.getQuizById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    if (quiz.user_id !== userId) {
        throw new Error("Unauthorized access");
    }

    await interviewRepository.saveQuiz(quizId);

};


const deleteInterview = async (
    userId,
    quizId
) => {

    const quiz =
        await interviewRepository.getQuizById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    if (quiz.user_id !== userId) {
        throw new Error("Unauthorized access");
    }

    await interviewRepository.deleteQuiz(quizId);

};


const getInterviewHistory = async (userId) => {

    const history =
        await interviewResultRepository.getInterviewHistory(userId);

    return history;

};





module.exports = {
    generateInterview,
    submitInterview,
      saveInterview,
      deleteInterview,
      getInterviewHistory
};