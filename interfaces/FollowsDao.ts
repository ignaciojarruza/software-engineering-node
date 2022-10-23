export default interface FollowsDao {
    userFollowsUser(follower: string, followed: string): Promise<any>;
    userUnfollowsUser(follower: string, followed: string): Promise<any>;
    findWhoIamFollowing(me: string): Promise<any>;
    findWhoIsFollowingMe(me: string): Promise<any>;
}