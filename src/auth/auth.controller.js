export class AuthController{
    constructor(service){
        this.service = service
    }

    async signup(req, res) {
        const result = await this.service.createUser(req.body)
        res.status(201).send({ ok: true, message: "registered" })
    }

    async login(req, res){
        try{
            const {password} = req.body
            const user = req.user
            const result = await this.service.generateToken(user, password)
            res.status(201).send({ok: true, token: result})
        }catch(err){
            if(err.message === "NOT_MATCHED"){
                res.status(400).send({ok:false, message:"User not found"})
            }
        }
    }

    async me(req, res){
        try{
            const result = await this.service.findById(req.user.id)
            res.status(200).send({ok: true, user: result})
        }catch(err){
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({ ok: false, message: "User not found" });
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }


    async username(req, res){
        const {username, password} = req.body
        const {id} = req.user
        try{
            const result = await this.service.setUsername(id, username, password)
            res.status(200).send({ok: true})
        }catch(err){
            if(err.message === "MATCH_LOGIN"){
                res.status(400).send({ok:false, message:"Username already exists"})
            }
            if(err.message === "NOT_MATCHED"){
                return res.status(401).send({ok:false, message:"Invalid password"});
            }
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({ok:false, message:"User not found"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }


    async privacy(req, res){
        try{
            const privacy = await this.service.setPrivacy(req.user.id)
            res.status(200).send({ok: true, privacy})
        }catch(err){
            if(err.message === "NOT_FOUND"){
                return res.status(404).send({ok:false, message:"User not found"});
            }
            if(err.message === "NOT_MATCHED"){
                return res.status(401).send({ok:false, message:"Invalid password"});
            }
            return res.status(500).send({ ok: false, message: "Server error" });
        }
    }

    // async posts(req, res){
    //     try{
    //         const posts = await this.service.getPosts(req.user.id)
    //         res.status(200).send({ok: true, posts})
    //     }catch(err){
    //         console.error("FOLLOWERS ERROR:", err)
    //         if(err.message === "NOT_FOUND"){
    //             return res.status(404).send({ok:false, message:"Not found"});
    //         }
    //         if(err.message === "NOT_MATCHED"){
    //             return res.status(401).send({ok:false, message:"Invalid password"});
    //         }
    //         return res.status(500).send({ ok: false, message: "Server error" });
    //     }
    // }

}