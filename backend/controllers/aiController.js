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


const analyseResume = async (req, res) => {
    try {
        const resumeText = req.body?.text || req.body?.resume || req.body?.resumeText;

        if (!resumeText) {
            return res.status(400).json({ success: false, message: "Missing resume text in request body" });
        }

        const analysis = await aiService.analyzeResume(resumeText);

        res.status(200).json({
            success: true,
            analysis,
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
    analyseResume,
  
};