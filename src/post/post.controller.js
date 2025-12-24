export class PostController{
    constructor(service){
        this.service = service
    }

    async posts(req, res){
        try{
            const posts = await this.service.getPosts(req.user.id)
            res.status(200).send({ok: true, posts})
        }catch(err){
            console.log("POSTS ERROR", err)
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }


    async postsById(req, res){
        try{
            const post = await this.service.getPostsById(req.params.id, req.user.id)
            res.status(200).send({ok: true, post})
        }catch(err){
            console.log("POST ERROR", err)
            if (err.message === "NOT_FOUND") {
                return res.status(404).send({ message: "Not found" });
            }
            if (err.message === "NOT_AVAILABILITY") {
                return res.status(403).send({ message: "This post is private" });
            }
        }
    }


    // async like(req, res){
    //     try{
    //     const like = await this.service.addLike(req.params.id, req.user.id)
    //     res.status(200).send({ok: true})
    //     }catch(err){
            
    //     }
    // }

}