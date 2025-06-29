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
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy"); // Remove any existing one just to be safe
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self'; script-src 'self';"
  );
  next();
});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const axeCorePath = path.join(__dirname, "../node_modules/axe-core/axe.min.js");



import userRoutes from './routes/user.routes.js'
import analyzeRoutes from "./routes/analye.routes.js"

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/analyze",analyzeRoutes)


app.use(errorHandler)

export default app;