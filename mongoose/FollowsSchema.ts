import mongoose from "mongoose";

const FollowsSchema = new mongoose.Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    followed: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'follows'});

export default FollowsSchema;