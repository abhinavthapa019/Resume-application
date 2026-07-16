const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

const testConnection = async () => {
    const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: "Say hello in one sentence.",
    });

    return response.text;
};

module.exports = {
    testConnection,
};