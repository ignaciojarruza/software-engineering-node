/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDaoI from "../interfaces/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li> POST /api/users/:from/messages/:to to record that a user messaged another user </li>
 *  <li> GET /api/users/:from/messages to retrieve all messages sent by a user </li>
 *  <li> GET /api/messages/:to to retrieve all messages sent to a user </li>
 *  <li> DELETE /api/messages/:message to record that a message was deleted </li>
 * </ul>
 * @property {MessageController} MessageController Singleton controller implementing RESTful Web service API
 */
export default class MessageController {
    private static messageController: MessageController | null = null;
    private static messageDao: MessageDaoI;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful web service api
     * @return MessageController
     */
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

    /**
     * @param {Request} req Represents the request from the client, including the path parameters
     * from and to representing the user that is sending the message and the user that received
     * the message. The message content is in the body of the request.
     * @param {Response} res Represents the response to cient, including the body formatted as JSON containing
     * the new messages that was inserted into the database
     */
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

    /**
     * Retrieves all messages sent by a user
     * @param {Request} req Represents request from client, including the path parameter
     * from representing the user that sent the messages
     * @param {Response} res Represents the response to client, including the body formatted as JSON
     * arrays containing the messages that were sent
     */
    private userViewsMessagesSent = async (req: Request, res: Response) => {
        const from = req.params.from;
        const messages = await MessageController.messageDao.userViewsMessagesSent(
            from
        );
        res.json(messages);
    }

    /**
     * Retrieves all messages received by a user
     * @param {Request} req Represents request from client, including the path parameter
     * to representing the user that sent the messages
     * @param {Response} res Represents the response to client, including the body formatted as JSON
     * arrays containing the messages that were received
     */
    private userViewsMessagesReceived = async (req: Request, res: Response) => {
        const to = req.params.to;
        const messages = await MessageController.messageDao.userViewsMessagesReceived(
            to
        );
        res.json(messages);
    }

    /**
     * @param {Request} req Represents request from client, including the path parameter message
     * representing the message id of the message to be deleted
     * @param {Response} res Represents response to client, including the status on whether
     * the deletion was successful or not
     */
    private userDeletesMessage = async (req: Request, res: Response) => {
        const message = req.params.message;
        const status = await MessageController.messageDao.userDeletesMessage(
            message
        );
        res.json(message)
    }
}