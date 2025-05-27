import {Router} from 'express'
import { changePassword, fetchUser, getUserDetails, login, logout, signUp, updateProfilePicture } from '../controllers/user.controller.js';
import {verifyJwt} from "../middlewares/authentication.middleware.js"
import { upload } from '../middlewares/multer.middleware.js';

const router=Router()

router.route('/signUp').post(signUp)
router.route('/login').post(login)
router.route('/change-password').patch(verifyJwt,changePassword)
router.route('/update-profile-pic').patch(verifyJwt,upload.single("file"),updateProfilePicture)
router.route('/logout').post(verifyJwt,logout)
router.route('/fetch-current-user').get(verifyJwt,fetchUser)
router.route('/fetch-user-details').get(verifyJwt,getUserDetails)

export default router;