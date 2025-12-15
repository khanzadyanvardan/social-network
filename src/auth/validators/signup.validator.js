export const signupValidator = async (service, req, res, next) => {
    if (req.body.username.length < 6) {
        return res.status(400).send({ message: "Login is too short!" })
    }
    
    if (req.body.password.length < 6) {
        return res.status(400).send({ message: "Password is too short!" })
    }
    
    const loginExists = await service.findByLogin(req.body.username)

    if(loginExists){
        return res.status(400).send({message:"login is busy"})
    }
    return next()
}