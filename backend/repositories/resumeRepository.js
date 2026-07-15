const db = require("../config/database");

async function createResume({
    userId,
    originalName,
    filePath,
    fileSize,
    mimeType,
}) {
    const [result] = await db.execute(
        `INSERT INTO resumes
        (user_id, original_name, file_path, file_size, mime_type)
        VALUES (?, ?, ?, ?, ?)`,
        [
            userId,
            originalName,
            filePath,
            fileSize,
            mimeType,
        ]
    );

    return result;
}

const getUserResumes = async (userId) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM resumes
        WHERE user_id = ?;
        `,
        [userId]
    );

    return rows;
};

const findByIdAndUserId = async (resumeId, userId) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM resumes
        WHERE id = ?
        AND user_id = ?;
        `,
        [
            resumeId,
            userId
        ]
    );

    return rows[0];
};

module.exports = {
    createResume,
    getUserResumes,
    findByIdAndUserId
};

