import mongoose from "mongoose";
import BookmarksSchema from "./BookmarksSchema";

/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
const BookmarksModel = mongoose.model('BookmarksModel', BookmarksSchema);

export default BookmarksModel;