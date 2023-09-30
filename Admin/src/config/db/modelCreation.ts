import { model,Model } from "mongoose";
import { careerGoalDocument,careerGoalSchema } from "../../models/CareerGoal";
import { IndustryTypeDocument,industryTypeSchema } from "../../models/IndustryType";
import { SkillInterestDocument,SkillInterestSchema } from "../../models/SkillInterest";
import { UserTypeDocument,userTypeSchema } from "../../models/UserType";
import {educatorRoleSchema,EducatorRoleDocument} from '../../models/EducatorRole'
import { CurrencyDocument,currencySchema } from "../../models/Currency";
import {subtitleSchema,SubtitleDocument} from '../../models/subtitle';
import { articleTagDocument,articleTagSchema } from "../../models/articleTags";
const dbModel :{
    CareerGoals : Model<careerGoalDocument>,
    IndustryType: Model<IndustryTypeDocument>,
    SkillInterest: Model<SkillInterestDocument>,
    UserType : Model<UserTypeDocument>,
    EducatorRole : Model<EducatorRoleDocument>,
    Currency : Model<CurrencyDocument>,
    Subtitle : Model<SubtitleDocument>,
    ArticleTag : Model<articleTagDocument>
} = {
    CareerGoals: model<careerGoalDocument>("CareerGoal",careerGoalSchema),
    IndustryType: model<IndustryTypeDocument>("IndustryType",industryTypeSchema),
    SkillInterest: model<SkillInterestDocument>("SkillInterest",SkillInterestSchema),
    UserType : model<UserTypeDocument>('UserType',userTypeSchema),
    EducatorRole : model<EducatorRoleDocument>('EducatorRole',educatorRoleSchema),
    Currency : model<CurrencyDocument>('Currency',currencySchema),
    Subtitle : model<SubtitleDocument>('Subtitle',subtitleSchema),
    ArticleTag : model<articleTagDocument>('articleTag',articleTagSchema)
}
export default dbModel;