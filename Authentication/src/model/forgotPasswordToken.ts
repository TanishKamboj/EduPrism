import { Document,Schema,model } from "mongoose";

interface ForgotPasswordDocument extends Document{
    forgot_passwod_token : string,
    created_at : Date,
    user_id : string
}

const forgotPasswordSchema = new Schema<ForgotPasswordDocument>({
    forgot_passwod_token : {type : String},
    created_at : {type: Date},
    user_id :  {type : String}
})
forgotPasswordSchema.pre<ForgotPasswordDocument>("save",function(next){
    this.created_at = new Date();
    next();
})
export {ForgotPasswordDocument,forgotPasswordSchema}