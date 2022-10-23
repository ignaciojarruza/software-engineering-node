import mongoose from "mongoose";
import tuitSchema from "./TuitSchema";

/**
 * Tuit Mongoose Model.
 */
const TuitModel = mongoose.model("TuitModel", tuitSchema);

export default TuitModel;
