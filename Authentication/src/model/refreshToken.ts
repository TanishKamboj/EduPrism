import { Document,Schema } from "mongoose";

interface RefreshTokenDocument extends Document{
    refresh_token :  string,
    token_created_at : Date,
    validity_duration : string,
    user_id : string
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>({
    refresh_token :  {type: String},
    token_created_at : {type : Date},
    validity_duration : {type: String},
    user_id : {type: String}
});

export {RefreshTokenDocument,refreshTokenSchema};
