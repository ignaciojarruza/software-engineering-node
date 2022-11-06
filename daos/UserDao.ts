/**
 * @file User DAO for data handling
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class DAO for User functionality.
 */
export default class UserDao implements UserDaoI {

    /**
     * Handles calls from the controller. Retrieves a list of all users.
     * @return the list of users
     */
     async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels
            .map((userMongooseModel) => {
                return new User(
                    userMongooseModel?._id.toString()??'',
                    userMongooseModel?.username??'',
                    userMongooseModel?.password??'',
                );
            });
        return userModels;
    }

   /**
    * Handles data from the controller. Retrieves a user.
    * @return the user with the id provided
    */
    async findUserById(uid: string): Promise<User> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }

   /**
    * Handles the data from the controller and creates a record in the database.
    * @param user the user details (from the body)
    * @return the user record created
    */
    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }

   /**
    * Handles the data from the controller and removes a record from the database.
    * @param uid the id of the user
    * @return the deletion status
    */
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }

    /**
     * Handles the data from the controller and removes a record from the database for the
     * given username.
     * @param username the username to be deleted
     * @returns the deletion status
     */
    async deleteUsersByUsername(username: string): Promise<any> {
        return await UserModel.deleteOne({username: username});
    }

   /**
    * Handles the data from the controller and updates a record from the database.
    * @param uid the id of the user
    * @param user the user details to update with (from the BODY)\
    * @return the update status
    */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: {
                username: user.uName,
                password: user.pass
            }});
    }
}
