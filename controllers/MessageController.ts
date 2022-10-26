import {Express, Request, Response} from "express";
import MessageDaoI from "../interfaces/MessageDao";

export default class MessageController {
    private static messageController: MessageController | null = null;
    private static messageDao: MessageDaoI;

    public static getInstance = (app: Express, messageDao: MessageDaoI): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
        }
        MessageController.messageDao = messageDao;
        app.post('/api/users/:from/messages/:to', MessageController.messageController.userSendsMessage);
        app.get('/api/users/:from/messages', MessageController.messageController.userViewsMessagesSent);
        app.get('/api/messages/:to', MessageController.messageController.userViewsMessagesReceived);
        app.delete('/api/messages/:message', MessageController.messageController.userDeletesMessage);

        return MessageController.messageController;
    }

    private constructor() {}

    private userSendsMessage = async (req: Request, res: Response) => {
        const from = req.params.from;
        const to = req.params.to;
        const messageContent = req.body.message;
        const message = await MessageController.messageDao.userSendsMessage(
            messageContent,
            to,
            from
        );
        res.json(message);
    }

    private userViewsMessagesSent = async (req: Request, res: Response) => {
        const from = req.params.from;
        const messages = await MessageController.messageDao.userViewsMessagesSent(
            from
        );
        res.json(messages);
    }

    private userViewsMessagesReceived = async (req: Request, res: Response) => {
        const to = req.params.to;
        const messages = await MessageController.messageDao.userViewsMessagesReceived(
            to
        );
        res.json(messages);
    }

    private userDeletesMessage = async (req: Request, res: Response) => {
        const message = req.params.message;
        const status = await MessageController.messageDao.userDeletesMessage(
            message
        );
        res.json(message)
    }
}