import { serviceResultInterface } from "./interface/serviceResultInterface";
import resources from "./resources";

const checkServiceError = async (resultObject : serviceResultInterface): Promise<void> =>{
    if(resultObject.status === resources.status.fail){
        const errorMessage = resultObject.message || resources.messages.error.unknown;
        throw new Error(errorMessage);
    }
}
const serviceErrorWithMessage = async (status: string, messgae : string) =>{
    if(status === resources.status.fail){
        const errorMessage = messgae || resources.messages.error.unknown;
        throw new Error(errorMessage);
    }
}
export {checkServiceError,serviceErrorWithMessage};
