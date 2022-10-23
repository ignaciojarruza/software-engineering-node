import {Request, Response, Express} from "express";
import * as FollowsDao from "../daos/FollowsDao";

const userFollowsUser = async (req: Request, res: Response) => {
    const follower = req.params.follower;
    const followed = req.params.followed;
    const follow = await FollowsDao.userFollowsUser(
            follower, followed
        );
        res.json(follow);
}

const userUnfollowsUser = async (req: Request, res: Response) => {
    const follower = req.params.follower;
    const followed = req.params.followed;
    const status = await FollowsDao.userUnfollowsUser(
        follower, followed
    );
    res.json(status);
}

const findWhoIsFollowingMe = async (req: Request, res: Response) => {
    const me = req.params.followed;
    const who = await FollowsDao.findWhoIsFollowingMe(me);
    res.json(who);
}

const followsController = (app: Express) => {
    app.get('/api/users/:followed/following', findWhoIsFollowingMe);
}
export default followsController;