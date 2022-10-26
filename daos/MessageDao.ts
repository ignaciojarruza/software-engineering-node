import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    public userSendsMessage = async (message: string, to: string, from: string) => {
        const messageRecord = await MessageModel.create({
            message,
            to,
            from
        });
        return messageRecord;
    }

    public userViewsMessagesSent = async (from: string) => {
        const messages = await MessageModel.find({from}).populate('from', 'username').populate('to', 'username');
        return messages;
    }

    public userViewsMessagesReceived = async (to: string) => {
        const messages = await MessageModel.find({to}).populate('to', 'username').populate('from', 'username');
        return messages;
    }

    public userDeletesMessage = async (message: string) => {
        const status = await MessageModel.deleteOne({message});
        return status;
    }
}