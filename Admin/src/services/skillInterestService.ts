import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import { SkillInterestDocument } from '../models/SkillInterest'
export default {
    async insertNewIndustryType(skillInterestObject: SkillInterestDocument) {
        try{
            const {skill_interest_id,industry_type_id,skill_name} = skillInterestObject;
            const newSkillInterest = new dbModel.SkillInterest({
                skill_interest_id: skill_interest_id,
                industry_type_id: industry_type_id,
                skill_name : skill_name,
                created_at: new Date(),
                updated_at: new Date(),
            });
            newSkillInterest.save();
            return{
                status: resources.status.success,
                data:newSkillInterest
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
    
}