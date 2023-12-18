import * as topicService from '../../services/topicService.js';
import * as questionService from '../../services/questionService.js';
import * as questionOptionService from '../../services/questionOptionService.js';
import * as answerService from '../../services/answerService.js';

const showQuizTopics = async ({ render }) => {
    const topics = await topicService.findAllTopics();
    await render('quizTopics.eta', { topics });
};

const showRandomQuestion = async ({ params, response, render }) => {
    const questions = await questionService.findQuestionsForTopic(params.tId);
    if (questions.length === 0) {
        await render('noQuestions.eta', { topicId: params.tId });
        return;
    }
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    response.redirect(`/quiz/${params.tId}/questions/${randomQuestion.id}`);
};

const showQuestion = async ({ params, render }) => {
    const question = await questionService.findQuestionById(params.qId);
    const options = await questionOptionService.findOptionsForQuestion(params.qId);
    await render('quizQuestion.eta', { question, options });
};

const processAnswer = async ({ params, response, user }) => {
    const selectedOptionId = params.oId;
    const selectedOption = await questionOptionService.findOptionById(selectedOptionId);

    if (!selectedOption) {
        response.status = 404;
        return;
    }

    if (user) {
        await answerService.addUserAnswer(user.id, params.qId, selectedOptionId);
    }

    if (selectedOption.is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
};
export { showQuizTopics, showRandomQuestion, showQuestion, processAnswer };