import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";

export default {
    async insertCourseDescription(courseId : string, courseRequirements : string,courseTagetAudience : string,full_course_description : string){
        try{
            
            const newDescription = await dbModel.CourseDescription.updateOne({
                course_id : courseId,
            },{  
                course_requirements : courseRequirements,
                course_taget_audience : courseTagetAudience,
                full_course_description : full_course_description,
                created_at : new Date(),
                updated_at : new Date()
            },{
                upsert: true, 
                new: true, 
                setDefaultsOnInsert: true
            })
            
            return{
                status: resources.status.success,
                data : newDescription
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getCourseDescription (course_id: string) {
        try{
            const resultData = await dbModel.CourseDescription.findOne({
                course_id : course_id
            },{
                course_id: 1,
                course_requirements: 1,
                course_taget_audience: 1,
                _id: 0,
                course_description_id: 1,
                full_course_description : 1
            });
            return{
                status: resources.status.success,
                data: resultData 
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async updateCourseDescription (courseId : string, courseRequirements : string,courseTagetAudience : string,full_course_description : string) {
        try{
            const resultData = await dbModel.CourseDescription.findOneAndUpdate({
                course_id : courseId,
            },{
                $set :{
                    course_requirements : courseRequirements,
                    course_taget_audience : courseTagetAudience,
                    full_course_description : full_course_description,
                    updated_at : new Date(),
                }
            })
            return{
                status: resources.status.success,
                data : resultData 
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}