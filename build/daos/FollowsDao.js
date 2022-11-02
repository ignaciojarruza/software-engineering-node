"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file FollowsDAO for data handling.
 */
const FollowsModel_1 = __importDefault(require("../mongoose/FollowsModel"));
/**
 * @class FollowsDao for Follows functionality.
 * @property {FollowsDao} followsDao Singleton DAO implementing bookmarks CRUD operations
 */
class FollowsDao {
    constructor() {
        /**
         * Handles data from the controller and creates record in the Follows Model.
         * @param follower the id of the user doing the following
         * @param followed the id of the user that is being followed
         * @return the follows record that was created
         */
        this.userFollowsUser = (follower, followed) => __awaiter(this, void 0, void 0, function* () {
            const follows = yield FollowsModel_1.default.create({
                follower,
                followed
            });
            return follows;
        });
        /**
        * Handles data from the controller and deletes record in the Follows Model.
        * @param follower the id of the user doing the following
        * @param followed the id of the user that is being followed
        * @return the deletion status
        */
        this.userUnfollowsUser = (follower, followed) => __awaiter(this, void 0, void 0, function* () {
            const status = yield FollowsModel_1.default.deleteOne({ follower, followed });
            return status;
        });
        /**
        * Handles data from the controller and retrieves a list of users (those being followed) from the Follows Model.
        * @param follower the id of the user doing the following
        * @return the list of users being followed
        */
        this.findWhoIamFollowing = (follower) => __awaiter(this, void 0, void 0, function* () {
            const who = yield FollowsModel_1.default.find({ follower }).populate('followed', 'username').exec();
            return who;
        });
        /**
        * Handles data from the controller and retrieves a list of users (those that follow) from the Follows Model.
        * @param followed the id of the user doing the following
        * @return the list of users following the id provided
        */
        this.findWhoIsFollowingMe = (followed) => __awaiter(this, void 0, void 0, function* () {
            const who = yield FollowsModel_1.default.find({ followed }).populate('follower', 'username').exec();
            return who;
        });
    }
}
exports.default = FollowsDao;
FollowsDao.followsDao = null;
/**
 * Instantiates the Follows DAO when called. Maintains the Singleton Pattern.
 * @return followsDao
 */
FollowsDao.getInstance = () => {
    if (FollowsDao.followsDao === null) {
        FollowsDao.followsDao = new FollowsDao();
    }
    return FollowsDao.followsDao;
};
