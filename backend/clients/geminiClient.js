const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const testConnection = async () => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Say hello in one sentence.",
    });

    return response.text;
};

module.exports = {
    testConnection,
};