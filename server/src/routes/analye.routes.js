import {Router} from 'express';
import { analyzePdf, analyzeUrl } from '../controllers/audit.controller.js';
import {verifyJwt} from "../middlewares/authentication.middleware.js"

const router = Router();


router.route("/analyzeUrl").post(verifyJwt,analyzeUrl)
router.route("/analyzepdf").post(verifyJwt,analyzePdf)
export default router;