"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const generative_ai_1 = require("@google/generative-ai");
const specification_1 = require("./specification");
const Todo_1 = require("./src/models/Todo");
const AI_1 = require("./src/models/AI");
const quizz_1 = __importDefault(require("./quizz"));
const image_1 = __importDefault(require("./image"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(specification_1.mongoDBURL);
const genAi = new generative_ai_1.GoogleGenerativeAI(specification_1.geminiApiKey);
const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
// Todo
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo_1.TodoModel.find();
    console.log(todos);
    res.json(todos.map((item) => ({ message: item.message, id: item._id })));
}));
app.post('/push-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const dbSender = yield Todo_1.TodoModel.create({ message });
    res.json({ id: dbSender._id });
}));
app.post('/delete-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield Todo_1.TodoModel.findByIdAndDelete({ _id: id });
    res.json('success');
}));
// Talkto AI
app.post('/send-gemini-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const call = yield model.generateContent(prompt);
    const result = call.response.text();
    yield AI_1.AiModel.create({ prompt: result });
    res.json(result);
}));
app.get('/get-gemini-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield AI_1.AiModel.find();
    const conversationWithAi = response.map((conversation) => conversation.prompt);
    res.json(conversationWithAi);
}));
// Playground
app.post('/completion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sentence } = req.body;
    console.log(sentence);
    const completedSentence = yield model.generateContent(`Your given a context of the document with text, and your task is to complete last sentence, or write one sentence if there isn't any sentence started (NOT more than one sentence!). Also big note don't repeat sentence, just write it like you would continue (don't write whole sentence)! Here is the given part: ${sentence}`);
    res.json(completedSentence.response.text());
}));
app.post('/completion-users-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { context, usersResponse } = req.body;
    const completedSentence = yield model.generateContent(`Your given a context of the document with text, and users reponse about how he wants his text to be generated. If there is no context of document, but instead only the question of user how he wants his text to be generated, then you should generate text based on that. If there is text then you should make continuation of the text based on that, please don't write already exisitng text but just a continuination. 
    Here is the context of the document: ${context}
    Here is the users response: ${usersResponse}`);
    res.json(completedSentence.response.text());
}));
app.use('', quizz_1.default);
app.use('', image_1.default);
app.listen(specification_1.port, () => {
    console.log(`Server is running on port ${specification_1.port}`);
});
