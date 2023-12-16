import * as topicService from '/drill-and-practice/services/topicService.js';
import * as questionService from '/drill-and-practice/services/questionService.js';
import * as questionOptionService from '/drill-and-practice/services/questionOptionService.js';

const showQuizTopics = async ({ render }) => {
    const topics = await topicService.findAllTopics();
    await render('quizTopics.eta', { topics });
};

const showRandomQuestion = async ({ params, response }) => {
    const questions = await questionService.findQuestionsForTopic(params.tId);
    if (questions.length === 0) {
        // Redirect to a "No questions" page or render a message
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

const processAnswer = async ({ params, response }) => {
    const selectedOptionId = params.oId;
    const selectedOption = await questionOptionService.findOptionById(selectedOptionId);

    if (!selectedOption) {
        // Handle the case where the option does not exist
        response.status = 404; // Not Found
        return;
    }

    if (selectedOption.is_correct) {
        // Redirect to the "Correct" page
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        // Redirect to the "Incorrect" page
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
};
export { showQuizTopics, showRandomQuestion, showQuestion, processAnswer };