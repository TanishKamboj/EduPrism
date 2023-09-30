import { Request,Response } from "express";
import sendError from "../../utils/sendError";
import sendSuccess from "../../utils/sendSuccess";
import CourseDescriptionServices from "../../services/Course/CourseDescriptionServices";
import { checkServiceError, serviceErrorWithMessage } from "../../utils/catachServiceError";
import resources from "../../utils/resources";


export default {
    
    async addCourseDescription(req: Request, res: Response){
        try{
            const {course_id,course_requirements,course_taget_audience,full_course_description} = req.body;
            
            const createDescription = await CourseDescriptionServices.insertCourseDescription(course_id,course_requirements,course_taget_audience,full_course_description);
            await checkServiceError(createDescription);

            sendSuccess.sendSuccessResponse(res,200,{
                message : resources.messages.success.created
             });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getCourseDescription(req:Request,res:Response){
        try{
            const {course_id} = req.query;
            
            const currCourseID = course_id?.toString() || " ";
            const courseData = await CourseDescriptionServices.getCourseDescription(currCourseID);
            await serviceErrorWithMessage(courseData.status, courseData.message || " ");

            sendSuccess.sendSuccessResponse(res,200,courseData.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editCourseDescription(req:Request,res:Response){
        try{
            const {course_id,course_requirements,course_taget_audience,full_course_description} = req.body;

            const courseData = await CourseDescriptionServices.updateCourseDescription(course_id,course_requirements,course_taget_audience,full_course_description);
            await serviceErrorWithMessage(courseData.status, courseData.message || " ");

            sendSuccess.sendSuccessResponse(res,200,courseData.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
}