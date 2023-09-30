import  express ,{Request,Response}  from "express";
import AuthController from '../controller/AuthController'
import TokenController from '../controller/tokenController';
import multerConfig from '../config/multerConfig';
import multer from "multer";
import joiValidator from "../middleware/joi/joiValidator";
import SkillController from "../controller/SkillController";
import IndustryController from "../controller/IndustryController";
const uploadMedia = multer(multerConfig); 
const router = express.Router();

router.get('/auth/home',(req:Request,res:Response)=>{
    res.send("The Setup of backend of Authentication Microservice is successful")
});

router.post('/auth/signup',uploadMedia.single('profile_picture'),joiValidator.signUpMiddleware,AuthController.userSignUp);
router.post('/auth/login',joiValidator.loginMiddleware,AuthController.userLogin);
router.post('/auth/basicQuestion',joiValidator.basicQuestionMiddleware,AuthController.basicQuestion);
router.post('/auth/forgotPassword',joiValidator.forgotPasswordMiddleware,AuthController.forgotPassword);
router.post('/auth/resetPassword',joiValidator.resetPasswordMiddleware,AuthController.resetPassword)
router.post('/auth/refreshToken',TokenController.refreshToken);
router.get('/auth/getSkills',SkillController.getSkillByIndustry);
router.get('/auth/getAllIndustry',IndustryController.getAllIndustry);

export default router;

