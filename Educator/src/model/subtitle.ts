import { Document,Schema } from "mongoose";

interface SubtitleDocument extends Document{
    subtitle_id : number,
    subtitle_name : string,
    created_at : Date,
    updated_at : Date,
}

const subtitleSchema = new Schema<SubtitleDocument>({
    subtitle_id : {type: Number, unique: true},
    subtitle_name : {type: String},
    created_at : {type: Date},
    updated_at : {type: Date},
})
export {SubtitleDocument,subtitleSchema}