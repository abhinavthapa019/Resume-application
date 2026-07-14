const db = require("../config/database");

// Find user by email
async function findUserByEmail(email) {
    const [rows] = await db.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}

// Create new user
async function createUser(name, email, password) {
    const [result] = await db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );

    return result;
}

// Find user by ID
async function findUserById(id) {
    const [rows] = await db.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
}

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
};