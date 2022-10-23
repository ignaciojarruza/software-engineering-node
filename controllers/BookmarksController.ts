import {Express, Request, Response} from "express";
import BookmarksDaoI from "../interfaces/BookmarksDao";

export default class BookmarksController {
    private static bookmarksController: BookmarksController | null = null;
    private static bookmarksDao: BookmarksDaoI;
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
    private userBookmarksTuit = async (req: Request, res: Response) => {
        const tuit = req.params.tuit;
        const user = req.params.user;
        const bookmark = await BookmarksController.bookmarksDao.userBookmarksTuit(
            tuit, user
        );
        res.json(bookmark);
    }

    private userUnBookmarksTuit = async (req: Request, res: Response) => {
        const tuit = req.params.tuit;
        const user = req.params.user;
        const status = await BookmarksController.bookmarksDao.userUnBookmarksTuit(
            tuit, user
        );
        res.json(status);
    }

    private bookmarkedTuits = async (req: Request, res: Response) => {
        const user = req.params.user;
        const tuits = await BookmarksController.bookmarksDao.bookmarkedTuits(
            user
        );
        res.json(tuits);
    }
}