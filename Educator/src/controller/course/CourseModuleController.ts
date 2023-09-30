import { Request,Response } from "express";
import resources from "../../utils/resources";
import sendError from "../../utils/sendError";
import sendSuccess from "../../utils/sendSuccess";
import courseUtils from "../../utils/courseUtils";
import { checkServiceError } from "../../utils/catachServiceError";
import CourseModuleServices from "../../services/Course/CourseModuleServices";
import CourseChapterService from "../../services/Course/CourseChapterService";

export default {
    async createCourseModule (req:Request,res:Response){
        try{
            const {course_id} = req.body;
            
            const createModule = await CourseModuleServices.insertCourseModule(req.body,course_id);
            await checkServiceError(createModule);

            sendSuccess.sendSuccessResponse(res,200,createModule.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllCourseModule (req:Request,res:Response){
        try{
           const {course_id} = req.query;
           const currCourseID = course_id?.toString() || " ";
           const allModuleData = await CourseModuleServices.getAllModules(currCourseID);
           await checkServiceError(allModuleData);

            sendSuccess.sendSuccessResponse(res,200,allModuleData.data ||{ });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editCourseModule (req:Request, res:Response){
        try{
            const {course_id} = req.body;

            const editModuleData = await CourseModuleServices.editModuleData(req.body, course_id);
            await checkServiceError(editModuleData);

            sendSuccess.sendSuccessResponse(res,200, {
                message: resources.messages.success.updated
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteCourseModule (req:Request, res:Response){
        try{
    
            const {course_id,module_number,course_module_id} = req.body;

            const deleteModule = await CourseModuleServices.deleteModule(course_id,module_number);
            await checkServiceError(deleteModule);

            const deleteChapters = await CourseChapterService.deleteModuleChapters(course_module_id);
            await checkServiceError(deleteChapters);
            
            sendSuccess.sendSuccessResponse(res,200,{ message : deleteModule.message});
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}