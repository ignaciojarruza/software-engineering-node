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
 * @file Bookmarks DAO for handling data
 */
const BookmarksModel_1 = __importDefault(require("../mongoose/BookmarksModel"));
/**
 * @class DAO for Bookmarks functionality.
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 */
class BookmarksDao {
    constructor() {
        /**
         * Handles data from the controller and creates record in the Bookmark Model.
         * @param bookmarkedTuit the id of the bookmarked tuit
         * @param bookmarkedBy the id of the user that bookmarked the tuit
         * @return the bookmark record created
         */
        this.userBookmarksTuit = (bookmarkedTuit, bookmarkedBy) => __awaiter(this, void 0, void 0, function* () {
            const bookmark = yield BookmarksModel_1.default.create({
                bookmarkedTuit,
                bookmarkedBy
            });
            return bookmark;
        });
        /**
         * Handles data from the controller and deletes a record in the Bookmark Model.
         * @param bookmarkedTuit the id of the unbookmarked tuit
         * @param bookmarkedBy the id of the user that unbookmarked the tuit
         * @return the deletion status
         */
        this.userUnBookmarksTuit = (bookmarkedTuit, bookmarkedBy) => __awaiter(this, void 0, void 0, function* () {
            const status = yield BookmarksModel_1.default.deleteOne({ bookmarkedTuit, bookmarkedBy });
            return status;
        });
        /**
         * Handles data from the controller and retrieves a list of tuits from the Bookmark Model.
         * @param bookmarkedBy the id of the user that bookmarked the tuit
         * @return the bookmark record created
         */
        this.bookmarkedTuits = (bookmarkedBy) => __awaiter(this, void 0, void 0, function* () {
            const tuit = yield BookmarksModel_1.default.find({ bookmarkedBy }).populate('bookmarkedTuit', 'tuit');
            return tuit;
        });
    }
}
exports.default = BookmarksDao;
BookmarksDao.bookmarksDao = null;
/**
 * Instantiates the Bookmarks DAO when called. Maintains the Singleton Pattern.
 * @return bookmarksDAO
 */
BookmarksDao.getInstance = () => {
    if (BookmarksDao.bookmarksDao === null) {
        BookmarksDao.bookmarksDao = new BookmarksDao();
    }
    return BookmarksDao.bookmarksDao;
};
