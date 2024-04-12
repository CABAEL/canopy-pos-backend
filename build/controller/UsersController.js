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
const User_1 = __importDefault(require("../model/User"));
const router = express_1.default.Router();
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const show_only_this = {
            fname: 1,
            mname: 1,
            lname: 1,
            usrn: 1,
            email: 1,
            contact_num: 1,
            created_by: 1,
            created_at: 1,
        };
        const skip = (page - 1) * limit;
        const users = yield User_1.default.find({}, show_only_this).skip(skip).limit(limit);
        //responseHandler(1,"hello",req, res,users)
    }
    catch (error) {
        console.error('Error fetching paginated users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
