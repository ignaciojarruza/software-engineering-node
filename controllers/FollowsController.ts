/**
 * @file Controlle RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowsDaoI from "../interfaces/FollowsDao";

/**
 * @class FollowsController implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li> POST /api/users/:follower/follows/:followed to record that a user followed another user </li>
 *  <li> DELETE /api/users/:follower/follows/:followed to record that a user no longer follows another user </li>
 *  <li> GET /api/users/:follower/follows to retrieve who a user is following </li>
 *  <li> GET /api/follows/:followed/users to retrieve who is following a user </li>
 * </ul>
 * @property {FollowsController} FollowsController Singleton controller implementing RESTful Web service API
 */
export default class FollowsController {
    private static followsController: FollowsController | null = null;
    private static followsDao: FollowsDaoI;

    /**
     * Creates the singleton controller instance (following Singleton Pattern).
     * @param app The express app instance to declare the RESTful Web service
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

    private constructor() {}

    /**
     * @param {Request} req Represents the request from client, including path parameters follower and followed
     * representing the user that is following and the user that is followed
     * @param {Response} res Represents the response to client, including the body formatted as JSON containing
     * the new follows that was inserted in the database
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
     * @param {Request} req Represents the request from the client, including the path parameters follower and followed
     * representing the user that is unfollowing and the user that was followed and will not be unfollowed
     * @param {Response} res Represents the response to client, including the status on whether deleting the follow
     * was successful or not
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
     * Retrieves all users that the provided userid follows
     * @param {Request} req Represents request from client, including the path parameter follower
     * representing the user that is following the list being retrieved
     * @param {Response} res Represents the response to client, including the body formatted as JSON 
     * arrays containing the user objects that are followed
     */
    private findWhoIamFollowing = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const who = await FollowsController.followsDao.findWhoIamFollowing(follower);
        res.json(who);
    }
    
    /**
     * Retrieves all users that follow the provided userid 
     * @param {Request} req Represents request from client, including the path parameter followed
     * representing the user that the list retrieved are following
     * @param {Response} res Represents the response to client, including the body formatted as JSON 
     * arrays containing the user objects that are following
     */
    private findWhoIsFollowingMe = async (req: Request, res: Response) => {
        const followed = req.params.followed;
        const who = await FollowsController.followsDao.findWhoIsFollowingMe(followed);
        res.json(who);
    }
}