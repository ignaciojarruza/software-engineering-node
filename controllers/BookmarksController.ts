import {Express, Request, Response} from "express";
import BookmarksDaoI from "../interfaces/BookmarksDao";

/**
 * Controller for Bookmarks functionality.
 */
export default class BookmarksController {
    private static bookmarksController: BookmarksController | null = null;
    private static bookmarksDao: BookmarksDaoI;

    /**
     * Instantiates the Bookmark controller when called. Maintains the Singleton Pattern.
     * @param app the Experss app that is running
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

    /**
     * Private constructor for Singleton implementation.
     */
    private constructor() {}

    /**
     * Supports a user bookmarking a tuit. Sends appropriate parameters to the bookmark DAO from the request received.
     * This method is asynchronous.
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
     * Supports a user unbookmarking a tuit. Sends appropriate parameters to the bookmark DAO from the request received.
     * This method is asynchronous.
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
     * Supports a user retrieving a list of bookmarked tuits. Sends appropriate parameters to the bookmark DAO from the request received.
     * This method is asynchronous.
     */
    private bookmarkedTuits = async (req: Request, res: Response) => {
        const user = req.params.user;
        const tuits = await BookmarksController.bookmarksDao.bookmarkedTuits(
            user
        );
        res.json(tuits);
    }
}