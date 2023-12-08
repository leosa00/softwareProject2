
import { sql } from './database.js';

const findQuestionsForTopic = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const createQuestion = async (userId, topicId, text) => {
    return await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${text}) RETURNING *`;
};

// Add more functions as needed

export { findQuestionsForTopic, createQuestion };