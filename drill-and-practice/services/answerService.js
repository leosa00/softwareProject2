import { sql } from '../database/database.js';

const countAnswers = async () => {
    const result = await sql`SELECT COUNT(*) FROM question_answers`;
    return result.count;
};

// Add additional functionalities as needed, such as recording answers, fetching answer details, etc.

export { countAnswers };