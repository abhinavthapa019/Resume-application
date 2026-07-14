const authService = require("../services/authService");

// Register
async function register(req, res) {
    try {
        const result = await authService.register(req.body);

        res.status(201).json({
            message: "User registered successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

// Login
async function login(req, res) {
    try {
        const result = await authService.login(req.body);

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: result.user,
        });
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
}

module.exports = {
    register,
    login,
};