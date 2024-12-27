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
exports.completionWithContext = void 0;
// External packages
const express_1 = __importDefault(require("express"));
// Config
const config_1 = require("../Config/config");
const router = express_1.default.Router();
exports.completionWithContext = router;
router.post('/completion-users-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { context, usersResponse } = req.body;
    const completedSentence = yield config_1.modelFlash.generateContent(`Your given a context of the document with text, and users reponse about how he wants his text to be generated. If there is no context of document, but instead only the question of user how he wants his text to be generated, then you should generate text based on that. If there is text then you should make continuation of the text based on that, please don't write already exisitng text but just a continuination. 
    Here is the context of the document: ${context}
    Here is the users response: ${usersResponse}`);
    res.json(completedSentence.response.text());
}));
