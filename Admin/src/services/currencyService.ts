import dbModel from '../config/db/modelCreation'
import resources from '../utils/resources'
import  {CurrencyDocument} from '../models/Currency';

export default {
    async insertNewCurrency(currencyObject: CurrencyDocument) {
        try{
            const {currency_id,currency_name,currency_symbol,used_id_zone} =currencyObject;
            const resultData = new dbModel.Currency({
                currency_id : currency_id,
                currency_name : currency_name,
                currency_symbol : currency_symbol,
                used_id_zone : used_id_zone,
                created_at : new Date(),
                updated_at : new Date()
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