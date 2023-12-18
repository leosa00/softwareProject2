import * as questionService from '../../services/questionService.js';
import * as questionOptionService from '../../services/questionOptionService.js';

const getRandomQuestion = async ({ response }) => {
    const questions = await questionService.findAllQuestions();
    if (questions.length === 0) {
        response.body = {};
        return;
    }

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const options = await questionOptionService.findOptionsForQuestion(randomQuestion.id);

    response.body = {
        questionId: randomQuestion.id,
        questionText: randomQuestion.question_text,
        answerOptions: options.map(option => ({
            optionId: option.id,
            optionText: option.option_text
        }))
    };
};

const checkAnswer = async ({ request, response }) => {
    const { questionId, optionId } = await request.body().value;
    const correctOption = await questionOptionService.findCorrectOptionForQuestion(questionId);

    response.body = {
        correct: correctOption && correctOption.id === optionId
    };
};

export { getRandomQuestion, checkAnswer };