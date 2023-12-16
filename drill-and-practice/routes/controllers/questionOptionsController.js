
import * as questionOptionService from '/drill-and-practice/services/questionOptionService.js';

const addAnswerOption = async ({ request, params, response }) => {
    const { value } = await request.body();
    await questionOptionService.addAnswerOption(params.questionId, value.optionText, value.isCorrect);
    response.redirect(`/topics/${params.topicId}/questions/${params.questionId}`);
};

const deleteAnswerOption = async ({ params, response }) => {
    await questionOptionService.deleteAnswerOption(params.optionId);
    response.redirect(`/topics/${params.topicId}/questions/${params.questionId}`);
};

export { addAnswerOption, deleteAnswerOption };