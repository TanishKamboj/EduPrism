import dbModel from '../config/db/modelCreation';
import resources from '../utils/resources';

export default {
    async getAllIndustry(pageNumber : number, limitNumber : number){
        try{
            const resultData = await dbModel.IndustryType.find({},{
                industry_type_id : 1,
                industry_type_name : 1,
                _id : 0
            }).skip((pageNumber - 1)*limitNumber).limit(limitNumber);
            const totalData = await dbModel.IndustryType.countDocuments();
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