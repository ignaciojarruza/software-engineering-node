import {Request, Response} from "express";

/**
 * Interface for the Follows Controller.
 */
export default interface FollowsController {
   /**
     * Supports a user following another user. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
   userFollowsUser(req: Request, res: Response): void;

   /**
     * Supports a user unfollowing another user. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
   userUnfollowsUser(req: Request, res: Response): void;

   /**
     * Supports a user retrieving a list of who are following them. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
   findWhoIsFollowingMe(req: Request, res: Response): void;

   /**
     * Supports a user retrieving a list of who they are following. Sends appropriate parameters to the follows DAO from the request received.
     * This method is asynchronous.
     */
   findWhoIamFollowing(req: Request, res: Response): void;
}
