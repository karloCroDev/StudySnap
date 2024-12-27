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
exports.imageNoteResponse = void 0;
// Etxternal packages
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Config
const config_1 = require("../Config/config");
const router = express_1.default.Router();
exports.imageNoteResponse = router;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/gemini-images'),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});
const upload = (0, multer_1.default)({ storage });
router.post('/add-image', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (path === undefined) {
        res.json('Please enter a valid image');
        return;
    }
    const result = yield config_1.modelPro.generateContent([
        {
            inlineData: {
                data: Buffer.from(fs_1.default.readFileSync(path)).toString('base64'),
                mimeType: 'image/jpeg',
            },
        },
        'Tell me exactly what is written in this image. Please use native language to the image that is writtren',
    ]);
    fs_1.default.unlinkSync(path); // Deleting the image, saving rescources because it is not needed anymore after the AI has processed it
    res.json(result.response.text());
}));
