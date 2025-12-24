import express from "express";
import { userValidator } from './validators/user.validator.js';

export default function(authController, authService){
    const userRouter = express.Router()

    userRouter.get("/", 
        authController.me.bind(authController))

    userRouter.patch("/username",
        userValidator.bind(null, authService),
        authController.username.bind(authController))
    
    userRouter.patch("/privacy",
        authController.privacy.bind(authController))

    // userRouter.get("/posts", 
    //     authController.posts.bind(authController))
    
    return userRouter
}