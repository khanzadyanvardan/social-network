import express from "express"
import { PostController } from "./post.controller.js"
import { PostService } from "./post.service.js"
import { authMiddlewares } from "../auth/middlewares/auth.middlewares.js"
import db from '../../config/db/index.js'

export const postRouter = express.Router()

const postService = new PostService(db.User, db.Post, db.Follow)
const postController = new PostController(postService)

postRouter.use(authMiddlewares)

postRouter.get("/", 
    postController.posts.bind(postController)
)

// postRouter.get("/:id/like", 
//     postController.like.bind(postController)
// )

postRouter.get("/:id", 
    postController.postsById.bind(postController)
)