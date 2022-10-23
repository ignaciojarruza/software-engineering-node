import {Express, Request, Response} from "express";
import FollowsDaoI from "../interfaces/FollowsDao";

/**
 * Follows Controller class that handles the controller functionality for follows.
 */
export default class FollowsController {
    private static followsController: FollowsController | null = null;
    private static followsDao: FollowsDaoI;

    /**
     * Instantiates the controller instance (following Singleton Pattern).
     * @param app The express app instance
     * @param followsDao The follows DAO class that supports the follows functionality data access
     * @return followsController
     */
    public static getInstance = (app: Express, followsDao: FollowsDaoI): FollowsController => {
        if (FollowsController.followsController === null) {
            FollowsController.followsController = new FollowsController();
        }
        FollowsController.followsDao = followsDao;
        app.post('/api/users/:follower/follows/:followed', FollowsController.followsController.userFollowsUser);
        app.delete('/api/users/:follower/follows/:followed', FollowsController.followsController.userUnfollowsUser);
        app.get('/api/users/:follower/follows', FollowsController.followsController.findWhoIamFollowing);
        app.get('/api/follows/:followed/users', FollowsController.followsController.findWhoIsFollowingMe);

        return FollowsController.followsController;
    }

    /**
     * Private constructor for Singleton Pattern handling.
     */
    private constructor() {}

    /**
     * Supports a user following another user. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
    private userFollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const followed = req.params.followed;
        const follow = await FollowsController.followsDao.userFollowsUser(
                follower, followed
            );
            res.json(follow);
    }
    
    /**
     * Supports a user unfollowing another user. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
    private userUnfollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const followed = req.params.followed;
        const status = await FollowsController.followsDao.userUnfollowsUser(
            follower, followed
        );
        res.json(status);
    }

    /**
     * Supports a user retrieving a list of who they are following. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
    private findWhoIamFollowing = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const who = await FollowsController.followsDao.findWhoIamFollowing(follower);
        res.json(who);
    }
    
    /**
     * Supports a user retrieving a list of who are following them. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
    private findWhoIsFollowingMe = async (req: Request, res: Response) => {
        const followed = req.params.followed;
        const who = await FollowsController.followsDao.findWhoIsFollowingMe(followed);
        res.json(who);
    }
}