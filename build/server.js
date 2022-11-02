"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const express_1 = __importDefault(require("express"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const mongoose_1 = __importDefault(require("mongoose"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const FollowsController_1 = __importDefault(require("./controllers/FollowsController"));
const FollowsDao_1 = __importDefault(require("./daos/FollowsDao"));
const BookmarksController_1 = __importDefault(require("./controllers/BookmarksController"));
const BookmarksDao_1 = __importDefault(require("./daos/BookmarksDao"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const MessageDao_1 = __importDefault(require("./daos/MessageDao"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};
mongoose_1.default.connect('mongodb://localhost:27017/fsd', options);
const userDao = new UserDao_1.default();
const userController = new UserController_1.default(app, userDao);
const tuitDao = TuitDao_1.default.getInstance();
const tuitController = TuitController_1.default
    .getInstance(app, tuitDao);
const followsDao = new FollowsDao_1.default();
const followsController = FollowsController_1.default.getInstance(app, followsDao);
const bookmarksDao = new BookmarksDao_1.default();
const bookmarksController = BookmarksController_1.default.getInstance(app, bookmarksDao);
const likeController = LikeController_1.default.getInstance(app);
const messageDao = new MessageDao_1.default();
const messageController = MessageController_1.default.getInstance(app, messageDao);
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering!!!!'));
app.get('/hello', (req, res) => res.send('Welcome to Foundation of Software Engineering!'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
