import {authRouter} from "../src/auth/auth.router.js";
import {accountRouter} from "../src/account/account.router.js";
import {postRouter} from "../src/post/post.router.js";

export default function (app){
    app.use('/auth', authRouter)
    app.use('/account', accountRouter)
    app.use('/posts', postRouter)
 
}