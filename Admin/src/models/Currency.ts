import { Document,Schema } from "mongoose";

interface CurrencyDocument extends Document {
    currency_id: number,
    currency_name: string,
    currency_symbol: string,
    used_id_zone : string,
    created_at : Date,
    updated_at : Date,
}

const currencySchema = new Schema<CurrencyDocument>({
    currency_id : { type: Number,  unique: true },
    currency_name : {type: String},
    currency_symbol : {type: String},
    used_id_zone : {type: String},
    created_at: { type: Date }, 
    updated_at: { type: Date },
})

export {CurrencyDocument,currencySchema};