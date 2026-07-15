const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("../repositories/authRepository");

// Register
async function register(userData) {
    const { name, email, password } = userData;

    // Check duplicate email
    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const result = await authRepository.createUser(
        name,
        email,
        hashedPassword,
        
    );

    return result;
}

// Login
async function login(userData) {
    const { email, password } = userData;

    // Find user
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        token,
        user,
    };
}

module.exports = {
    register,
    login,
};