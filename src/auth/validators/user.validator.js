export const userValidator = async (service, req, res, next) => {
    if (req.body.username.length < 6) {
        return res.status(400).send({ message: "Login is too short!" })
    }
    
    if (req.body.password.length < 6) {
        return res.status(400).send({ message: "Password is too short!" })
    }
    
    return next()
}