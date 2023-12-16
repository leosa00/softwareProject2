import { sql } from '../database/database.js';

const addAnswerOption = async (questionId, optionText, isCorrect) => {
    if (!optionText || optionText.trim().length === 0) {
        throw new Error("Option text must contain at least one character.");
    }
    return await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionId}, ${optionText}, ${isCorrect}) RETURNING *`;
};

const findOptionsForQuestion = async (questionId) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
};

const deleteAnswerOption = async (optionId) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
};

const findOptionById = async (optionId) => {
    const result = await sql`SELECT * FROM question_answer_options WHERE id = ${optionId}`;
    if (result.count === 0) {
        return null;
    }
    return result[0];
};

const findCorrectOptionForQuestion = async (questionId) => {
    const result = await sql`
        SELECT * FROM question_answer_options 
        WHERE question_id = ${questionId} AND is_correct = true
    `;

    if (result.length === 0) {
        return null;
    }
    return result[0];
};


export { addAnswerOption, findOptionsForQuestion, deleteAnswerOption, findOptionById, findCorrectOptionForQuestion  };
