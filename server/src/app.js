import express from 'express'
import cookieParser from 'cookie-parser'
import {errorHandler} from './middlewares/errorHandler.middleware.js'
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'

const app=express()

app.use(cors({
    origin:"https://accesebility-analyzer.onrender.com",
    credentials:true

}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "../../"); 

app.use(express.static(path.join(rootDir, "client/dist")));

export const axeCorePath = path.join(__dirname, "../node_modules/axe-core/axe.min.js");


import userRoutes from './routes/user.routes.js'
import analyzeRoutes from "./routes/analye.routes.js"

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/analyze",analyzeRoutes)


app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });

app.use(errorHandler)

export default app;