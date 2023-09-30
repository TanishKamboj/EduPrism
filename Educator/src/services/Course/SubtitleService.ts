import resources from "../../utils/resources";
import dbModel from "../../config/db/modelCreation";

export default {
    async getSubtitleWithList(subtitleIdList : number[] ){
        try{
            const resultData = await dbModel.Subtitle.find({
                subtitle_id : subtitleIdList
            },{
                subtitle_id : 1,
                subtitle_name : 1
            });
            return{
                status: resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message : resources.messages.error.generic(err as Error)
            }
        }
    }
}