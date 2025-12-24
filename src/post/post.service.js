export class PostService{
    constructor(userModel, postModel, followModel){
        this.userModel = userModel
        this.postModel = postModel
        this.followModel = followModel
    }

    async getPosts(user_id){
        return await this.postModel.findAll({where: {user_id}})
    }

    async getPostsById(post_id, user_id){
        const post = await this.postModel.findByPk(post_id, {
            include: [{ model: this.userModel, as: 'author',}]
        })
        if (!post) throw new Error("NOT_FOUND");
        if (post.author.id === user_id || !post.author.privacy) return post

        const isFollow = await this.followModel.findOne({
            where : {
                follower_id: user_id,
                following_id: post.author.id,
                status: "followed"
            }
        })
        if(!isFollow) throw new Error("NOT_AVAILABILITY");
        return post
    }


    // async addLike(post_id, user_id){
    //     const like = await this.getPostsById(post_id, user_id)
    //     // if (!post)
    // }

}