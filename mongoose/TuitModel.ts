import mongoose from "mongoose";
import tuitSchema from "./TuitSchema";

/**
 * @file Implements mongoose model to CRUD
 * documents in the tuit collection
 */
const TuitModel = mongoose.model("TuitModel", tuitSchema);

export default TuitModel;
