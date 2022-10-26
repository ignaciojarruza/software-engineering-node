import mongoose from "mongoose";

/**
 * @file Bookmarks Mongoose Schema.
 */
const BookmarksSchema = new mongoose.Schema({
    bookmarkedTuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'bookmarks'});

export default BookmarksSchema;