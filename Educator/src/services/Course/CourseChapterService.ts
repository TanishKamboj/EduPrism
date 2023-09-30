import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";
import {CourseChapterDocument} from "../../model/Course/CourseChapter";

export default {
    async insertCourseChapter(chapterData : CourseChapterDocument){
        try{
            const newChapter = new dbModel.CourseChapter({
                chapter_number : chapterData.chapter_number,
                course_module_id : chapterData.course_module_id,
                chapter_title : chapterData.chapter_title,
                chapter_description : chapterData.chapter_description,
                chapter_resources : chapterData.chapter_resources,
                video_path : chapterData.video_path,
                video_duration : chapterData.video_duration,
                preview_chapter : chapterData.preview_chapter
            });
            await newChapter.save();
            return{
                status: resources.status.success,
                data : newChapter
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteCourseChapter(course_module_id:string,chapter_number: number){
        try{
            const deleteModule = await dbModel.CourseChapter.deleteOne({
                course_module_id : course_module_id,
                chapter_number : chapter_number
            });
            const updateModule = await dbModel.CourseChapter.updateMany({
                chapter_number : {
                    $gt : chapter_number
                }
            },{
                $inc: {chapter_number : -1}
            })
            return{
                status : resources.status.success,
                data : { },
                message : resources.messages.success.deleted
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getChapterData (course_module_id:string){
        try{
            const resultData = await dbModel.CourseChapter.find({
                course_module_id : course_module_id
            },{
                _id : 0,
                chapter_number : 1,
                chapter_title : 1,
                chapter_description : 1,
                video_duration : 1,
                module_chapter_id : 1
            });
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async editChapterData(chapterData : CourseChapterDocument){
        try{
            const updateData = await dbModel.CourseChapter.updateOne({
                chapter_number : chapterData.chapter_number,
                course_module_id : chapterData.course_module_id
            },{
                chapter_title : chapterData.chapter_title,
                chapter_description : chapterData.chapter_description,
                chapter_resources : chapterData.chapter_resources,
                video_path : chapterData.video_path,
                video_duration : chapterData.video_duration,
                updated_at : new Date()
            })
            return{
                status: resources.status.success,
                data : { },
                message : resources.messages.success.updated
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async addSubtitle(subtitle_id : number,subtitlePath: string, module_chapter_id: string){
        try{
            const newSubtitle = new dbModel.ChapterSubtitle({
                    subtitle_id : subtitle_id,
                    subtitle_path : subtitlePath,
                    module_chapter_id : module_chapter_id
            });
            await newSubtitle.save();
            const resultData = await dbModel.CourseChapter.updateOne({
                module_chapter_id : module_chapter_id
            },{
                $push :{
                    chapter_subtitle : newSubtitle
                },
                updated_at : new Date()
            });
            return {
                status : resources.status.success,
                data : resultData,
                message : resources.messages.success.created
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllSubtitle(module_chapter_id : string){
        try{
            const resultData = await dbModel.CourseChapter.findOne({
                module_chapter_id : module_chapter_id
            },{
                _id : 0,
                chapter_subtitle : 1
            });
            return {
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteSubtitle(module_chapter_id : string,chapter_subtitle_id : number) {
        try{
            const deleteData = await dbModel.CourseChapter.updateOne({
                module_chapter_id : module_chapter_id    
            },{
                $pull : {
                    chapter_subtitle : {
                        chapter_subtitle_id : chapter_subtitle_id
                    }
                }
            });
            return {
                status: resources.status.success,
                data : deleteData,
                message : resources.messages.success.deleted
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteModuleChapters(course_module_id:string){
        try{
            const resultData = await dbModel.CourseChapter.deleteMany({
                course_module_id : course_module_id
            })
            return{
                status : resources.status.success,
                message : resources.messages.success.deleted,
                data : { }
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}