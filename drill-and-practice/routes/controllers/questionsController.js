import { renderFile } from 'https://deno.land/x/eta@v2.2.0/mod.ts';
import * as questionService from '/drill-and-practice/services/questionService.js';
import * as questionOptionService from '/drill-and-practice/services/questionOptionService.js';


const showQuestionDetails = async ({ params, render }) => {
    const questionId = params.qId;
    const question = await questionService.findQuestionById(questionId);
    const options = await questionOptionService.findOptionsForQuestion(questionId);

    await render('questionDetails.eta', { question, options });
};

const addAnswerOption = async ({ request, params, response }) => {
    const formData = await request.body({ type: 'form' });
    const formValues = await formData.value;
    
    const optionText = formValues.get('option_text');
    const isCorrect = formValues.has('is_correct');

    try {
        await questionOptionService.addAnswerOption(params.qId, optionText, isCorrect);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    } catch (error) {
       //handle validation errors
    }
};
const listQuestionsForTopic = async ({ params, response }) => {
    const questions = await questionService.findQuestionsForTopic(params.topicId);
    const content = await renderFile(`${Deno.cwd()}/views/questionList.eta`, { questions, topicId: params.topicId });
    response.body = await renderFile(`${Deno.cwd()}/views/layouts/layout.eta`, { content });
};

const addQuestionToTopic = async ({ request, params, response }) => {
    const { value } = await request.body();
    await questionService.createQuestion(value.user_id, params.topicId, value.text);
    response.redirect(`/topics/${params.topicId}/questions`);
};

const deleteAnswerOption = async ({ params, response }) => {
    await questionOptionService.deleteAnswerOption(params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.tId}`);
};

export { listQuestionsForTopic, addQuestionToTopic, showQuestionDetails, addAnswerOption, deleteAnswerOption, deleteQuestion };