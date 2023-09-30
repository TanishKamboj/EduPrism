import { serviceResultInterface } from "./interface/serviceResultInterface";
import resources from "./resources";

const checkServiceError = async (resultObject : serviceResultInterface): Promise<void> =>{
    if(resultObject.status === resources.status.fail){
        const errorMessage = resultObject.message || resources.messages.error.unknown;
        throw new Error(errorMessage);
    }
}

export {checkServiceError};
