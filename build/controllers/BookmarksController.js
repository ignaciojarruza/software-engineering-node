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
 * @class BookmarksController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li> POST /api/users/:user/bookmarks/:tuit for a user to bookmark a tuit </li>
 *  <li> GET /api/users/:user/bookmarks to retrieve bookmarked tuits </li>
 *  <li> DELETE /api/users/:user/bookmarks/:tuit for a user to delete a bookmarked tuit </li>
 * </ul>
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 */
class BookmarksController {
    constructor() {
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters user representing the uid of the user that bookmarked the tuit
         * and tuit representing the tid of the tuit
         * @param {Response} res Represents response to client, including the body formatted
         * as JSON arrays containing the new bookmarks that was added to the database
         */
        this.userBookmarksTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tuit = req.params.tuit;
            const user = req.params.user;
            const bookmark = yield BookmarksController.bookmarksDao.userBookmarksTuit(tuit, user);
            res.json(bookmark);
        });
        /**
         * @param {Request} req Represents request from client, including the path parameters
         * user representing the uid of the user that unbookmarked the tuit
         * and the tuit representing the tid of the tuit
         * @param {Response} res Represents response to client, including status on whether deleting
         * the bookmark was successful or not
         */
        this.userUnBookmarksTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tuit = req.params.tuit;
            const user = req.params.user;
            const status = yield BookmarksController.bookmarksDao.userUnBookmarksTuit(tuit, user);
            res.json(status);
        });
        /**
         * Retrieves all tuits that a user bookmarked from the database
         * @param {Request} req Represents the request from the client, including the path parameters user
         * representing the uid of the user
         * @param {Response} res Represents response to client, including the JSON arrays containing the
         * bookmarked tuits
         */
        this.bookmarkedTuits = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.user;
            const tuits = yield BookmarksController.bookmarksDao.bookmarkedTuits(user);
            res.json(tuits);
        });
    }
}
exports.default = BookmarksController;
BookmarksController.bookmarksController = null;
/**
 * Creates the Bookmark controller when called. Maintains the Singleton Pattern.
 * @param {Express} app the Experss app that is running
 * @param bookmarksDao the bookmarks DAO
 * @return bookmarksController
 */
BookmarksController.getInstance = (app, bookmarksDao) => {
    if (BookmarksController.bookmarksController === null) {
        BookmarksController.bookmarksController = new BookmarksController();
    }
    BookmarksController.bookmarksDao = bookmarksDao;
    app.post('/api/users/:user/bookmarks/:tuit', BookmarksController.bookmarksController.userBookmarksTuit);
    app.delete('/api/users/:user/bookmarks/:tuit', BookmarksController.bookmarksController.userUnBookmarksTuit);
    app.get('/api/users/:user/bookmarks', BookmarksController.bookmarksController.bookmarkedTuits);
    return BookmarksController.bookmarksController;
};
