import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";
import {CourseModuleDocument} from "../../model/Course/CourseModule";

export default {
    async insertCourseModule(moduleData : CourseModuleDocument, course_id : string){
        try{
            const newCourseModule = new dbModel.CourseModule({
                module_number : moduleData.module_number,
                module_description : moduleData.module_description,
                module_title : moduleData.module_title,
                course_id : course_id
            });
            await newCourseModule.save();
            return{
                status : resources.status.success,
                data : newCourseModule
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllModules (course_id : string){
        try{
            const resultData = await dbModel.CourseModule.find({
                course_id : course_id
            },{
                _id : 0,
                course_id: 1,
                module_number: 1,
                module_title: 1,
                module_description: 1,
                course_module_id: 1
            })
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
    async editModuleData (moduleData : CourseModuleDocument, course_id : string){
        try{
            const resultData = await dbModel.CourseModule.updateOne({
                course_id : course_id,
                course_module_id : moduleData.course_module_id
            },{
                module_number : moduleData.module_number,
                module_title : moduleData.module_title,
                module_description : moduleData.module_description,
                updated_at : new Date()
            })
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
    async deleteModule (course_id : string, module_number: number){
        try{
            const deltedModule = await dbModel.CourseModule.deleteOne({
                course_id : course_id,
                module_number : module_number
            });
            const changeData = await dbModel.CourseModule.updateMany({
                module_number : {
                    $gt : module_number
                }
            },
            {
                $inc: {module_number : -1}
            }
            )
            return{
                status : resources.status.success,
                data : { },
                message: resources.messages.success.deleted
            }
        }catch(err){
            return{
                status : resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}