import { Request,Response,NextFunction } from "express";
import OrderServices from "../services/OrderServices"
import { serviceErrorWithMessage } from "../utils/catachServiceError";
import sendError from "../utils/sendError";
import CourseQNAService from "../services/CourseQNAService";

    const isCourseOwner =  async(req:Request,res:Response,next:NextFunction) => {
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const {course_id} = req.query;
            const currCourseID = course_id?.toString() || " ";

            const userPurchaseStatus = await OrderServices.getOrderByCourseAndUserID(currCourseID,userData.user_id ||" ");
            await serviceErrorWithMessage(userPurchaseStatus.status,userPurchaseStatus.message ||" ");
                    
            if(userPurchaseStatus.data === null){
                return sendError.sendOtherError(res,400,`Sorry you don't own this course`);
            }
            next();
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
    const isQuestionnaire = async(req:Request,res:Response,next:NextFunction) => {
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id;
            const {question_id} = req.body;
            
            const questionData = await CourseQNAService.getQuestionDataByQuestionID(question_id);
            if(questionData.data?.questionnaire_user_id != user_id){
                return sendError.sendOtherError(res,400,`Sorry you don't have asked this question.`);
            }
            next();
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
export {isCourseOwner,isQuestionnaire};