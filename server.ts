/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import UserDao from "./daos/UserDao";
import UserController from "./controllers/UserController";
import mongoose from "mongoose";
import TuitDao from "./daos/TuitDao";
import TuitController from "./controllers/TuitController";
import FollowsController from './controllers/FollowsController';
import FollowsDao from './daos/FollowsDao';
import BookmarksController from './controllers/BookmarksController';
import BookmarksDao from './daos/BookmarksDao';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/MessageController';
import MessageDao from './daos/MessageDao';


const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
 }
//mongoose.connect('mongodb://localhost:27017/fsd', options);
mongoose.connect('mongodb+srv://iarruza:Manchego1a@cluster0.fei84pe.mongodb.net/?retryWrites=true&w=majority')

const userDao = new UserDao();
const userController = new UserController(app, userDao);
const tuitDao = TuitDao.getInstance();
const tuitController = TuitController
  .getInstance(app, tuitDao);
const followsDao = new FollowsDao();
const followsController = FollowsController.getInstance(app, followsDao);
const bookmarksDao = new BookmarksDao();
const bookmarksController = BookmarksController.getInstance(app, bookmarksDao);
const likeController = LikeController.getInstance(app);
const messageDao = new MessageDao();
const messageController = MessageController.getInstance(app, messageDao);

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
