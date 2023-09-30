import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import {SubtitleDocument} from '../models/subtitle'

export default {
    async insertSubtitle(subtitleObject: SubtitleDocument) {
        try{
            const {subtitle_id,subtitle_name} =subtitleObject;
            const resultData = new dbModel.Subtitle({
                subtitle_id : subtitle_id,
                subtitle_name : subtitle_name,
                created_at : new Date(),
                updated_at : new Date(),
            });
            await resultData.save();
            return{
                status : resources.status.success,
                data : resultData
            }
        }catch(err){
            return{
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
    
}