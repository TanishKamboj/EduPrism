import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import { EducatorRoleDocument } from '../models/EducatorRole'
export default {
    async insertNewEducator(EducatorRoleObj : EducatorRoleDocument ) {
        try{
            const { educator_role_type_id,educator_role_type_name,educator_role_type_description} = EducatorRoleObj;
            const newRole = new dbModel.EducatorRole({
                educator_role_type_id: educator_role_type_id,
                educator_role_type_name: educator_role_type_name,
                educator_role_type_description: educator_role_type_description,
                created_at : new Date(),
                updated_at : new Date()
            })
            newRole.save();
            return{
                status: resources.status.success,
                data: {
                    ducator_role_type_id: educator_role_type_id,
                    educator_role_type_name: educator_role_type_name,
                    educator_role_type_description: educator_role_type_description
                }
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
    
}