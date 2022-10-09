import User from "../models/User";

export default interface UserDao {
   findAllUsers(): Promise<User[]>;
   findUserById(uid: string): Promise<any>;
   createUser(user: User): Promise<any>;
   updateUser(uid: string, user: User): Promise<any>;
   deleteUser(uid: string): Promise<any>;
}
