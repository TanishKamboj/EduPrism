import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";

export default {
    async getBasicCourseData (course_id : string){
        try{
            const resultData = await dbModel.Course.findOne({
                _id : course_id
            },{
                _id : 0,
                course_id : 1,
                course_title : 1,
                course_short_description : 1,
                course_thumbnail_path : 1,
                updated_at : 1,
                course_skill_id : 1,
                course_industry_type_id : 1,
                instructor_user_id_list : 1
            });
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    },
    async getBasicModuleData (course_id: string){
        try{
            const resultData = await dbModel.CourseModule.find({
                course_id : course_id  
            },{
                _id : 0,
                course_id : 1,
                course_module_id : 1,
                module_number : 1,
                modifiedPaths : 1,
                module_description : 1,
                module_title : 1
            });
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllChapterData(courseModuleIds : string[]){
        try{
            const resultData = await dbModel.CourseChapter.find({
                course_module_id : courseModuleIds
            },{
                _id : 0,
                chapter_number : 1,
                chapter_title : 1,
                course_module_id : 1,
                preview_chapter : 1,
                chapter_description : 1
            })
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }  
        }
    },
    async getCourseByIndustry (industryID : number,pageNumber :number,limitNumber: number){
        try{
            const resultData = await dbModel.Course.find({
                course_industry_type_id : industryID
            },{
                _id : 0,
                course_id : 1,
                course_title : 1,
                course_skill_id : 1,
                course_admin_id_list : 1,
                course_thumbnail_path : 1,
            }).skip((pageNumber - 1)*limitNumber).limit(limitNumber);

            const totalData = await dbModel.Course.countDocuments({
                course_industry_type_id : industryID
            })
            return{
                status: resources.status.success,
                data : resultData,
                page_number : pageNumber,
                total_documents : totalData,
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getCourseBySkill (skill_id : number,pageNumber :number,limitNumber: number){
        try{
            const resultData = await dbModel.Course.find({
                course_skill_id : skill_id
            },{
                _id : 0,
                course_title : 1,
                course_skill_id : 1,
                course_id : 1,
                course_admin_id_list : 1,
                course_thumbnail_path : 1,
            }).skip((pageNumber - 1)*limitNumber).limit(limitNumber);

            const totalData = await dbModel.Course.countDocuments({
                course_skill_id : skill_id
            })
            return{
                status: resources.status.success,
                data : resultData,
                page_number : pageNumber,
                total_documents : totalData,
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getChapterDataByModuleID (courseModuleId : string){
        try{
            const resultData = await dbModel.CourseChapter.find({
                course_module_id : courseModuleId
            },{
                _id : 0,
                chapter_number : 1,
                chapter_title : 1,
                course_module_id : 1,
                preview_chapter : 1,
                chapter_description : 1
            });
            return {
                status : resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            } 
        }
    },
    async getChapterDataByChapterID (module_chapter_id : string){
        try{
            const resultData = await dbModel.CourseChapter.find({
                module_chapter_id : module_chapter_id
            });
            return {
                status : resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            } 
        }
    }
}