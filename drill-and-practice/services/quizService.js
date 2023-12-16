import { sql } from '../database/database.js';

const getRandomQuestionForTopic = async (topicId) => {
    // Example implementation - adjust according to your logic
    const questions = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
    if (questions.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
};

const checkAnswer = async (questionId, answerOptionId) => {
    const result = await sql`SELECT is_correct FROM question_answer_options WHERE id = ${answerOptionId} AND question_id = ${questionId}`;
    return result.length > 0 ? result[0].is_correct : false;
};

export { getRandomQuestionForTopic, checkAnswer };