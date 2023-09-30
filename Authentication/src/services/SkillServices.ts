import dbModel from '../config/db/modelCreation';
import resources from '../utils/resources';
export default {
    async getSkillByIdustryId(IndustryId : string, pageNumber : number, limitNumber : number){
        try{
            const resultData = await dbModel.SkillInterest.find({
                industry_type_id : IndustryId
            },{
                _id : 0 ,
                skill_name : 1,
                industry_type_id : 1,
                skill_interest_id : 1
            }).skip((pageNumber - 1)*limitNumber).limit(limitNumber);
            const totalData = await dbModel.SkillInterest.countDocuments({
                industry_type_id : IndustryId
            });
            
            return{
                status : resources.status.success, 
                data : resultData,
                page_number : pageNumber,
                total_documents : totalData,
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}