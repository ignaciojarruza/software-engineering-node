import mongoose from "mongoose";
import FollowsSchema from "./FollowsSchema";

/**
 * @file Implements mongoose model to CRUD
 * documents in the follows collection
 */
const FollowsModel = mongoose.model('FollowsModel', FollowsSchema);

export default FollowsModel;