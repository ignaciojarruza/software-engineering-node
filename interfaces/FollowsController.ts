import {Request, Response} from "express";

export default interface FollowsController {
   userFollowsUser(req: Request, res: Response): void;
   userUnfollowsUser(req: Request, res: Response): void;
   findWhoIsFollowingMe(req: Request, res: Response): void;
   findWhoIamFollowing(req: Request, res: Response): void;
}
