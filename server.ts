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
import AuthenticationController from './controllers/auth-controller';

const cors = require('cors');
const app = express();
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.use(express.json());

//Express session
const session = require("express-session");
let sess = {
   secret: process.env.SECRET || 'SECRET',
   cookie: {
       secure: false
   }
}

if (process.env.ENV === 'PRODUCTION') {
   app.set('trust proxy', 1) // trust first proxy
   sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));

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
AuthenticationController(app);

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
