import * as questionOptionService from '../../services/questionOptionService.js';

const showCorrectAnswerPage = async ({ params, render }) => {
    await render('correct.eta', { topicId: params.tId });
};

const showIncorrectAnswerPage = async ({ params, render }) => {
    const correctOption = await questionOptionService.findCorrectOptionForQuestion(params.qId);
    await render('incorrect.eta', {correctOptionText: correctOption ? correctOption.option_text : '',topicId: params.tId});
};
export { showCorrectAnswerPage, showIncorrectAnswerPage };
