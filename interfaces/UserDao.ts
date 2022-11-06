import User from "../models/User";

/**
 * Interface for the User DAO.
 */
export default interface UserDao {
   /**
     * Handles calls from the controller. Retrieves a list of all users.
     * @return the list of users
     */
   findAllUsers(): Promise<User[]>;

   /**
    * Handles data from the controller. Retrieves a user.
    * @return the user with the id provided
    */
   findUserById(uid: string): Promise<any>;

   /**
    * Handles the data from the controller and creates a record in the database.
    * @param user the user details (from the body)
    * @return the user record created
    */
   createUser(user: User): Promise<any>;

   /**
    * Handles the data from the controller and updates a record from the database.
    * @param uid the id of the user
    * @param user the user details to update with (from the BODY)\
    * @return the update status
    */
   updateUser(uid: string, user: User): Promise<any>;

   /**
    * Handles the data from the controller and removes a record from the database.
    * @param uid the id of the user
    * @return the deletion status
    */
   deleteUser(uid: string): Promise<any>;


/**
 * Handles data from the controller and deletes a record from the database for the given username.
 * @param username the username of the user
 * @return the deletion status
 */
   deleteUsersByUsername(username: string): Promise<any>;
}
