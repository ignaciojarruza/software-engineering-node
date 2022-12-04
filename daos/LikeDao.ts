/**
 * @file LikeDao for data handling
 */
import LikeDaoI from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";

/**
 * @class LikeDao for like functionality
 * @property {LikeDao} likeDao Singleton DAO implementing bookmarks CRUD operations
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Instantiates the dao for like when called. Maintains the Singleton Pattern.
     * @return likeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() {}

    /**
     * Finds all users that liked a tuit.
     * @param tid the id of the tuit
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Finds all tuits liked by a user.
     * @param uid the id of the user
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    
    /**
     * Creates record for a user liking a tuit.
     * @param uid the id of the user
     * @param tid the id of the tuit
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
    
    /**
     * Deletes a record for a user unlicking a tuit.
     * @param uid the id of the user
     * @param tid the id of the tuit
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    countHowManyLikedTuit =
        async (tid: string): Promise<any> =>
          LikeModel.count({tuit: tid});
}