import {Op} from "sequelize"
export class AccountService{
    constructor(userModel, followModel){
        this.userModel = userModel
        this.followModel = followModel
        // this.postModel = postModel
    }

    async searcByName(name){
        const accounts = await this.userModel.findAll({
            where: {name: {[Op.like]: name+ '%'}}
        })
        if (!accounts) throw new Error("NOT_FOUND");
        return accounts;
    }


    async getAccountInfo(id){
        console.log(id)
        const account = await this.userModel.findOne({
            where: {id},
            attributes: {
                exclude: ["id"],
                include: [
                    [this.userModel.sequelize.literal(`(SELECT COUNT(*) FROM follows WHERE follows.following_id = User.id)`), "followers_count"],
                    [this.userModel.sequelize.literal(`(SELECT COUNT(*) FROM follows WHERE follows.follower_id = User.id)`), "followings_count"],
                    [this.userModel.sequelize.literal(`(SELECT COUNT(*) FROM posts WHERE posts.user_id = User.id)`), "posts_count"]
                ]
            }
        })
        if (!account) throw new Error("NOT_FOUND");
        return account;
    }



    async findByFollow(id, type){
        const user = await this.userModel.findByPk(id, {
            include: [
                { 
                    model: this.followModel,
                    as: type + 's',
                    include: [{ model: this.userModel, as: type }] 
                }
            ]
        });
        if(!user) throw new Error("NOT_FOUND");
        return user
    }

    async getFollowers(id) {
        const user = await this.findByFollow(id, "follower")
        return user.followers.map(f => f.follower);
    }

    async getFollowings(id){
        const user = await this.findByFollow(id, "following")
        return user.followings.map(f => f.following);
    }


    async accountFollowInfo(follower_id, following_id){
        const follow = await this.followModel.findOne({where: {follower_id, following_id}})
        const payload = await this.userModel.findByPk(following_id)
        if(!payload) throw new Error("NOT_FOUND");
        if(!follow){
           const status = payload.privacy ? "requested" : "followed";
           await this.followModel.create({follower_id, following_id, status})
           return {status, payload}
        }
        return { status: follow.status, payload };
    }

    async getRequests(following_id){
        const requests = await this.followModel.findAll({
            where:{following_id, status: "requested"},
            attributes: ["id"],
            include: [
                {
                  model: this.userModel,
                  as: "follower",
                  attributes: ["id", "name", "surname", "username"]
                }
            ]
        })
        return requests
    }

    async requestAccept(id, following_id){
        const follow = await this.followModel.findOne({where: {id, following_id, status: "requested"}})
        if(!follow || id === following_id) throw new Error("NOT_FOUND");
        follow.status = "followed"
        await follow.save()
        return follow
    }


    async requestDecline(id, following_id){
        const follow = await this.followModel.findOne({where: {id, following_id, status: "requested"}})
        if(!follow || id === following_id) throw new Error("NOT_FOUND");
        await follow.destroy()
        return follow
    }

}