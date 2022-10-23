import FollowsModel from "../mongoose/FollowsModel";

export const userFollowsUser = async (follower: string, followed: string) => {
    const follows = await FollowsModel.create({
        follower,
        followed
    });
    return follows;
};

export const userUnfollowsUser = async (follower: string, followed: string) => {
    const status = await FollowsModel.deleteOne({follower, followed});
    return status;
};

export const findWhoIamFollowing = async (me: string) => {
    const who = await FollowsModel.find({follower: me});
    return who;
}

export const findWhoIsFollowingMe = async (me: string) => {
    const who = await FollowsModel.find({followed: me}).populate('follower', 'username').exec();
    return who;
}

// TODO: 1) put in a class
// TODO: 2) implement singleton pattern
// TODO: 3) map to higher level classes