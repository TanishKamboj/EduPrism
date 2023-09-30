import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";
import { EducatorDocument } from "../model/Educator";

export default {
    async createEducator(educatorInfo : EducatorDocument){
        try{
            
            const {user_id,educator_description,twitter_url,portfolio_website_url,linkedin_url} = educatorInfo;
            const newEducator = new dbModel.Educator({
                user_id : user_id,
                educator_description : educator_description,
                twitter_url : twitter_url,
                portfolio_website_url : portfolio_website_url,
                linkedin_url : linkedin_url
            })
            await newEducator.save();
            return{
                status : resources.status.success,
                data: newEducator
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async isEducatorPresent(userID : string){
        try{
            const resultData = await dbModel.Educator.findOne({
                user_id : userID
            });
            if(resultData === null){
                return{
                    status : resources.status.success,
                    data: {}
                }
            }
            else{
                return{
                    status : resources.status.fail,
                    message : resources.messages.error.conflict,
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async isUserEducator (userID : string){
        try{
            const resultData = await dbModel.Educator.findOne({
                user_id : userID
            });
            if(resultData === null){
                return{
                    status : resources.status.success,
                    data: {},
                    isEductor : false,
                    message: resources.messages.success.fetched
                }
            }
            else{
                return{
                    status : resources.status.success,
                    isEductor : true,
                    message: resources.messages.success.fetched
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}