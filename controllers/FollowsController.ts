import {Express, Request, Response} from "express";
import FollowsDaoI from "../interfaces/FollowsDao";


export default class FollowsController {
    private static followsController: FollowsController | null = null;
    private static followsDao: FollowsDaoI;
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
    private userFollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const followed = req.params.followed;
        const follow = await FollowsController.followsDao.userFollowsUser(
                follower, followed
            );
            res.json(follow);
    }
    
    private userUnfollowsUser = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const followed = req.params.followed;
        const status = await FollowsController.followsDao.userUnfollowsUser(
            follower, followed
        );
        res.json(status);
    }

    private findWhoIamFollowing = async (req: Request, res: Response) => {
        const follower = req.params.follower;
        const who = await FollowsController.followsDao.findWhoIamFollowing(follower);
        res.json(who);
    }
    
    private findWhoIsFollowingMe = async (req: Request, res: Response) => {
        const followed = req.params.followed;
        const who = await FollowsController.followsDao.findWhoIsFollowingMe(followed);
        res.json(who);
    }
}