/**
 * @file Controller RESTful Web service API for user resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 * @class UserController Implements RESTful Web service API for user resource.
 * Instantiates the User controller when called.
 * @param app the Experss app that is running
 * @param bookrmarksDao the user DAO
 * @return userController
 */
export default class UserController implements UserControllerI {
   app: Express;
   userDao: UserDao;
   constructor(app: Express, userDao: UserDao) {
       this.app = app;
       this.userDao = userDao;
       this.app.get('/users', this.findAllUsers);
       this.app.get('/users/:userid', this.findUserById);
       this.app.post('/users', this.createUser);
       this.app.delete('/users/:userid', this.deleteUser);
       this.app.delete('/users/username/:username/delete', this.deleteUsersByUsername);
       this.app.put('/users/:userid', this.updateUser);
   }

    /**
     * Supports a user finding a list of users. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   findAllUsers = (req: Request, res: Response) =>
       this.userDao.findAllUsers()
           .then(users => res.json(users));

    /**
     * Supports a user finding a specific user. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   findUserById = (req: Request, res: Response) =>
       this.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));
    
    /**
     * Supports the creation of a user. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   createUser = (req: Request, res: Response) =>
       this.userDao.createUser(req.body)
           .then(user => res.json(user));
    
    /**
     * Supports a user deleting their user details. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   deleteUser = (req: Request, res: Response) =>
       this.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
    
    /**
     * Supports a user updating thier information. Sends appropriate parameters to the user DAO from the request received.
     * This method is asynchronous.
     */
   updateUser = (req: Request, res: Response) =>
       this.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));

           /**
            * Supports a user deleting their user details. send appropriate parameters to the user DAo from the request received.
            * @param req Request made from the client   
            * @param res Response to the client
            * @returns the deletion status
            */
    deleteUsersByUsername = (req: Request, res: Response) => this.userDao
           .deleteUsersByUsername(req.params.username).then(status => res.send(status));
}
