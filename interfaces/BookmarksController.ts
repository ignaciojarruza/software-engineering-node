import {Request, Response} from "express";

export default interface BookmarksController {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnBookmarksTuit(req: Request, res: Response): void;
    bookmarkedTuits(req: Request, res: Response): void;
}
