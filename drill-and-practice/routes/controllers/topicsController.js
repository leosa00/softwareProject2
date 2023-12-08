
import * as topicService from '../services/topicService.js';

const listTopics = async ({ response }) => {
    const topics = await topicService.findAllTopics();
    response.body = topics;
};

const addTopic = async ({ request, response }) => {
    const { value } = await request.body();
    const newTopic = await topicService.createTopic(value.user_id, value.name);
    response.body = { message: "Topic added successfully", newTopic };
};

const deleteTopic = async ({ params, response }) => {
    await topicService.deleteTopic(params.id);
    response.body = { message: "Topic deleted successfully" };
};

export { listTopics, addTopic, deleteTopic };