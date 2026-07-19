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

    const response = await geminiClient.analyzeResume(prompt);

    const cleaned = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

return JSON.parse(cleaned);

    
};


const generateInterviewQuiz = async (
    stack,
    difficulty
) => {

    const prompt = `
You are an expert technical interviewer.

Generate EXACTLY 10 multiple choice questions.

Stack: ${stack}

Difficulty: ${difficulty}

Return ONLY valid JSON.

Schema:

{
  "questions": [
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
      ],
      "correctAnswer": 0,
      "explanation": "string",
      "category": "string"
    }
  ]
}

Rules:

- Exactly 10 questions.
- Exactly 4 options.
- correctAnswer must be 0,1,2 or 3.
- explanation should be concise.
- category should match the topic.
- Return only JSON.
`;

    return await geminiClient.generate(prompt);

};

module.exports = {
    testConnection,
    analyzeResume,
    generateInterviewQuiz 
};