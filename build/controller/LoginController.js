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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../model/User"));
const Helper_1 = require("../utils/Helper");
const Messages_1 = require("../utils/Messages");
const router = express_1.default.Router();
router.post('/authenticate', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const appSecret = process.env.APP_SECRET;
    try {
        const user = yield User_1.default.findOne({ usrn: username });
        if (!user) {
            const errResponse = {
                response_code: 0,
                msg: Messages_1.Messages.SIMPLE_FAILED,
                resData: [],
                req,
                res
            };
            return (0, Helper_1.responseHandler)(errResponse);
        }
        const userPassword = user.pwd;
        if (password === userPassword) {
            const token = jsonwebtoken_1.default.sign({ uid: user._id }, appSecret, { expiresIn: '1800s' });
            const successResponse = {
                response_code: 0,
                msg: Messages_1.Messages.SIMPLE_SUCCESS,
                resData: { token },
                req,
                res
            };
            return (0, Helper_1.responseHandler)(successResponse);
        }
        else {
            const errResponse = {
                response_code: 0,
                msg: Messages_1.Messages.SIMPLE_FAILED,
                resData: [],
                req,
                res
            };
            return (0, Helper_1.responseHandler)(errResponse);
        }
    }
    catch (error) {
        console.error('Login failed:', error);
        return res.status(500).send('Internal Server Error');
    }
}));
exports.default = router;
