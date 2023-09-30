import {Request,Response}  from "express";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import { checkServiceError, serviceErrorWithMessage  } from "../utils/catachServiceError";
import CourseQNAService from "../services/CourseQNAService";
import UserServices from "../services/UserServices";
import resources from "../utils/resources";

export default {
    async addQuestion (req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id;
            const {course_id} = req.query;
            const currCourseID = course_id?.toString() || " "; 
            const createQuestion = await CourseQNAService.insertQuestion({
                ...req.body,
                questionnaire_user_id : user_id,
                course_id : currCourseID
            });
            await checkServiceError(createQuestion);

            sendSuccess.sendSuccessResponse(res,200,createQuestion.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editQuestion (req:Request,res:Response){
        try{
            const {question_id,question_title,question_description} = req.body;
            
            const editQuestion = await CourseQNAService.editQuestion(question_id,question_title,question_description);
            await checkServiceError(editQuestion);

            sendSuccess.sendSuccessResponse(res,200,{
                message : editQuestion.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllQuestion (req:Request,res:Response){
        try{
            const {course_chapter_id,limit,page_no} = req.query;
            const currChapterId = course_chapter_id?.toString() ||  " ";
            
            const currLimit = Number(limit) || 3;
            const currPageNumber = Number(page_no) || 1;

            const questionData = await CourseQNAService.getChapterQuestion(currChapterId,currPageNumber,currLimit)
            await checkServiceError(questionData);

            sendSuccess.sendSuccessResponsePagination(res,200,questionData.data || { },currPageNumber,questionData.totalData || -1);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getFullQuestion (req:Request,res:Response){
        try{
            const {question_id} = req.query;
            const currQuestionID = question_id?.toString() || " ";
            
            const questionData = await CourseQNAService.getQuestionWithQuestionID(currQuestionID);
            await serviceErrorWithMessage(questionData.status,questionData.message || resources.messages.error.unknown);
            
            const userID = questionData.data?.questionnaire_user_id;
            const userData = await UserServices.getUserData(userID || " ");
            await serviceErrorWithMessage(userData.status,userData.message || resources.messages.error.unknown);

            const answerData = await CourseQNAService.getAllAnswersData(currQuestionID);
            await checkServiceError(answerData);

            const answererUserID = answerData.data?.map (obj => obj.answerer_user_id) || [" "];
            
            const asnwerUserData = await UserServices.getMutipleUsersById(answererUserID);
            await checkServiceError(asnwerUserData);
            
            const fullAnsData = answerData.data?.map(obj =>{
                const currUser = asnwerUserData.data?.find(user => user.user_id === obj.answerer_user_id);
                return {
                    answer_title: obj.answer_title,
                    answerer_user_id: obj.answerer_user_id,
                    answer_id: obj.answer_id,
                    first_name : currUser?.first_name,
                    last_name : currUser?.last_name,
                    profile_picture_path : currUser?.profile_picture_path
                }
            })
            const resultData = {
                questionData : questionData.data,
                userData : userData.data,
                answerData : fullAnsData
            }
            sendSuccess.sendSuccessResponse(res,200,resultData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async addAnswer(req:Request,res:Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id;
            
            const createAnswer = await CourseQNAService.createAnswer({
                ...req.body,
                answerer_user_id : user_id
            });
            await checkServiceError(createAnswer);

            sendSuccess.sendSuccessResponse(res,200,{
                message : createAnswer.message,
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editAnswer(req:Request,res:Response){
        try{
            const {answer_title,answer_description,answer_id} =req.body;
            
            const updateAnswer = await CourseQNAService.updateAnswer(answer_title,answer_description,answer_id);
            await checkServiceError(updateAnswer);
            
            sendSuccess.sendSuccessResponse(res,200,{
                message : updateAnswer.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500)
        }
    },
    async getFullAnswer(req:Request,res:Response){
        try{
            const {answer_id} = req.query;
            const currAnswerID = answer_id?.toString() || " ";

            const answerData = await CourseQNAService.getAnswerByAnswerID(currAnswerID);
            await serviceErrorWithMessage(answerData.status, answerData.message || resources.messages.error.unknown);

            const answererUserId = answerData.data?.answerer_user_id || " ";
            const answererUserData = await UserServices.getUserData(answererUserId);
            await serviceErrorWithMessage(answererUserData.status,answererUserData.message || resources.messages.error.unknown);

            const questionId = answerData.data?.question_id || " ";
            const questionData = await CourseQNAService.getQuestionDataByQuestionID(questionId);
            await serviceErrorWithMessage(questionData.status,questionData.message || resources.messages.error.unknown);

            const resultData = {
                userData : answererUserData.data,
                answerData : answerData.data,
                questionData : questionData.data
            }
            sendSuccess.sendSuccessResponse(res,200,resultData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllAnswers (req:Request,res:Response){
        try{
            const {question_id} = req.query;
            const currQuestionID = question_id?.toString() || " ";
            
            const answerData = await CourseQNAService.getAllAnswersData(currQuestionID);
            await checkServiceError(answerData);

            const answererUserID = answerData.data?.map (obj => obj.answerer_user_id) || [" "];
            
            const userData = await UserServices.getMutipleUsersById(answererUserID);
            await checkServiceError(userData);
            
            const resultData = answerData.data?.map(obj =>{
                const currUser = userData.data?.find(user => user.user_id === obj.answerer_user_id);
                return {
                    answer_title: obj.answer_title,
                    answerer_user_id: obj.answerer_user_id,
                    answer_id: obj.answer_id,
                    first_name : currUser?.first_name,
                    last_name : currUser?.last_name,
                    profile_picture_path : currUser?.profile_picture_path
                }
            })
            sendSuccess.sendSuccessResponse(res,200,resultData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
}