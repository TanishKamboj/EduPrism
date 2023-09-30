import { Request,Response } from "express";
import sendError from "../../utils/sendError";
import sendSuccess from "../../utils/sendSuccess";
import CourseServices from "../../services/Course/CourseServices";
import { checkServiceError ,serviceErrorWithMessage} from "../../utils/catachServiceError";
import UserServices from "../../services/UserServices";
import courseUtils from "../../utils/courseUtils";
import resources from "../../utils/resources";
import SubtitleService from "../../services/Course/SubtitleService";
import EducatorServices from "../../services/EducatorServices";

export default {
    async registerCourse(req: Request, res: Response){
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id;

            const isUserEducator = await EducatorServices.isUserEducator(user_id);
            await checkServiceError(isUserEducator);
            if(isUserEducator.isEductor === false){
                return sendError.sendOtherError(res,200,`First Please register as a Educator then only you can be an educator `);
            }
            
            const courseThumbnail = req.file?.path;
            const createCourse = await CourseServices.insertCourse({
                ...req.body,
                course_thumbnail_path : courseThumbnail
            },user_id);
            await checkServiceError(createCourse);

            sendSuccess.sendSuccessResponse(res,200,createCourse.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async addCourseRole(req: Request, res: Response){
        try{
            const {email,course_role_id,course_id} = req.body;
            
            const isUserEducator = await UserServices.isUserEducator(email);
            await checkServiceError(isUserEducator);
            let educatorUserID = "";
            if(isUserEducator.data){
                const userData = isUserEducator.data[0];
                if(userData.educator === null){
                    return sendError.sendOtherError(res,400,`Sorry the user with email ${email} is not registerd as an educator.`);
                }
                else{
                    educatorUserID = userData.user_id;
                }
            }
  
            const addUserRole = await CourseServices.addCourseRole(educatorUserID,course_role_id,course_id);
            await checkServiceError(addUserRole);

            sendSuccess.sendSuccessResponse(res,200,{message : addUserRole.message });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteCourseRole(req: Request, res: Response){
        try{
            const {user_id,course_role_id,course_id} = req.body;
            
            const deleteCourseRole = await CourseServices.deleteCourseRole(user_id,course_role_id,course_id);
            await checkServiceError(deleteCourseRole);

            sendSuccess.sendSuccessResponse(res,200,{message: deleteCourseRole.message});
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async addSubtitles(req: Request, res: Response){
        try{
            const {course_id,subtitle_id} = req.body;
            const subtitlePath = req.file?.path;

            const addSubtitle = await CourseServices.insertSubtitle(subtitle_id,subtitlePath || " ",course_id);
            await checkServiceError(addSubtitle);
            
            sendSuccess.sendSuccessResponse(res,200,{
                message : addSubtitle.message
             });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllSubtitles(req: Request, res: Response){
        try{
            const {course_id} = req.body;
            const courseSubtitleService = await CourseServices.getAllSubtitle(course_id);
            await serviceErrorWithMessage(courseSubtitleService.status,courseSubtitleService.message || " ");

            const subtitleData = courseSubtitleService.data?.subtitle_data;

            const subtitleIds = subtitleData?.map(obj => obj.subtitle_id);
            const resultData = [] as Array<{
                subtitle_id: number;
                subtitle_name: string 
                subtitle_path: string;
              }>;;
            
            if(subtitleIds) {
                const subtitleServiceData = await SubtitleService.getSubtitleWithList(subtitleIds);
                await checkServiceError(subtitleServiceData);
                const fullSubtitleData = subtitleServiceData.data;
                subtitleData?.forEach((value,index)=>{
                    const currSubtitleData = fullSubtitleData?.find(obj => obj.subtitle_id === value.subtitle_id);
                    resultData.push({
                        subtitle_id : value.subtitle_id,
                        subtitle_name : currSubtitleData?.subtitle_name || " ",
                        subtitle_path : value.subtitle_path
                    })
                })
            }

            sendSuccess.sendSuccessResponse(res,200,resultData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}