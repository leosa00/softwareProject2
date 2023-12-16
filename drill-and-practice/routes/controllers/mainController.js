import * as topicService from '/drill-and-practice//services/topicService.js';
import * as questionService from '/drill-and-practice/services/questionService.js';
import * as answerService from '/drill-and-practice/services/answerService.js'; 

const showMain = async ({ render }) => {
    const totalTopics = await topicService.countTopics();
    const totalQuestions = await questionService.countQuestions();
    const totalAnswers = await answerService.countAnswers();

    const stats = { totalTopics, totalQuestions, totalAnswers };

    await render('main.eta', { stats });
};



export { showMain };