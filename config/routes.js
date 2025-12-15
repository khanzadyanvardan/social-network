import {authRouter} from "../src/auth/auth.router.js";

export default function (app){
    app.use('/auth', authRouter)
    // app.use('/follow', followRoutes)
 
}