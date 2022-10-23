import mongoose from "mongoose";
import BookmarksSchema from "./BookmarksSchema";

/**
 * Mongoose Bookmarks Model.
 */
const BookmarksModel = mongoose.model('BookmarksModel', BookmarksSchema);

export default BookmarksModel;