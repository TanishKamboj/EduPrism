import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import { UserTypeDocument } from '../models/UserType'
export default {
    async insertUserType(userType: UserTypeDocument){
        try{
            const {user_type_id,user_type_name} = userType;
            const newUserType = new dbModel.UserType({
                user_type_id: user_type_id,
                user_type_name: user_type_name,
                created_at: new Date(),
                updated_at: new Date(),
            })
            newUserType.save();
            return{
                status: resources.status.success,
                data: newUserType
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
}