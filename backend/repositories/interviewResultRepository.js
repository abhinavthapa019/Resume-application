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

module.exports = {
    createResult,
};