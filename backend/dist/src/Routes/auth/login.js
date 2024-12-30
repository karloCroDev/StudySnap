"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
// External packages
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.logIn = router;
// This mimics the db
const users = [
    {
        id: 1,
        email: 'john@example.test',
        password: 'John0908',
    },
    {
        id: 2,
        email: 'jane@example.test',
        password: 'Jane0908',
    },
];
let refreshTokens = [];
const generateAccessToken = (user) => jsonwebtoken_1.default.sign({ id: user.id }, 'mySecretKey', { expiresIn: '15m' });
const generateRefreshToken = (user) => jsonwebtoken_1.default.sign({ id: user.id }, 'myRefreshSecretKey');
// Refresh token
router.post('/refresh-token', (req, res) => {
    // Take the refresh token to user
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(401).json('You need to send a token');
        return;
    }
    if (!refreshTokens.includes(refreshToken)) {
        res.status(403).json('Invalid token');
        return;
    }
    jsonwebtoken_1.default.verify(refreshToken, 'myRefreshSecretKey', (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
    // If the token is valid, generate a new access token and send it to the user
});
// Log in token
router.post('/log-in', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        // Generate access token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.json({ email: user.email, id: user.id, accessToken, refreshToken });
    }
    else {
        res.status(401).json('Invalid email or password');
    }
});
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // This seperates Bearer and the token
        jsonwebtoken_1.default.verify(token, 'mySecretKey', (err, user) => {
            if (err) {
                return res.status(403).json(`Token is not valid ${token}`);
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        res.status(401).json('You are not authenticated');
    }
};
router.delete('/users/:userId', verify, (req, res) => {
    console.log(req.user.id, req.params.userId);
    if (req.user.id === +req.params.userId) {
        res.status(200).json('Account successully deleted');
    }
    else {
        res.status(403).json("This account can't be deleted");
    }
});
router.post('/log-out', verify, (req, res) => {
    const { refreshToken } = req.body;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.json('Log out successful');
});