import express from 'express'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler.middleware.js'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())

import userRoutes from './routes/user.routes.js'

app.use("/api/v1/users",userRoutes)
app.use(errorHandler)

export default app;