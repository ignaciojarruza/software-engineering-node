/**
 * @file MessageDao for data handling
 */
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";

/**
 * @class MessageDao for message functionality
 * @property {MessageDao} messageDao Singleton DAO implementing messsage CRUD operations
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates the instance of messageDao. Maintains singleton pattern.
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    /**
     * Supports the user sending a message to another. Creates a record of this action in the database.
     * @param message the message to be sent
     * @param to the id of the user the message will be sent to
     * @param from the id of the user sending the message
     */
    public userSendsMessage = async (message: string, to: string, from: string) => {
        const messageRecord = await MessageModel.create({
            message,
            to,
            from
        });
        return messageRecord;
    }

    /**
     * Retrieves all messages sent by a user from the database.
     * @param from the id of the user
     */
    public userViewsMessagesSent = async (from: string) => {
        const messages = await MessageModel.find({from}).populate('from', 'username').populate('to', 'username');
        return messages;
    }

    /**
     * Retrieves all messages received by a user from the database.
     * @param to the id of the user
     */
    public userViewsMessagesReceived = async (to: string) => {
        const messages = await MessageModel.find({to}).populate('to', 'username').populate('from', 'username');
        return messages;
    }

    /**
     * Deletes a record for a message.
     * @param message the id of the message
     */
    public userDeletesMessage = async (message: string) => {
        const status = await MessageModel.deleteOne({message});
        return status;
    }
}