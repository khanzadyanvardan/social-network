import express from 'express'
import db from './config/db/index.js'
import loadRoutes from './config/routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
loadRoutes(app)

db.sequelize.sync().then(() => console.log("SYNC"))


app.listen(3000, () => console.log("http://localhost:3000"))