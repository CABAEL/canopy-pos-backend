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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const MongoDbConnection_1 = __importDefault(require("./utils/MongoDbConnection"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const UsersController_1 = __importDefault(require("./controller/UsersController"));
const LoginController_1 = __importDefault(require("./controller/LoginController"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, MongoDbConnection_1.default)();
            const app = (0, express_1.default)();
            app.use((0, morgan_1.default)('dev'));
            app.use(body_parser_1.default.json());
            const port = process.env.PORT || 3000;
            const apiRouter = express_1.default.Router();
            // Define routes
            apiRouter.use('/users', UsersController_1.default);
            apiRouter.use('/login', LoginController_1.default);
            app.use('/api', apiRouter);
            app.listen(port, () => {
                console.log(`Server running at ${process.env.HOST}:${port}`);
            });
        }
        catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    });
}
startServer();
