import dbModel from '../config/db/modelCreation';
import resources from '../utils/resources';
import dotenv from 'dotenv';
dotenv.config();
export default {
    async upsertPasswordToken(token : string,userId : string){
        try{   
           const tokenData = await dbModel.ForgotPasswordToken.updateOne({ user_id: userId },{
            forgot_passwod_token : token,
            user_id : userId,
            created_at : new Date(),
           },{upsert : true});
           return{
            status: resources.status.success,
            data : tokenData
           }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
   async deleteTokenByUserId(user_id : string){
    try{
        const tokenData = await dbModel.ForgotPasswordToken.deleteOne({
            user_id : user_id
        })
        return{
            status: resources.status.success,
            data : tokenData
        }
    }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
   },
   async getTokenByUserId(user_id : string){
    try{
        const tokenData = await dbModel.ForgotPasswordToken.findOne({
            user_id : user_id
        })
        return{
            status: resources.status.success,
            data : tokenData
        }
    }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
   }

}