import FollowsModel from "../mongoose/FollowsModel";
import FollowsDaoI from "../interfaces/FollowsDao";


export default class FollowsDao implements FollowsDaoI {
    private static followsDao: FollowsDao | null = null;
    public static getInstance = (): FollowsDao => {
        if (FollowsDao.followsDao === null) {
            FollowsDao.followsDao = new FollowsDao();
        }
        return FollowsDao.followsDao;
    }
    public userFollowsUser = async (follower: string, followed: string) => {
        const follows = await FollowsModel.create({
            follower,
            followed
        });
        return follows;
    }
    
    public userUnfollowsUser = async (follower: string, followed: string) => {
        const status = await FollowsModel.deleteOne({follower, followed});
        return status;
    }
    
    public findWhoIamFollowing = async (follower: string) => {
        const who = await FollowsModel.find({follower}).populate('followed', 'username').exec();
        return who;
    }
    
    public findWhoIsFollowingMe = async (followed: string) => {
        const who = await FollowsModel.find({followed}).populate('follower', 'username').exec();
        return who;
    }
}
