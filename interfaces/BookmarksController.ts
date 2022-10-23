import {Request, Response} from "express";

/**
 * Interface for the Bookmarks Controller
 */
export default interface BookmarksController {

    /**
     * Supports a user bookmarking a tuit. Sends appropriate parameters to the bookmark DAO from the request received.
     * This method is asynchronous.
     */
    userBookmarksTuit(req: Request, res: Response): void;

    /**
     * Supports a user unbookmarking a tuit. Sends appropriate parameters to the bookmark DAO from the request received.
     * This method is asynchronous.
     */
    userUnBookmarksTuit(req: Request, res: Response): void;

    /**
     * Supports a user retrieving a list of bookmarked tuits. Sends appropriate parameters to the bookmark DAO from the request received.
     * This method is asynchronous.
     */
    bookmarkedTuits(req: Request, res: Response): void;
}
