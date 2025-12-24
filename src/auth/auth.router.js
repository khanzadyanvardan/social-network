import express from 'express'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { signupValidator } from './validators/signup.validator.js'
import { loginValidator } from './validators/login.validator.js'
import { authMiddlewares } from './middlewares/auth.middlewares.js'
import userRouter from './user.router.js'
import db from '../../config/db/index.js'

export const authRouter = express.Router()

const authService = new AuthService(db.User)
const authController = new AuthController(authService)


authRouter.post("/signup", 
    signupValidator.bind(null, authService),
    authController.signup.bind(authController))

authRouter.post("/login", 
    loginValidator.bind(null, authService),
    authController.login.bind(authController))

authRouter.use("/user", authMiddlewares, userRouter(authController, authService));