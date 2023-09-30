import dbModel from "../config/db/modelCreation";
import resources from "../utils/resources";
import {articleTagDocument} from "../models/articleTags"
export default {
    async insertCourseTag(tagData :articleTagDocument ) {
        try{
            const newTag = new dbModel.ArticleTag({
                article_tag_id : tagData.article_tag_id,
                article_tag_name : tagData.article_tag_name,
                created_at : new Date(),
                updated_at : new Date()
            });
            await newTag.save();
            return {
                status: resources.status.success,
                data : newTag
            }
        }catch(err){
            return {
                status: resources.status.fail,
                message: resources.messages.error.generic(err as Error)
            }
        }
    }
}