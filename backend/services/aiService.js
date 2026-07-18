const geminiClient = require("../clients/geminiClient");

const testConnection = async () => {
    return await geminiClient.testConnection();
};

const analyzeResume = async (resumeText) => {
    const prompt = `
You are an expert ATS resume reviewer.

Analyze the following resume.

Return ONLY valid JSON.

Use EXACTLY this schema:

{
  "atsScore": integer (0-100),
  "grammarScore": integer (0-100),
  "formattingScore": integer (0-100),
  "strengths": array of strings,
  "weaknesses": array of strings,
  "missingKeywords": array of strings,
  "suggestions": array of strings
}

Rules:

- atsScore must be an integer between 0 and 100.
- grammarScore must be an integer between 0 and 100.
- formattingScore must be an integer between 0 and 100.
- strengths must contain 3-6 strings.
- weaknesses must contain 3-6 strings.
- missingKeywords must contain only keywords.
- suggestions must contain actionable improvements.
- Do not include markdown.
- Do not wrap the JSON in blocks.
- Return only json  object.

Resume;

${resumeText}
`;

    return await geminiClient.analyzeResume(prompt);
};

module.exports = {
    testConnection,
    analyzeResume,
};