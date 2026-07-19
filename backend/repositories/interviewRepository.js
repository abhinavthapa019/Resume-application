const db = require("../config/db");

const createQuiz = async ({
    userId,
    stack,
    difficulty,
    questions,
}) => {

    const [result] = await db.execute(
        `
        INSERT INTO interview_quizzes
        (
            user_id,
            stack,
            difficulty,
            questions
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            userId,
            stack,
            difficulty,
            JSON.stringify(questions),
        ]
    );

    return result;
};

module.exports = {
    createQuiz,
};