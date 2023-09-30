import {Request,Response}  from "express";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import { checkServiceError, serviceErrorWithMessage  } from "../utils/catachServiceError";
import CourseServices from "../services/CourseServices";

export default {
    async getCoursesWithIndustry (req:Request,res:Response){
        try{
            const {industryID,page,limit} = req.query;
            const currIndustryID = Number(industryID) || -1;
            const pageNumber = Number(page) || 1;
            const limitNumber = Number(limit) || 3;

            const getCourses = await CourseServices.getCourseByIndustry(currIndustryID,pageNumber,limitNumber);
            await checkServiceError(getCourses);

            sendSuccess.sendSuccessResponsePagination(res,200,getCourses.data || { },pageNumber,getCourses.total_documents || 0);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getCoureseWithSkill (req:Request,res:Response){
        try{
            const {skillID,page,limit} = req.query;
            const currskillID = Number(skillID) || -1;
            const pageNumber = Number(page) || 1;
            const limitNumber = Number(limit) || 3;

            const getCourses = await CourseServices.getCourseBySkill(currskillID,pageNumber,limitNumber);
            await checkServiceError(getCourses);

            sendSuccess.sendSuccessResponsePagination(res,200,getCourses.data || { },pageNumber,getCourses.total_documents || 0);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getFullCourseData (req:Request,res:Response){
        try{
            const {course_id} = req.query;
            const currCourseID = course_id?.toString() || " ";

            const basicCourseService = await CourseServices.getBasicCourseData(currCourseID);
            await serviceErrorWithMessage(basicCourseService.status,basicCourseService.message || " ");

            const moduleCourseService = await CourseServices.getBasicModuleData(currCourseID);
            await checkServiceError(moduleCourseService);

            const modelCourseContent = moduleCourseService.data || [ ]

            const resultData = {
                courseBasics : basicCourseService.data,
                courseModules : modelCourseContent
            }
            sendSuccess.sendSuccessResponse(res,200,resultData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getMinimalChapterData(req:Request , res: Response){
        try{
            const {course_module_id} = req.query;
            const currCourseModuleId = course_module_id?.toString() || " ";

            const chapterData = await CourseServices.getChapterDataByModuleID(currCourseModuleId);
            await checkServiceError(chapterData);
            
            sendSuccess.sendSuccessResponse(res,200,chapterData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getFullChapterData (req:Request,res:Response){
        try{
            const {module_chapter_id} = req.query;
            const currChapterModuleID = module_chapter_id?.toString() || " ";            

            const chapterData = await CourseServices.getChapterDataByChapterID(currChapterModuleID);
            await checkServiceError(chapterData);

            sendSuccess.sendSuccessResponse(res,200,chapterData.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}