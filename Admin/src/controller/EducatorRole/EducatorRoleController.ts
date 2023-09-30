import { Request,Response } from "express";
import EducatorRoleService from "../../services/EducatorRoleService";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import resources from "../../utils/resources";
export default {
    async addEducatorRole(req:Request,res: Response){
        try{
            const addRoleObject = req.body;
            const newRole = await EducatorRoleService.insertNewEducator(addRoleObject);
            if(newRole.status === resources.status.fail){
                return sendError.sendOtherError(res,500,newRole.message || resources.messages.error.unknown);
            }
            const newRoleData = newRole.data || {};
            sendSuccess.sendSuccessResponse(res,200,newRoleData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}
