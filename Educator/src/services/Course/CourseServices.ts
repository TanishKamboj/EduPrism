import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";
import {CourseDocument} from "../../model/Course/Course";

export default { 
    async insertCourse(courseInfo : CourseDocument,userId : string){
        try{  
            const newCourse = new dbModel.Course({
                course_title : courseInfo.course_title,
                course_short_description : courseInfo.course_short_description,
                course_skill_id : courseInfo.course_skill_id,
                course_industry_type_id : courseInfo.course_industry_type_id,
                course_price_amount : courseInfo.course_price_amount,
                currency_id : courseInfo.currency_id,
                course_admin_id_list : [userId],
                course_thumbnail_path : courseInfo.course_thumbnail_path
            });
            await newCourse.save();
            return{
                status: resources.status.success,
                data : {
                    course_title : newCourse.course_title,
                    course_short_description : newCourse.course_short_description,
                    course_skill_id : newCourse.course_skill_id,
                    course_industry_type_id : newCourse.course_industry_type_id,
                    course_price_amount : newCourse.course_price_amount,
                    currency_id : newCourse.currency_id,
                    course_id : newCourse.course_id,
                    course_thumbnail_path : newCourse.course_thumbnail_path,
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }, 
    async addCourseRole(user_id : string, role_id : number,course_id : string) {
        try{
           let role_name = ''
           if(role_id == 1){
             role_name = 'instructor_user_id_list';
           } 
           else if(role_id == 2){
            role_name = 'TA_user_id_list';
           }
           else{
            role_name = 'content_maker_user_id_list';
           }
           const resultData = await dbModel.Course.updateOne(
                { _id : course_id},
                { $push :{
                    [role_name] : user_id
                }}
           );
           return{
                status: resources.status.success,
                message : resources.messages.success.created,
                data: { }
           }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async deleteCourseRole(user_id : string, role_id : number,course_id : string){
        try{
            let role_name = ''
            if(role_id == 1){
              role_name = 'instructor_user_id_list';
            } 
            else if(role_id == 2){
             role_name = 'TA_user_id_list';
            }
            else{
             role_name = 'content_maker_user_id_list';
            }
            const resultData = await dbModel.Course.updateOne(
                 { _id : course_id},
                 { $pull :{
                     [role_name] : user_id
                 }}
            );
            return{
                 status: resources.status.success,
                 message : resources.messages.success.deleted,
                 data: { }
            }
         }catch(err){
             return{
                 status: resources.status.fail,
                 message : resources.messages.error.generic(err as Error)
             }
         }
    },
    async getFullCourseData(course_id : string) {
        try{
            const resultData = await dbModel.Course.findOne(
                {_id : course_id}
            );
            return {
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async checkForAdmin(user_id : string,course_id : string){
        try{
            const resultData = await dbModel.Course.findOne({
                course_id : course_id,
                course_admin_id_list: {
                  $elemMatch: {
                    $eq: user_id
                  }
                }
              });
            return {
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async insertSubtitle(subtitleId : number, subtitlePath: string, course_id: string){
        try{
            const resultData = await dbModel.Course.updateOne({
                _id : course_id
            },{
                $push :{
                    subtitle_data : {
                        subtitle_id: subtitleId,
                        subtitle_path: subtitlePath
                    }
                }
            })
            return{
                status: resources.status.success,
                data : resultData,
                message: resources.messages.success.created
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getAllSubtitle(course_id : string) {
        try{
            const resultData = await dbModel.Course.findOne({
                _id : course_id
            });
            return{
                status : resources.status.success,
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