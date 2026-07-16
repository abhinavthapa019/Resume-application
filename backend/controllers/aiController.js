const aiService = require("../services/aiService");

const testConnection = async (req, res) => {
    try {
        const message = await aiService.testConnection();

        res.status(200).json({
            success: true,
            message,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    testConnection,
};