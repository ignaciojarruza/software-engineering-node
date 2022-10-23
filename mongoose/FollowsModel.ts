import mongoose from "mongoose";
import FollowsSchema from "./FollowsSchema";

/**
 * Follows Mongoose Model.
 */
const FollowsModel = mongoose.model('FollowsModel', FollowsSchema);

export default FollowsModel;