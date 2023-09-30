import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";
import { OrderDocument } from "../model/Order";

export default {
    async insertOrder(orderData : OrderDocument){
        try{
            const newOrder = new dbModel.Order({
                email : orderData.email,
                phone_number: orderData.phone_number,
                user_id : orderData.user_id,
                course_id : orderData.course_id,
                course_price_amount : orderData.course_price_amount,
                price_currency_id : orderData.price_currency_id
            });
            await newOrder.save();
            return{
                status : resources.status.success,
                data : newOrder,
                message : resources.messages.success.created
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getOrderByCourseAndUserID (course_id : string, user_id : string){
        try{
            const resultData = await dbModel.Order.findOne({
                course_id : course_id,
                user_id : user_id
            })
            return {
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}