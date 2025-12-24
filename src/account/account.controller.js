export class AccountController{
    constructor(service){
        this.service = service
    }



    async searchName(req, res){
        try{
            const accounts = await this.service.searcByName(req.params.text);
            res.status(200).send({accounts})
        }catch(err){
            console.error("SEARCH ERROR", err)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({message:"User not found"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }

    async getAccount(req, res){
        try{
            const account = await this.service.getAccountInfo(req.params.id);
            res.status(200).send({account})
        }catch(err){
            console.error("ACCOUNT ERROR", err)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({message:"User not found"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }

    async followers(req, res){
        try{
            const followers = await this.service.getFollowers(req.user.id)
            res.status(200).send({ok: true, followers})
        }catch(err){
            console.error("FOLLOWERS ERROR:", err)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({ok:false, message:"User not found"});
            }
            if(err.message === "NOT_MATCHED"){
                return res.status(401).send({ok:false, message:"Invalid password"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }

    async followings(req, res){
        try{
            const followings = await this.service.getFollowings(req.user.id)
            res.status(200).send({ok: true, followings})
        }catch(err){
            console.error("FOLLOW ERROR:", err)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({ok:false, message:"User not found"});
            }
            if(err.message === "NOT_MATCHED"){
                return res.status(401).send({ok:false, message:"Invalid password"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }



    async accountFollow(req, res){
        try{
            const {status, payload} = await this.service.accountFollowInfo(req.user.id, req.params.id)
            res.status(200).send({status, payload})
        }catch(err){
            console.log("FOLLOW ERROR", err)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({message:"User not found"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }


    async requests(req, res){
        try{
            const users = await this.service.getRequests(req.user.id)
            res.status(200).send({users})
        }catch(err){
            console.error("REQUESTS ERROR", err.message)
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }

    async accept(req, res){
        try{
            await this.service.requestAccept(req.params.id, req.user.id)
            res.status(200).send({ok:true})
        }catch(err){
            console.log("ACCEPT ERROR", err.message)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({message:"User not found"});
            }
        }
    }

    async decline(req, res){
        try{
            await this.service.requestDecline(req.params.id, req.user.id)
            res.status(200).send({ok:true})
        }catch(err){
            console.log("ACCEPT ERROR", err.message)
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({message:"User not found"});
            }
        }
    }
}