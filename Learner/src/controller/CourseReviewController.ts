import {Request,Response}  from "express";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import { checkServiceError, serviceErrorWithMessage  } from "../utils/catachServiceError";
import CourseReviewServices from "../services/CourseReviewServices";
import UserServices from "../services/UserServices";
import resources from "../utils/resources";

export default {
    async addCourseReview (req: Request,res:Response) {
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const {course_id} = req.query;
            const currCourseID = course_id?.toString() || " ";
            
            const insertReview = await CourseReviewServices.insertReview({
                ...req.body,
                course_id : currCourseID,
                reviewer_user_id : userData.user_id
            });
            await serviceErrorWithMessage(insertReview.status,insertReview.message);

            sendSuccess.sendSuccessResponse(res,200,{
                message : insertReview.message
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteCourseReview(req:Request,res:Response){
        try{
            const {course_review_id} = req.query;
            const currCourseReviewID = course_review_id?.toString() || " ";
            const deleteReview = await CourseReviewServices.deleteReview(currCourseReviewID);
            await checkServiceError(deleteReview);
            
            sendSuccess.sendSuccessResponse(res,200,{
                message: deleteReview.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editCourseReview (req:Request , res : Response){
        try{
            const {course_review_id} = req.body;
            
            const editReview = await CourseReviewServices.editReview(req.body,course_review_id);
            await serviceErrorWithMessage(editReview.status,editReview.message);
                        
            sendSuccess.sendSuccessResponse(res,200,{
                message: editReview.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getReview(req:Request,res :Response){
        try{
            const {course_review_id} = req.query;
            const currCourseReviewID = course_review_id?.toString() || " ";
            console.log(currCourseReviewID);
            const getUserReview = await CourseReviewServices.getReviewByReviewID(currCourseReviewID);
            await serviceErrorWithMessage(getUserReview.status,getUserReview.message || " ");
            if(getUserReview.data === null){
                return sendError.sendOtherError(res,200,`Sorry review with review ID ${course_review_id} dosen't exists.`)
            }
            const userData = await UserServices.getUserData(getUserReview.data?.reviewer_user_id || " ");
            await serviceErrorWithMessage(userData.status,userData.message || resources.messages.error.unknown);

            let resultData = {
                userData : userData.data,
                reviewData : getUserReview.data
             };
            sendSuccess.sendSuccessResponse(res,200,resultData) ;
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllReview (req:Request,res:Response){
      try{
        const {course_id,limit,page_no} =req.query;
        console.log(req.query);
        const currCourseID = course_id?.toString() || " ";
        const currLimit = Number(limit) || 3;
        const currPageNo = Number(page_no) || 1;

        const getAllReview = await CourseReviewServices.getALlCourserReview(currCourseID,currLimit,currPageNo);
        await checkServiceError(getAllReview);
        console.log(getAllReview);
        let reviewUserId = getAllReview.data?.map(obj => obj.reviewer_user_id) || [" "];

        const UserReviewData = await UserServices.getMutipleUsersById(reviewUserId);
        await serviceErrorWithMessage(UserReviewData.status,UserReviewData.message || resources.messages.error.unknown);
        console.log(UserReviewData);
        let resultReviewData = UserReviewData.data?.map((currUser)=>{
            const currReviewData = getAllReview.data?.find(obj => obj.reviewer_user_id === currUser.user_id);
            return {
                userData : currUser,
                reviewData : currReviewData
            }
        })  || { };       
        sendSuccess.sendSuccessResponsePagination(res,200,resultReviewData,currPageNo,UserReviewData.totalData || -1);

      }catch(err){
        sendError.sendServerError(res,err as Error,500);
      } 
    }
}