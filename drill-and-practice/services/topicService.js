import { sql } from '../database/database.js';

const findTopicById = async (topicId) => {
    const result = await sql`SELECT * FROM topics WHERE id = ${topicId}`;
    if (result.count === 0) {
        return null;
    }
    return result[0]; 
};

const findAllTopics = async () => {
    return await sql`SELECT * FROM topics ORDER BY name`;
};

const createTopic = async (userId, name) => {
    return await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const deleteTopic = async (id) => {
    return await sql`DELETE FROM topics WHERE id = ${id}`;
};

const countTopics = async () => {
    const result = await sql`SELECT COUNT(*) FROM topics`;
    return result.count;
};

export { findAllTopics, createTopic, deleteTopic, countTopics, findTopicById };