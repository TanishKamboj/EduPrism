import {Request,Response}  from "express";
import sendError from "../utils/sendError";
import sendSuccess from "../utils/sendSuccess";
import { checkServiceError, serviceErrorWithMessage  } from "../utils/catachServiceError";
import OrderServices from "../services/OrderServices";
import UserServices from "../services/UserServices";

export default {
    async addSingleOrder(req:Request,res:Response) {
        try{
            const userData = JSON.parse((req.headers['x-user-data'] || "{}").toString());
            const user_id = userData.user_id;

            const orderUserData = await UserServices.getUserData(user_id);
            await serviceErrorWithMessage(orderUserData.status,orderUserData.message ||" ");
            
            const createOrder = await OrderServices.insertOrder({
                ...req.body,
                user_id : user_id,
                email : orderUserData.data?.email,
                phone_number : orderUserData.data?.phone_number
            });
            await checkServiceError(createOrder);
            
            sendSuccess.sendSuccessResponse(res,200,createOrder.data || { });
        }catch(err){
            sendError.sendServerError(res,err as Error,500);
        }
    },
    
}