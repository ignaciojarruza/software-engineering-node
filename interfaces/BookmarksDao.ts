export default interface BookmarksDao {
    userBookmarksTuit(tuit: string, user: string): Promise<any>;
    userUnBookmarksTuit(tuit: string, user:string): Promise<any>;
    bookmarkedTuits(user: string): Promise<any>;
}