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
exports.completion = void 0;
// External packages
const express_1 = __importDefault(require("express"));
// Config
const config_1 = require("../Config/config");
const router = express_1.default.Router();
exports.completion = router;
router.post('/completion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sentence } = req.body;
    console.log(sentence);
    const completedSentence = yield config_1.modelFlash.generateContent(`You are given a context of the document with text, and your task is to complete last sentence, or write one sentence if there isn't any sentence started (NOT more than one sentence!). Also big note don't repeat sentence, just write it like you would continue (don't write whole sentence)! Here is the given part: ${sentence}`);
    res.json(completedSentence.response.text());
}));
