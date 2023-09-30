import { Request,Response } from "express";
import careerGoalService from "../../services/careerGoalService";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import resources from "../../utils/resources";
export default {
    async addCareerGoal(req:Request,res: Response){
        try{
            const careerRequestObject = req.body;
            const careerServiceRequest =await careerGoalService.insertNewCarrerObject(careerRequestObject);
            if(careerServiceRequest.status === resources.status.fail){
                const errorMessage = careerServiceRequest.message || resources.messages.error.unknown
                return sendError.sendOtherError(res,500,errorMessage);
            }
            const careerObjectData = careerServiceRequest.data || {};
            sendSuccess.sendSuccessResponse(res,200,careerObjectData);
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}