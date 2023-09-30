import dbModel from '../config/db/modelCreation';
import resources from '../utils/resources';
import dotenv from 'dotenv';
dotenv.config();

export default {
    async upsertToken(token : string,userId : string){
        try{   
           const tokenData = await dbModel.RefreshToken.updateOne({ user_id: userId },{
            refresh_token : token,
            user_id : userId,
            validity_duration : process.env.REFRESH_TOKEN_EXPIRATION,
            token_created_at : new Date(),
           },{upsert : true});
        return{
            status: resources.status.success,
            data: tokenData
        }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getTokenData(userId: string){
        try{   
            const resultData = await dbModel.RefreshToken.findOne({
                user_id : userId
            })
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
    }
}