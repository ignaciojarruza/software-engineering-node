/**
 * Interface for the Follows DAO.
 */
export default interface FollowsDao {
    /**
     * Handles data from the controller and creates record in the Follows Model.
     * @param follower the id of the user doing the following
     * @param followed the id of the user that is being followed
     * @return the follows record that was created
     */
    userFollowsUser(follower: string, followed: string): Promise<any>;

    /**
     * Handles data from the controller and deletes record in the Follows Model.
     * @param follower the id of the user doing the following
     * @param followed the id of the user that is being followed
     * @return the deletion status
     */
    userUnfollowsUser(follower: string, followed: string): Promise<any>;

    /**
     * Handles data from the controller and retrieves a list of users (those being followed) from the Follows Model.
     * @param follower the id of the user doing the following
     * @return the list of users being followed
     */
    findWhoIamFollowing(follower: string): Promise<any>;

    /**
     * Handles data from the controller and retrieves a list of users (those that follow) from the Follows Model.
     * @param followed the id of the user doing the following
     * @return the list of users following the id provided
     */
    findWhoIsFollowingMe(followed: string): Promise<any>;
}