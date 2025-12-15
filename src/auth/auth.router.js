import express from 'express'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { signupValidator } from './validators/signup.validator.js'
import { loginValidator } from './validators/login.validator.js'
import { userValidator } from './validators/user.validator.js'
import { authMiddlewares } from './middlewares/auth.middlewares.js'
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


const userRouter = express.Router()

authRouter.use("/user", userRouter);
userRouter.use(authMiddlewares)

userRouter.get("/", authController.me.bind(authController))

userRouter.patch("/username",
     userValidator.bind(null, authService),
     authController.username.bind(authController))

userRouter.patch("/privacy",
    authController.privacy.bind(authController)
)
