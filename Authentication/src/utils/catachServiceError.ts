import { serviceResultInterface } from "../utils/interfaces/serviceResultInterface";
import resources from "./resources";

const checkServiceError = async (resultObject : serviceResultInterface)=>{
    if(resultObject.status === resources.status.fail){
        const errorMessage = resultObject.message || resources.messages.error.unknown;
        throw new Error(errorMessage);
    }
}

export {checkServiceError};
