import express from 'express'
import { AccountController } from './account.controller.js'
import { AccountService } from './account.service.js'
import db from '../../config/db/index.js'
import { authMiddlewares } from '../auth/middlewares/auth.middlewares.js'

export const accountRouter = express.Router()

const accountService = new AccountService(db.User, db.Follow)
const accountController = new AccountController(accountService)


accountRouter.use(authMiddlewares)

accountRouter.get("/followers", 
    accountController.followers.bind(accountController))

accountRouter.get("/followings", 
    accountController.followings.bind(accountController))    

accountRouter.get("/search/:text", 
    accountController.searchName.bind(accountController))

accountRouter.patch("/request/:id/accept", 
    accountController.accept.bind(accountController))

accountRouter.patch("/request/:id/decline", 
    accountController.decline.bind(accountController))
    
accountRouter.get("/requests", 
    accountController.requests.bind(accountController))        

accountRouter.post("/:id/follow", 
    accountController.accountFollow.bind(accountController))






accountRouter.get("/:id",
    accountController.getAccount.bind(accountController))