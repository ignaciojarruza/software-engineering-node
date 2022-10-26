/**
 * @file FollowsDAO for data handling.
 */
import FollowsModel from "../mongoose/FollowsModel";
import FollowsDaoI from "../interfaces/FollowsDao";

/**
 * @class FollowsDao for Follows functionality.
 * @property {FollowsDao} followsDao Singleton DAO implementing bookmarks CRUD operations
 */
export default class FollowsDao implements FollowsDaoI {
    private static followsDao: FollowsDao | null = null;

    /**
     * Instantiates the Follows DAO when called. Maintains the Singleton Pattern.
     * @return followsDao
     */
    public static getInstance = (): FollowsDao => {
        if (FollowsDao.followsDao === null) {
            FollowsDao.followsDao = new FollowsDao();
        }
        return FollowsDao.followsDao;
    }

    /**
     * Handles data from the controller and creates record in the Follows Model.
     * @param follower the id of the user doing the following
     * @param followed the id of the user that is being followed
     * @return the follows record that was created
     */
    public userFollowsUser = async (follower: string, followed: string) => {
        const follows = await FollowsModel.create({
            follower,
            followed
        });
        return follows;
    }
    
     /**
     * Handles data from the controller and deletes record in the Follows Model.
     * @param follower the id of the user doing the following
     * @param followed the id of the user that is being followed
     * @return the deletion status
     */
    public userUnfollowsUser = async (follower: string, followed: string) => {
        const status = await FollowsModel.deleteOne({follower, followed});
        return status;
    }
    
     /**
     * Handles data from the controller and retrieves a list of users (those being followed) from the Follows Model.
     * @param follower the id of the user doing the following
     * @return the list of users being followed
     */
    public findWhoIamFollowing = async (follower: string) => {
        const who = await FollowsModel.find({follower}).populate('followed', 'username').exec();
        return who;
    }
    
     /**
     * Handles data from the controller and retrieves a list of users (those that follow) from the Follows Model.
     * @param followed the id of the user doing the following
     * @return the list of users following the id provided
     */
    public findWhoIsFollowingMe = async (followed: string) => {
        const who = await FollowsModel.find({followed}).populate('follower', 'username').exec();
        return who;
    }
}
