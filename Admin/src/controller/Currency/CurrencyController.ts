import { Request,Response } from "express";
import currencyService from "../../services/currencyService";
import sendError from "../../utils/sendError"; 
import sendSuccess from "../../utils/sendSuccess";
import { checkServiceError } from "../../utils/catachServiceError";

export default {
    async addCurrency(req:Request,res: Response){
        try{
            const currencyData = req.body;
            const newData = await currencyService.insertNewCurrency(currencyData);
            await checkServiceError(newData);
            sendSuccess.sendSuccessResponse(res,200,newData.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    }
}
