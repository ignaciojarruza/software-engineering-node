import BookmarksModel from "../mongoose/BookmarksModel";
import BookmarksDaoI from "../interfaces/BookmarksDao";

export default class BookmarksDao implements BookmarksDaoI {
    private static bookmarksDao: BookmarksDao | null = null;
    public static getInstance = (): BookmarksDao => {
        if (BookmarksDao.bookmarksDao === null) {
            BookmarksDao.bookmarksDao = new BookmarksDao();
        }
        return BookmarksDao.bookmarksDao;
    }

    public userBookmarksTuit = async (bookmarkedTuit: string, bookmarkedBy: string) => {
        const bookmark = await BookmarksModel.create({
            bookmarkedTuit,
            bookmarkedBy
        });
        return bookmark;
    }

    public userUnBookmarksTuit = async (bookmarkedTuit: string, bookmarkedBy: string) => {
        const status = await BookmarksModel.deleteOne({bookmarkedTuit, bookmarkedBy});
        return status;
    }

    public bookmarkedTuits = async (bookmarkedBy: string) => {
        const tuit = await BookmarksModel.find({bookmarkedBy}).populate('bookmarkedTuit', 'tuit');
        return tuit;
    }
}