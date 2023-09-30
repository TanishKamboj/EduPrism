import { Response } from "express"
import resources from "./resources"

export default {
    sendSuccessResponse(res: Response,status: number,data: object | undefined){
        res.status(status).send({
            status: resources.status.success,
            data: data
        })
    }
}