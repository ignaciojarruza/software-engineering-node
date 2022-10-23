import BookmarksModel from "../mongoose/BookmarksModel";
import BookmarksDaoI from "../interfaces/BookmarksDao";

/**
 * DAO for Bookmarks functionality.
 */
export default class BookmarksDao implements BookmarksDaoI {
    private static bookmarksDao: BookmarksDao | null = null;

    /**
     * Instantiates the Bookmarks DAO when called. Maintains the Singleton Pattern.
     * @return bookmarksDAO
     */
    public static getInstance = (): BookmarksDao => {
        if (BookmarksDao.bookmarksDao === null) {
            BookmarksDao.bookmarksDao = new BookmarksDao();
        }
        return BookmarksDao.bookmarksDao;
    }

    /**
     * Handles data from the controller and creates record in the Bookmark Model.
     * @param bookmarkedTuit the id of the bookmarked tuit
     * @param bookmarkedBy the id of the user that bookmarked the tuit
     * @return the bookmark record created
     */
    public userBookmarksTuit = async (bookmarkedTuit: string, bookmarkedBy: string) => {
        const bookmark = await BookmarksModel.create({
            bookmarkedTuit,
            bookmarkedBy
        });
        return bookmark;
    }

    /**
     * Handles data from the controller and deletes a record in the Bookmark Model.
     * @param bookmarkedTuit the id of the unbookmarked tuit
     * @param bookmarkedBy the id of the user that unbookmarked the tuit
     * @return the deletion status
     */
    public userUnBookmarksTuit = async (bookmarkedTuit: string, bookmarkedBy: string) => {
        const status = await BookmarksModel.deleteOne({bookmarkedTuit, bookmarkedBy});
        return status;
    }

    /**
     * Handles data from the controller and retrieves a list of tuits from the Bookmark Model.
     * @param bookmarkedBy the id of the user that bookmarked the tuit
     * @return the bookmark record created
     */
    public bookmarkedTuits = async (bookmarkedBy: string) => {
        const tuit = await BookmarksModel.find({bookmarkedBy}).populate('bookmarkedTuit', 'tuit');
        return tuit;
    }
}