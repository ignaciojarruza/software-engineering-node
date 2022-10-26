/**
 * @file Controller RESTful Web service for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarksDaoI from "../interfaces/BookmarksDao";

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
export default class BookmarksController {
    private static bookmarksController: BookmarksController | null = null;
    private static bookmarksDao: BookmarksDaoI;

    /**
     * Creates the Bookmark controller when called. Maintains the Singleton Pattern.
     * @param {Express} app the Experss app that is running
     * @param bookmarksDao the bookmarks DAO
     * @return bookmarksController
     */
    public static getInstance = (app: Express, bookmarksDao: BookmarksDaoI): BookmarksController => {
        if (BookmarksController.bookmarksController === null) {
            BookmarksController.bookmarksController = new BookmarksController();
        }
        BookmarksController.bookmarksDao = bookmarksDao;
        app.post('/api/users/:user/bookmarks/:tuit', BookmarksController.bookmarksController.userBookmarksTuit);
        app.delete('/api/users/:user/bookmarks/:tuit', BookmarksController.bookmarksController.userUnBookmarksTuit);
        app.get('/api/users/:user/bookmarks', BookmarksController.bookmarksController.bookmarkedTuits);

        return BookmarksController.bookmarksController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters user representing the uid of the user that bookmarked the tuit
     * and tuit representing the tid of the tuit
     * @param {Response} res Represents response to client, including the body formatted
     * as JSON arrays containing the new bookmarks that was added to the database
     */
    private userBookmarksTuit = async (req: Request, res: Response) => {
        const tuit = req.params.tuit;
        const user = req.params.user;
        const bookmark = await BookmarksController.bookmarksDao.userBookmarksTuit(
            tuit, user
        );
        res.json(bookmark);
    }

    /**
     * @param {Request} req Represents request from client, including the path parameters
     * user representing the uid of the user that unbookmarked the tuit
     * and the tuit representing the tid of the tuit
     * @param {Response} res Represents response to client, including status on whether deleting
     * the bookmark was successful or not
     */
    private userUnBookmarksTuit = async (req: Request, res: Response) => {
        const tuit = req.params.tuit;
        const user = req.params.user;
        const status = await BookmarksController.bookmarksDao.userUnBookmarksTuit(
            tuit, user
        );
        res.json(status);
    }

    /**
     * Retrieves all tuits that a user bookmarked from the database
     * @param {Request} req Represents the request from the client, including the path parameters user
     * representing the uid of the user
     * @param {Response} res Represents response to client, including the JSON arrays containing the
     * bookmarked tuits
     */
    private bookmarkedTuits = async (req: Request, res: Response) => {
        const user = req.params.user;
        const tuits = await BookmarksController.bookmarksDao.bookmarkedTuits(
            user
        );
        res.json(tuits);
    }
}