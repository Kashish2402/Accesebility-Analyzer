import {Router} from 'express';
import { analyzeUrl } from '../controllers/audit.controller.js';
import {verifyJwt} from "../middlewares/authentication.middleware.js"

const router = Router();


router.route("/analyzeUrl").post(verifyJwt,analyzeUrl)
export default router;