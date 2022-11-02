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
Object.defineProperty(exports, "__esModule", { value: true });
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
class MessageController {
    constructor() {
        /**
         * @param {Request} req Represents the request from the client, including the path parameters
         * from and to representing the user that is sending the message and the user that received
         * the message. The message content is in the body of the request.
         * @param {Response} res Represents the response to cient, including the body formatted as JSON containing
         * the new messages that was inserted into the database
         */
        this.userSendsMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const from = req.params.from;
            const to = req.params.to;
            const messageContent = req.body.message;
            const message = yield MessageController.messageDao.userSendsMessage(messageContent, to, from);
            res.json(message);
        });
        /**
         * Retrieves all messages sent by a user
         * @param {Request} req Represents request from client, including the path parameter
         * from representing the user that sent the messages
         * @param {Response} res Represents the response to client, including the body formatted as JSON
         * arrays containing the messages that were sent
         */
        this.userViewsMessagesSent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const from = req.params.from;
            const messages = yield MessageController.messageDao.userViewsMessagesSent(from);
            res.json(messages);
        });
        /**
         * Retrieves all messages received by a user
         * @param {Request} req Represents request from client, including the path parameter
         * to representing the user that sent the messages
         * @param {Response} res Represents the response to client, including the body formatted as JSON
         * arrays containing the messages that were received
         */
        this.userViewsMessagesReceived = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const to = req.params.to;
            const messages = yield MessageController.messageDao.userViewsMessagesReceived(to);
            res.json(messages);
        });
        /**
         * @param {Request} req Represents request from client, including the path parameter message
         * representing the message id of the message to be deleted
         * @param {Response} res Represents response to client, including the status on whether
         * the deletion was successful or not
         */
        this.userDeletesMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const message = req.params.message;
            const status = yield MessageController.messageDao.userDeletesMessage(message);
            res.json(message);
        });
    }
}
exports.default = MessageController;
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful web service api
 * @return MessageController
 */
MessageController.getInstance = (app, messageDao) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
    }
    MessageController.messageDao = messageDao;
    app.post('/api/users/:from/messages/:to', MessageController.messageController.userSendsMessage);
    app.get('/api/users/:from/messages', MessageController.messageController.userViewsMessagesSent);
    app.get('/api/messages/:to', MessageController.messageController.userViewsMessagesReceived);
    app.delete('/api/messages/:message', MessageController.messageController.userDeletesMessage);
    return MessageController.messageController;
};
