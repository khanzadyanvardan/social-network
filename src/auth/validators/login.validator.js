export const loginValidator = async(service, req, res, next)=>{
    if(req.body.username.length < 6){
       return res.status(400).send({message: "Username is too short!"})
    }
    if(req.body.password.length < 6 || typeof req.body.password !== "string" ){
        return res.status(400).send({message: "Password is incorect!"})
    }
     
    const user = await service.findByLogin(req.body.username, true)
     if(!user){
        return res.status(404).send({ok:false, message: "User not found"})
    }

    req.user = user
    return next()
}