import { sql } from './database.js';

const findUserByEmail = async (email) => {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (result.count === 0) {
        return null;
    }
    return result[0];
};

const createUser = async (email, hashedPassword) => {
    return await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *`;
};

// Add more functions as needed

export { findUserByEmail, createUser };