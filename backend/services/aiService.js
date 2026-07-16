const geminiClient = require("../clients/geminiClient");

const testConnection = async () => {
    return await geminiClient.testConnection();
};

module.exports = {
    testConnection,
};