import mongoose from "mongoose";
import MessageSchema from './MessageSchema';

/**
 * @file The message mongoose model.
 */
const MessageModel = mongoose.model('MessageModel', MessageSchema);

export default MessageModel;