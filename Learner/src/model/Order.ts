import  {Document,Schema} from "mongoose";

interface OrderDocument extends Document{
    order_id : string,
    email : string,
    phone_number : number,
    course_id : string,
    user_id : string,
    course_price_amount : number,
    price_currency_id : number,
    created_at : Date,
    updated_at : Date
}
const OrderSchema = new Schema<OrderDocument>({
    order_id : {type : String},
    email : {type : String},
    phone_number : {type : Number},
    course_id : {type : String},
    user_id : {type : String},
    course_price_amount : {type : Number},
    price_currency_id : {type : Number},
    created_at : {type : Date},
    updated_at : {type : Date}
})
OrderSchema.pre<OrderDocument>("save", function (next) {
    this.order_id = this._id;
    this.created_at = new Date();
    this.updated_at = new Date();
    next();
});
export {OrderDocument,OrderSchema};