import mongoose from "mongoose";
import UserSchema from "./UserSchema";

/**
 * User Mongoose Model.
 */
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;