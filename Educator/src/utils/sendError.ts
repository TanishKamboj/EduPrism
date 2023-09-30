import { Response } from "express"
import resources from "./resources"

export default {
    sendServerError(res: Response, err :Error,status: number){
        res.status(status).send({
            status : resources.status.fail,
            message: resources.messages.error.generic(err)
        })
    },
    sendOtherError(res:Response,status:number,message:string){
        res.status(status).send({
            status : resources.status.fail,
            message: message
        })
    }
}