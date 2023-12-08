import * as questionService from '../services/questionService.js';

const listQuestionsForTopic = async ({ params, response }) => {
    const questions = await questionService.findQuestionsForTopic(params.topicId);
    response.body = questions;
};

const addQuestionToTopic = async ({ request, params, response }) => {
    const { value } = await request.body();
    const newQuestion = await questionService.createQuestion(value.user_id, params.topicId, value.text);
    response.body = { message: "Question added successfully", newQuestion };
};

export { listQuestionsForTopic, addQuestionToTopic };