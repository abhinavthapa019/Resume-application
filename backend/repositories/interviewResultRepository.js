const db = require("../config/db");

const createResult = async ({
    quizId,
    answers,
    score,
    percentage,
}) => {

    const [result] = await db.execute(
        `
        INSERT INTO interview_results
        (
            quiz_id,
            answers,
            score,
            percentage
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            quizId,
            JSON.stringify(answers),
            score,
            percentage,
        ]
    );

    return result;
};

const saveQuiz = async (quizId) => {

    const [result] = await db.execute(
        `
        UPDATE interview_quizzes
        SET is_saved = TRUE
        WHERE id = ?
        `,
        [quizId]
    );

    return result;

};

const db = require("../config/db");

const getInterviewHistory = async (userId) => {

    const [rows] = await db.execute(
        `
        SELECT
            iq.id AS quizId,
            iq.stack,
            iq.difficulty,
            ir.score,
            ir.percentage,
            ir.created_at AS submittedAt
        FROM interview_results ir
        JOIN interview_quizzes iq
            ON ir.quiz_id = iq.id
        WHERE iq.user_id = ?
        ORDER BY ir.created_at DESC
        `,
        [userId]
    );

    return rows;
};

module.exports = {
    getInterviewHistory,
};

module.exports = {
    createResult,
    saveQuiz
};