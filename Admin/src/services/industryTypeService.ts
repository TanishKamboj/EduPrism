import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import { IndustryTypeDocument } from '../models/IndustryType'

export default {
    async insertNewIndustryType(industryTypeObject: IndustryTypeDocument) {
        try{
            const {industry_type_id,industry_type_name } = industryTypeObject;
            const newIndustryType = new dbModel.IndustryType({
                industry_type_id : industry_type_id,
                industry_type_name : industry_type_name,
                created_at: new Date(),
                updated_at: new Date(),
            })
            newIndustryType.save();
            return{
                status: resources.status.success,
                data: newIndustryType   
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
    
}