//TODO THIS MICROSERVICE IS JUST MADE TO ADD SOME VALUES 
//TODO ALL THE BUGS/FUNCTONALITY WILL BE ADDED LATER
import express,{Request,Response}  from "express";
import CareerGoalController from "../controller/CareerGoal/CareerGoalController";
import IndustryTypeController from "../controller/Industry/IndustryTypeController";
import SkillInterestController from "../controller/SkillInterest/SkillInterestController";
import UserTypeController from '../controller/UserType/UserTypeController'
import EducatorRoleController from "../controller/EducatorRole/EducatorRoleController";
import CurrencyController from "../controller/Currency/CurrencyController";
import SubtitleController from "../controller/Subtitle/SubtitleController";
import articleTagController from "../controller/Article/articleTagController";
const router = express.Router();

router.get('/',(req:Request,res:Response)=>{
    res.send("The Setup of backend of Admin Microservice is successful")
})
// Career Goal
router.post('/addCareerGoal',CareerGoalController.addCareerGoal);
// Industry_type
router.post('/addIndustryType',IndustryTypeController.addIndustryType);
// Skill Interest
router.post('/addSkillInterset',SkillInterestController.addSkillInterset);
// User Type
router.post('/addUserType',UserTypeController.addUserType);
// Educator Role
router.post('/addEducatorRole',EducatorRoleController.addEducatorRole);
router.post('/addCurrency',CurrencyController.addCurrency);
router.post('/addSubtitle',SubtitleController.addSubtitle);
router.post('/addArticleTag',articleTagController.addCourseTag);
export default router;