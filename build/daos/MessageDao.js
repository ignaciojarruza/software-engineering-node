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
/**
 * @file MessageDao for data handling
 */
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
/**
 * @class MessageDao for message functionality
 * @property {MessageDao} messageDao Singleton DAO implementing messsage CRUD operations
 */
class MessageDao {
    constructor() {
        /**
         * Supports the user sending a message to another. Creates a record of this action in the database.
         * @param message the message to be sent
         * @param to the id of the user the message will be sent to
         * @param from the id of the user sending the message
         */
        this.userSendsMessage = (message, to, from) => __awaiter(this, void 0, void 0, function* () {
            const messageRecord = yield MessageModel_1.default.create({
                message,
                to,
                from
            });
            return messageRecord;
        });
        /**
         * Retrieves all messages sent by a user from the database.
         * @param from the id of the user
         */
        this.userViewsMessagesSent = (from) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield MessageModel_1.default.find({ from }).populate('from', 'username').populate('to', 'username');
            return messages;
        });
        /**
         * Retrieves all messages received by a user from the database.
         * @param to the id of the user
         */
        this.userViewsMessagesReceived = (to) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield MessageModel_1.default.find({ to }).populate('to', 'username').populate('from', 'username');
            return messages;
        });
        /**
         * Deletes a record for a message.
         * @param message the id of the message
         */
        this.userDeletesMessage = (message) => __awaiter(this, void 0, void 0, function* () {
            const status = yield MessageModel_1.default.deleteOne({ message });
            return status;
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates the instance of messageDao. Maintains singleton pattern.
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
