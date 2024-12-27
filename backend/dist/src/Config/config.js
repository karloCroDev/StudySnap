"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelPro = exports.modelFlash = exports.port = void 0;
// External packages
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
// Mozes odvojiti ovo posebno kada se budes spajao na db
const port = process.env.PORT;
exports.port = port;
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelFlash = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
exports.modelFlash = modelFlash;
const modelPro = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
exports.modelPro = modelPro;
