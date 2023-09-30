import CourseServices from "../services/Course/CourseServices"
import { checkServiceError, serviceErrorWithMessage } from "./catachServiceError";
import resources from "./resources";
import {getVideoDurationInSeconds} from 'get-video-duration';
export default {
    async getCourseRole(user_id : string,course_id: string){
        try{
            const courseData = await CourseServices.getFullCourseData(course_id);
            await serviceErrorWithMessage(courseData.status,courseData.message || " ");

            if(courseData.data === null){
                return{
                    status: resources.status.fail,
                    message : `This course dosen't exists.`
                }
            }
            const resultData = courseData.data;
            let resultRoleID = -1
            if(resultData?.course_admin_id_list.includes(user_id) === true){
                resultRoleID = 0; 
            }
            else if(resultData?.instructor_user_id_list.includes(user_id) === true){
                resultRoleID = 1;
            }
            else if(resultData?.TA_user_id_list.includes(user_id) === true){
                resultRoleID = 2;
            }
            else if(resultData?.content_maker_user_id_list.includes(user_id) === true){
                resultRoleID = 3;
            }
            return{
                status: resources.status.success,
                data : resultRoleID
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getVideoDuration(chapterVideoPath : string){
        try{
            const videoDuration = await getVideoDurationInSeconds(chapterVideoPath);
            return{
                status: resources.status.success,
                data : videoDuration
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}