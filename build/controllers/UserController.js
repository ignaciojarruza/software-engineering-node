"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class UserController Implements RESTful Web service API for user resource.
 * Instantiates the User controller when called.
 * @param app the Experss app that is running
 * @param bookrmarksDao the user DAO
 * @return userController
 */
class UserController {
    constructor(app, userDao) {
        /**
         * Supports a user finding a list of users. Sends appropriate parameters to the user DAO from the request received.
         * This method is asynchronous.
         */
        this.findAllUsers = (req, res) => this.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
         * Supports a user finding a specific user. Sends appropriate parameters to the user DAO from the request received.
         * This method is asynchronous.
         */
        this.findUserById = (req, res) => this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
         * Supports the creation of a user. Sends appropriate parameters to the user DAO from the request received.
         * This method is asynchronous.
         */
        this.createUser = (req, res) => this.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
         * Supports a user deleting their user details. Sends appropriate parameters to the user DAO from the request received.
         * This method is asynchronous.
         */
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
         * Supports a user updating thier information. Sends appropriate parameters to the user DAO from the request received.
         * This method is asynchronous.
         */
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
    }
}
exports.default = UserController;
