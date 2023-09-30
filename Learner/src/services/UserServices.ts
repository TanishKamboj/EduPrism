import resources from "../utils/resources";
import dbModel from "../config/db/modelCreation";

export default {
    async getUserData(user_id : string) {
        try{
            const resultData = await dbModel.Users.findOne({
                _id : user_id
            },{
                _id : 0,
                user_id : 1,
                email : 1,
                phone_number : 1,
                first_name : 1,
                last_name : 1,
                profile_picture_path : 1
            });
            return {
                status : resources.status.success,
                data : resultData
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    },
    async getMutipleUsersById (user_id : string[]) {
        try{
            const resultData = await dbModel.Users.find({
                user_id : { $in: user_id }
            },{
                _id : 0,
                user_id : 1,
                email : 1,
                phone_number : 1,
                first_name : 1,
                last_name : 1,
                profile_picture_path : 1
            });
            const totalData = await dbModel.Users.countDocuments({
                user_id : { $in: user_id }
            })
            return {
                status : resources.status.success,
                data : resultData,
                totalData : totalData
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}