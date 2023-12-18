import * as topicService from '../../services/topicService.js';
import * as questionService from '../../services/questionService.js';
import { validasaur } from "../../deps.js";


const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

async function validateData(data, rules, render, template, context) {
  const [passes, errors] = await validasaur.validate(data, rules);

  if (!passes) {
    context.validationErrors = errors;
    await render(template, context);
    return false;
  }

  return true;
}

const showTopicDetails = async ({ params, render, user }) => {
    const topicId = params.id;
    const topic = await topicService.findTopicById(topicId);
    const questions = await questionService.findQuestionsForTopic(topicId);

    await render('topic.eta', { topic, questions, user });
};

const addQuestionToTopic = async ({ request, params, response, render, user }) => {
    if (!user) {
        response.status = 403;
        return;
    }

    const formData = await request.body({ type: 'form' });
    const formValues = await formData.value;
    const questionData = { question_text: formValues.get('question_text') };

    if (!(await validateData(questionData, questionValidationRules, render, 'topic.eta', {
        topic: await topicService.findTopicById(params.id),
        questions: await questionService.findQuestionsForTopic(params.id),
        user,
        formData: questionData
    }))) {
        return;
    }

    await questionService.createQuestion(user.id, params.id, questionData.question_text);
    response.redirect(`/topics/${params.id}`);
};

const listTopics = async ({ render, user }) => {
    const topics = await topicService.findAllTopics();
    await render('topicList.eta', { topics, user });
};

const addTopic = async ({ request, response, render, user }) => {
    if (!user || !user.admin) {
        response.status = 403;
        return;
    }

    const formData = await request.body({ type: 'form' });
    const formValues = await formData.value;
    const topicData = { name: formValues.get('name') };

    if (!(await validateData(topicData, topicValidationRules, render, 'topicList.eta', {
        user,
        topics: await topicService.findAllTopics(),
        formData: topicData
    }))) {
        return;
    }

    await topicService.createTopic(user.id, topicData.name);
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

export { listTopics, addTopic, deleteTopic, showTopicDetails, addQuestionToTopic };