import {Request, Response} from "express";

/**
 * Interface for the Tuit Controller.
 */
export default interface TuitController {
   /**
     * Supports a user finding a list of all tuits. Sends appropriate parameters to the tuit DAO from the request received.
     * This method is asyncrhonous.
     */
   findAllTuits(req: Request, res: Response): void;

   /**
     * Supports a user finding a specific tuit. Sends appropriate parameters to the tuit DAO from the request received.
     * This method is asyncrhonous.
     */
   findTuitById(req: Request, res: Response): void;

   /**
     * Supports a user finding a list of all tuits by a specific user. Sends appropriate parameters to the tuit DAO from the request received.
     * This method is asyncrhonous.
     */
   findTuitsByUser(req: Request, res: Response): void;

   /**
     * Supports a user creating a tuit. Sends appropriate parameters to the tuit DAO from the request received.
     * This method is asyncrhonous.
     */
   createTuit(req: Request, res: Response): void;

   /**
     * Supports a user deleting a tuit. Sends appropriate parameters to the tuit DAO from the request received.
     * This method is asyncrhonous.
     */
   updateTuit(req: Request, res: Response): void;

   /**
     * Supports a user updating a previously created tuit. Sends appropriate parameters to the tuit DAO from the request received.
     * This method is asyncrhonous.
     */ 
   deleteTuit(req: Request, res: Response): void;
}
