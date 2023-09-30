import { Request,Response } from "express";
import resources from "../../utils/resources";
import sendError from "../../utils/sendError";
import sendSuccess from "../../utils/sendSuccess";
import courseUtils from "../../utils/courseUtils";
import { checkServiceError,serviceErrorWithMessage } from "../../utils/catachServiceError";
import CourseChapterService from "../../services/Course/CourseChapterService";

export default {
    async createModuleChapter (req:Request,res:Response){
        try{
            const chapterVideoPath = req.file?.path;
            const getVideoDuration = await courseUtils.getVideoDuration(chapterVideoPath || " ");
            await serviceErrorWithMessage(getVideoDuration.status,getVideoDuration.message ||" ");

            const chapterVideoDuration = getVideoDuration.data;
            const createChapter = await CourseChapterService.insertCourseChapter({...req.body,
                video_path :chapterVideoPath,
                video_duration : chapterVideoDuration 
            })
            await checkServiceError(createChapter);

            sendSuccess.sendSuccessResponse(res,200,createChapter.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteModuleChapter (req:Request,res:Response){
        try{
            const {course_module_id,chapter_number} = req.body;

            const removeChapter = await CourseChapterService.deleteCourseChapter(course_module_id,chapter_number);
            await checkServiceError(removeChapter);

            sendSuccess.sendSuccessResponse(res,200,{message: removeChapter.message})
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllChapters (req:Request,res:Response){
        try{
            const {course_module_id} = req.query;
            const currCourseModuleID = course_module_id?.toString() ||" ";
            const chapterData = await CourseChapterService.getChapterData(currCourseModuleID);
            await checkServiceError(chapterData);

            sendSuccess.sendSuccessResponse(res,200,chapterData.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async editModuleChapter(req:Request,res: Response){
        try{
            const chapterVideoPath = req.file?.path;

            const getVideoDuration = await courseUtils.getVideoDuration(chapterVideoPath || " ");
            await serviceErrorWithMessage(getVideoDuration.status,getVideoDuration.message ||" ");

            const updateData = await CourseChapterService.editChapterData({
                ...req.body,
                video_path :chapterVideoPath,
                video_duration : getVideoDuration.data 
            });
            await checkServiceError(updateData);

            sendSuccess.sendSuccessResponse(res,200,{
                message : updateData.message
            })
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async addChapterSubtitle (req:Request,res:Response){
        try{
            const {subtitle_id,module_chapter_id} = req.body;
            const subtitlePath = req.file?.path;

            const addSubtitle = await CourseChapterService.addSubtitle(subtitle_id,subtitlePath || " ",module_chapter_id);
            await checkServiceError(addSubtitle);

            sendSuccess.sendSuccessResponse(res,200,{ message : addSubtitle.message });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async getAllSubtitles(req:Request,res:Response){
        try{
            const {module_chapter_id} = req.body;
            const getSubtitles = await CourseChapterService.getAllSubtitle(module_chapter_id);
            await serviceErrorWithMessage(getSubtitles.status,getSubtitles.message || " ");

            sendSuccess.sendSuccessResponse(res,200,getSubtitles.data?.chapter_subtitle || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    async deleteSubtitle(req:Request,res:Response){
        try{
            
            const {module_chapter_id,chapter_subtitle_id} = req.body;

            const deletedData = await CourseChapterService.deleteSubtitle(module_chapter_id,chapter_subtitle_id);
            await checkServiceError(deletedData);

            sendSuccess.sendSuccessResponse(res,200,{
                message : deletedData.message
            });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}