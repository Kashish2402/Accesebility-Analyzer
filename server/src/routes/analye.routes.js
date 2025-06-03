import {Router} from 'express';
import { analyzePdf, analyzeUrl } from '../controllers/audit.controller.js';
import {verifyJwt} from "../middlewares/authentication.middleware.js"
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();


router.route("/analyzeUrl").post(verifyJwt,analyzeUrl)
router.route("/analyzepdf").post(verifyJwt,upload.single("upladedFile"),analyzePdf)
export default router;