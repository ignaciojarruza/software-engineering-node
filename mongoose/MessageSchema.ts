import mongoose from "mongoose";

/**
 * The message mongoose schema.
 */
const MessageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'messages'} );
export default MessageSchema;