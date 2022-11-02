"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class TuitController implements RESTful web service API for tuit resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *  <li> GET /api/tuits to retrieve all tuits </li>
 *  <li> GET /api/tuits/:tid to retrieve a tuit </li>
 *  <li> GET /api/users/:uid/tuits to retrieve all tuits by a user </li>
 *  <li> POST /api/users/:uid/tuits to record that a user posted a tuit </li>
 *  <li> DELETE /api/tuits/:tid to record that a user deleted a tuit </li>
 * </ul>
 * @property {TuitController} TuitController Singleton controller implementing RESTful Web Service API
 */
class TuitController {
    constructor() {
        /**
         * Supports a user finding a list of all tuits. Sends appropriate parameters to the tuit DAO from the request received.
         * This method is asyncrhonous.
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao
            .findAllTuits()
            .then(tuits => res.json(tuits));
        /**
        * Supports a user finding a specific tuit. Sends appropriate parameters to the tuit DAO from the request received.
        * This method is asyncrhonous.
        */
        this.findTuitById = (req, res) => TuitController.tuitDao
            .findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
        /**
        * Supports a user finding a list of all tuits by a specific user. Sends appropriate parameters to the tuit DAO from the request received.
        * This method is asyncrhonous.
        */
        this.findTuitsByAuthor = (req, res) => TuitController.tuitDao
            .findTuitsByAuthor(req.params.uid)
            .then(tuits => res.json(tuits));
        /**
        * Supports a user creating a tuit. Sends appropriate parameters to the tuit DAO from the request received.
        * This method is asyncrhonous.
        */
        this.createTuit = (req, res) => TuitController.tuitDao
            .createTuit(req.body)
            .then(actualTuit => res.json(actualTuit));
        /**
        * Supports a user deleting a tuit. Sends appropriate parameters to the tuit DAO from the request received.
        * This method is asyncrhonous.
        */
        this.deleteTuit = (req, res) => TuitController.tuitDao
            .deleteTuit(req.params.tid)
            .then(status => res.json(status));
        /**
        * Supports a user updating a previously created tuit. Sends appropriate parameters to the tuit DAO from the request received.
        * This method is asyncrhonous.
        */
        this.updateTuit = (req, res) => TuitController.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
TuitController.tuitController = null;
/**
 * Instantiates the controller for Tuit when called. Maintains the Singleton Pattern.
 * @param {Express} app the Experss app that is running
 * @param tuitDao the tuit DAO
 * @return tuitController
 */
TuitController.getInstance = (app, tuitDao) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
    }
    TuitController.tuitDao = tuitDao;
    app.get('/api/tuits', TuitController.tuitController.findAllTuits);
    app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
    app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByAuthor);
    app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuit);
    app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
    return TuitController.tuitController;
};
