
const db = require("../config/db");

const getDashboard = async (userId) => {

    const [rows] = await db.execute(
        `
        SELECT
            COUNT(*) AS totalInterviews,
            ROUND(AVG(ir.score),2) AS averageScore,
            ROUND(AVG(ir.percentage),2) AS averagePercentage,
            MAX(ir.score) AS highestScore
        FROM interview_results ir
        JOIN interview_quizzes iq
            ON ir.quiz_id = iq.id
        WHERE iq.user_id = ?
        `,
        [userId]
    );

    return rows[0];

};

module.exports = {
    getDashboard,
};