import express from 'express'
import cookieParser from 'cookie-parser'
import {errorHandler} from './middlewares/errorHandler.middleware.js'
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'

const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const axeCorePath = path.join(__dirname, "../node_modules/axe-core/axe.min.js");



import userRoutes from './routes/user.routes.js'
import analyzeRoutes from "./routes/analye.routes.js"

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/analyze",analyzeRoutes)


app.use(errorHandler)

export default app;