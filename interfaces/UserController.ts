import {Request, Response} from "express";

/**
 * Interface for the User Controller.
 */
export default interface UserController {
   /**
     * Supports a user finding a list of users. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   findAllUsers(req: Request, res: Response): void;

   /**
     * Supports a user finding a specific user. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   findUserById(req: Request, res: Response): void;

   /**
     * Supports the creation of a user. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   createUser(req: Request, res: Response): void;

   /**
     * Supports a user deleting their user details. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   deleteUser(req: Request, res: Response): void;

   /**
     * Supports a user updating thier information. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   updateUser(req: Request, res: Response): void;

   /**
    * Supports functionality for A3 deleteByUsername function.
    * @param req Request made by the client 
    * @param res Response to send the client
    */
   deleteUsersByUsername(req: Request, res: Response): void;
}

