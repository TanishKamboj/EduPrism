import { Request,Response,NextFunction } from "express";
import sendError from "../../utils/sendError";
import resources from "../../utils/resources";
import { serviceErrorWithMessage } from "../../utils/catachServiceError";
import courseUtils from "../../utils/courseUtils";

const checkAtleastCourseEducator = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const user_id = userData.user_id;
        const {course_id} = req.body;
        
        const roleIdData = await courseUtils.getCourseRole(user_id ||" ",course_id || " ");
        await serviceErrorWithMessage(roleIdData.status,roleIdData.message ||" ");

        const role_id = roleIdData.data;

        if(role_id == resources.course_role.TA || role_id == resources.course_role.ContentCreator){
            return sendError.sendOtherError(res,400,`Unauthorised`);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error, 500)
    }
}
const checkOnlyTA = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const user_id = userData.user_id;
        const {course_id} = req.body;
        
        const roleIdData = await courseUtils.getCourseRole(user_id ||" ",course_id || " ");
        await serviceErrorWithMessage(roleIdData.status,roleIdData.message ||" ");

        const role_id = roleIdData.data;

        if(role_id == resources.course_role.ContentCreator){
            return sendError.sendOtherError(res,400,`Unauthorised`);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error, 500)
    }
}
const checkAtleastCourseAdmin = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const user_id = userData.user_id;
        const {course_id} = req.body;
        
        const roleIdData = await courseUtils.getCourseRole(user_id ||" ",course_id || " ");
        await serviceErrorWithMessage(roleIdData.status,roleIdData.message ||" ");

        const role_id = roleIdData.data;

        if(role_id != resources.course_role.Admin){
            return sendError.sendOtherError(res,400,`Unauthorised`);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error, 500)
    } 
}

const checkAtleastCourseCC = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const user_id = userData.user_id;
        const {course_id} = req.body;
        
        const roleIdData = await courseUtils.getCourseRole(user_id ||" ",course_id || " ");
        await serviceErrorWithMessage(roleIdData.status,roleIdData.message ||" ");

        const role_id = roleIdData.data;

        if(role_id == resources.course_role.TA || role_id == -1){
            return sendError.sendOtherError(res,400,`Unauthorised`);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error, 500)
    } 
}

const checkTeamMember = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
        const user_id = userData.user_id;
        const {course_id} = req.body;
        
        const roleIdData = await courseUtils.getCourseRole(user_id ||" ",course_id || " ");
        await serviceErrorWithMessage(roleIdData.status,roleIdData.message ||" ");

        const role_id = roleIdData.data;

        if(role_id == -1){
            return sendError.sendOtherError(res,400,`Unauthorised`);
        }
        next();
    }catch(err){
        sendError.sendServerError(res,err as Error, 500)
    } 
} 
export {checkAtleastCourseEducator,checkAtleastCourseAdmin,checkAtleastCourseCC,checkTeamMember,checkOnlyTA};