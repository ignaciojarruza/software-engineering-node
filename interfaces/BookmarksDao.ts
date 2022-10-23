/**
 * The Bookmarks DAO interface.
 */
export default interface BookmarksDao {
    /**
     * Handles data from the controller and creates record in the Bookmark Model.
     * @param bookmarkedTuit the id of the bookmarked tuit
     * @param bookmarkedBy the id of the user that bookmarked the tuit
     * @return the bookmark record created
     */
    userBookmarksTuit(tuit: string, user: string): Promise<any>;

    /**
     * Handles data from the controller and deletes a record in the Bookmark Model.
     * @param bookmarkedTuit the id of the unbookmarked tuit
     * @param bookmarkedBy the id of the user that unbookmarked the tuit
     * @return the deletion status
     */
    userUnBookmarksTuit(tuit: string, user:string): Promise<any>;

    /**
     * Handles data from the controller and retrieves a list of tuits from the Bookmark Model.
     * @param bookmarkedBy the id of the user that bookmarked the tuit
     * @return the bookmark record created
     */
    bookmarkedTuits(user: string): Promise<any>;
}