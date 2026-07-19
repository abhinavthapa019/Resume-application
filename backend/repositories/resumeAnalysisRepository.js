const db = require("../config/database");

const createAnalysis = async (analysisData) => {

    const {
        resumeId,
        atsScore,
        grammarScore,
        formattingScore,
        strengths,
        weaknesses,
        missingKeywords,
        suggestions,
        modelName,
        promptVersion,
    } = analysisData;

    const [result] = await db.execute(
        `
        INSERT INTO resume_analysis
        (
            resume_id,
      
            ats_score,
            grammar_score,
            formatting_score,
            strengths,
            weaknesses,
            missing_keywords,
            suggestions,
            model_name,
            prompt_version
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            resumeId,
         
            atsScore,
            grammarScore,
            formattingScore,
            JSON.stringify(strengths),
            JSON.stringify(weaknesses),
            JSON.stringify(missingKeywords),
            JSON.stringify(suggestions),
            modelName,
            promptVersion,
        ]
    );

    return result.insertId;
};

const findByResumeId = async (resumeId) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM resume_analysis
        WHERE resume_id = ?;
        `,
        [resumeId]
    );

      const analysis = rows[0];

    if (!analysis) {
        return null;
    }

    analysis.strengths = JSON.parse(analysis.strengths);
    analysis.weaknesses = JSON.parse(analysis.weaknesses);
    analysis.missing_keywords = JSON.parse(analysis.missing_keywords);
    analysis.suggestions = JSON.parse(analysis.suggestions);

    return analysis;
};

module.exports = {
    createAnalysis,
    findByResumeId
};