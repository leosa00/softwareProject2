
import { sql } from '../database/database.js';

const findQuestionsForTopic = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
};

const createQuestion = async (userId, topicId, questionText) => {
    if (!questionText || questionText.trim().length === 0) {
        throw new Error("Question text must contain at least one character.");
    }
    return await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${questionText}) RETURNING *`;
};


const countQuestions = async () => {
    const result = await sql`SELECT COUNT(*) FROM questions`;
    return result.count;
};


const findQuestionById = async (questionId) => {
    const result = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
    if (result.count === 0) {
        return null;
    }
    return result[0];
};

const deleteQuestion = async (questionId) => {
    await sql`DELETE FROM questions WHERE id = ${questionId}`;
};


export { findQuestionsForTopic, createQuestion, countQuestions, findQuestionById, deleteQuestion };
