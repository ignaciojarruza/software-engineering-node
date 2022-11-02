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
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class DAO for User functionality.
 */
class UserDao {
    /**
     * Handles calls from the controller. Retrieves a list of all users.
     * @return the list of users
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find();
        });
    }
    /**
     * Handles data from the controller. Retrieves a user.
     * @return the user with the id provided
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(uid);
        });
    }
    /**
     * Handles the data from the controller and creates a record in the database.
     * @param user the user details (from the body)
     * @return the user record created
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create(user);
        });
    }
    /**
     * Handles the data from the controller and removes a record from the database.
     * @param uid the id of the user
     * @return the deletion status
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
     * Handles the data from the controller and updates a record from the database.
     * @param uid the id of the user
     * @param user the user details to update with (from the BODY)\
     * @return the update status
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
}
exports.default = UserDao;
