import * as topicService from '/drill-and-practice/services/topicService.js';
import * as questionService from '/drill-and-practice/services/questionService.js';

const showTopicDetails = async ({ params, render, user }) => {
    const topicId = params.id;
    const topic = await topicService.findTopicById(topicId);
    const questions = await questionService.findQuestionsForTopic(topicId);

    await render('topic.eta', { topic, questions, user });
};

const addQuestionToTopic = async ({ request, params, response, user }) => {
    if (!user) {
        response.status = 403;
        return;
    }

    const formData = await request.body({ type: 'form' });
    const formValues = await formData.value;

    const questionText = formValues.get('question_text');

    if (!questionText || questionText.trim().length === 0) {
        // Handle validation error
        // Optionally re-render the page with error message
        return;
    }

    try {
        await questionService.createQuestion(user.id, params.id, questionText);
        response.redirect(`/topics/${params.id}`);
    } catch (error) {
        // Handle other errors
    }
};
const listTopics = async ({ render, user }) => {
    const topics = await topicService.findAllTopics();
    await render('topicList.eta', { topics, user });
};

const addTopic = async ({ request, response, user }) => {
    if (!user || !user.admin) {
         response.status = 403;
         return;
    }

    const formData = await request.body({ type: 'form' });
    const formValues = await formData.value;
    const name = formValues.get('name');

    if (!name || name.trim().length === 0) {
        // Handle validation error
        response.status = 400; // Bad Request
        return;
    }

    await topicService.createTopic(user.id, name);
    response.redirect('/topics');
};

const deleteTopic = async ({ params, response, user }) => {
    if (!user || !user.admin) {
        response.status = 403;
        return;
    }

    await topicService.deleteTopic(params.id);
    response.redirect('/topics');
};
export { listTopics, addTopic, deleteTopic, showTopicDetails, addQuestionToTopic};