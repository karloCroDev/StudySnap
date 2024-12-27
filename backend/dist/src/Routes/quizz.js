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
exports.quizz = void 0;
// External packages
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
// Addtionals
const specification_1 = require("../../specification");
const router = express_1.default.Router();
exports.quizz = router;
const schema = {
    description: 'Quizz questions',
    type: generative_ai_1.SchemaType.ARRAY,
    items: {
        type: generative_ai_1.SchemaType.OBJECT,
        properties: {
            question: {
                type: generative_ai_1.SchemaType.STRING,
                description: 'Question',
                nullable: false,
            },
            content: {
                type: generative_ai_1.SchemaType.ARRAY,
                items: {
                    type: generative_ai_1.SchemaType.STRING,
                },
                minItems: 4,
                maxItems: 4,
            },
            correct: {
                type: generative_ai_1.SchemaType.NUMBER,
                description: 'Correct answer',
                nullable: false,
            },
        },
        required: ['question'],
    },
};
const genAi = new generative_ai_1.GoogleGenerativeAI(specification_1.geminiApiKey);
const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema,
    },
});
router.post('/quizz', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { context } = req.body;
    const quizzData = yield model.generateContent(`Create me a quizz simmilar to the show who wants to be a millionaire. I will give you the context, and based on that context generate me a quizz with miniumum of 3 questions and maximum of 5 questions. Please recoginze the language and then give in the same language, also follow the schema you have been given. Here is the context: ${context}.`);
    res.json(quizzData);
}));
