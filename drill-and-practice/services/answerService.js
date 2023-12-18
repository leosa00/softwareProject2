import { sql } from '../database/database.js';

const addUserAnswer = async (userId, questionId, answerOptionId) => {
    return await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${answerOptionId})`;
};


const findAnswersForQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answers WHERE question_id = ${questionId}`;
};

const countAnswers = async () => {
    const result = await sql`SELECT COUNT(*) FROM question_answers`;
    console.log("Total answers:", result);
    return Number(result[0].count);
};

export { addUserAnswer, findAnswersForQuestion, countAnswers };


