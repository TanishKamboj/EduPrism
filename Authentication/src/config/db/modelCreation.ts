import { model, Model } from "mongoose";
import {userSchema,UserDocument} from '../../model/User';
import { RefreshTokenDocument,refreshTokenSchema } from "../../model/refreshToken";
import { IndustryTypeDocument,industryTypeSchema } from "../../model/IndustryType";
import { SkillInterestDocument,SkillInterestSchema } from "../../model/SkillInterest";
import { ForgotPasswordDocument,forgotPasswordSchema } from "../../model/forgotPasswordToken";

const dbModel: {
    Users: Model<UserDocument>,
    RefreshToken: Model<RefreshTokenDocument>,
    ForgotPasswordToken : Model<ForgotPasswordDocument>,
    IndustryType: Model<IndustryTypeDocument>,
    SkillInterest: Model<SkillInterestDocument>,
  } = {
    Users: model<UserDocument>("User", userSchema),
    RefreshToken : model<RefreshTokenDocument>("RefreshToken",refreshTokenSchema),
    ForgotPasswordToken : model<ForgotPasswordDocument>("ForgotPasswordToken",forgotPasswordSchema),
    IndustryType: model<IndustryTypeDocument>("IndustryType",industryTypeSchema),
    SkillInterest: model<SkillInterestDocument>("SkillInterest",SkillInterestSchema),
  };
export default dbModel;