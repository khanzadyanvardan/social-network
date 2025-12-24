import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class AuthService {
    constructor(userModel) {
        this.userModel = userModel
        // this.followModel = followModel
        // this.postModel = postModel
    }

    async findByLogin(username, scope=false) {
        if(scope) return  await this.userModel.scope('withPassword').findOne({ where: { username } })
            else return await this.userModel.findOne({ where: { username } })
    }
    
    async createUser(user) {
        const hashPass = await bcrypt.hash(user.password, 10)
        return await this.userModel.create({name: user.name, surname: user.surname, username: user.username, password: hashPass})
    }

    async generateToken(user, password){
        await this.checkPassword(password, user.password)
        const login = user.username
        const token = jwt.sign(
            { id: user.id, login},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        return token
    }


    async checkPassword(password, user_password){
        const match = await bcrypt.compare(password, user_password);
        if (!match) throw new Error("NOT_MATCHED");
    }


    async findById(id, scope=false) {
        let user = {}
        if(scope)user = await this.userModel.scope('withPassword').findByPk(id);
            else user = await this.userModel.findByPk(id);
        if(!user)  throw new Error("NOT_FOUND")
        return user
    }

    async setUsername(user_id, new_username, password){
       const user =  await this.findById(user_id, true);
       await this.checkPassword(password, user.password)
       const matchLogin = await this.findByLogin(new_username)
       if(matchLogin) throw new Error("MATCH_LOGIN");
       user.username = new_username;
       await user.save();
       return user
    }

    async setPrivacy(id){
        const user =  await this.findById(id);
        console.log(user)
        user.privacy = !user.privacy
        await user.save()
        return user.privacy
    }


    // async getPosts(id){
    //     const posts = await this.postModel.findAll({
    //         where: { user_id: id },
    //         // include: [
    //         //     {
    //         //         model: this.userModel,
    //         //         as: "user",
    //         //         attributes: ["id", "username"]
    //         //     }
    //         // ]
    //     });
    
    //     if (!posts) throw new Error("NOT_FOUND");
    //     return posts
    // }
}
