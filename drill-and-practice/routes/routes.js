import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js"
import * as questionsController from "./controllers/questionsController.js";
import * as quizController from "./controllers/quizController.js";
import * as quizFeedbackController from './controllers/quizFeedbackController.js';
import * as apiController from './apis/apiController.js';

const router = new Router();

// Main Page
router.get("/", mainController.showMain);

// Topic Routes
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", topicController.showTopicDetails);
router.post("/topics/:id/questions", topicController.addQuestionToTopic);


router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics/:id/questions/:qId", questionsController.showQuestionDetails);
router.post("/topics/:id/questions/:qId/options", questionsController.addAnswerOption);

router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionsController.deleteAnswerOption);
router.post("/topics/:tId/questions/:qId/delete", questionsController.deleteQuestion);

router.get('/quiz', quizController.showQuizTopics);
router.get('/quiz/:tId', quizController.showRandomQuestion);
router.get('/quiz/:tId/questions/:qId', quizController.showQuestion);
router.post('/quiz/:tId/questions/:qId/options/:oId', quizController.processAnswer);

router.get('/quiz/:tId/questions/:qId/correct', quizFeedbackController.showCorrectAnswerPage);
router.get('/quiz/:tId/questions/:qId/incorrect', quizFeedbackController.showIncorrectAnswerPage);

router.get('/api/questions/random', apiController.getRandomQuestion);
router.post('/api/questions/answer', apiController.checkAnswer);


export { router };