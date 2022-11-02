"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
/**
 * User class. A user has a username, password and other fields.
 */
class User {
    constructor(id, username, password) {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
        this.id = id;
        this.username = username;
        this.password = password;
    }
    /**
     * Getter for username of user.
     * @return username
     */
    get uName() { return this.username; }
    /**
     * Getter for the password of user.
     * @return password
     */
    get pass() { return this.password; }
}
exports.default = User;
