import { sql } from './database.js';

const findAllTopics = async () => {
    return await sql`SELECT * FROM topics`;
};

const createTopic = async (userId, name) => {
    return await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name}) RETURNING *`;
};

const deleteTopic = async (id) => {
    return await sql`DELETE FROM topics WHERE id = ${id}`;
};

// Add more functions as needed

export { findAllTopics, createTopic, deleteTopic };