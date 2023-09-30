import { Response } from "express"
import resources from "./resources"

export default {
    sendSuccessResponse(res: Response,status: number,data: object){
        res.status(status).send({
            status: resources.status.success,
            data: data
        })
    },
    sendSuccessResponsePagination(res: Response,status: number,data: object,pageNo: number,totalData:number){
        res.status(status).send({
            status: resources.status.success,
            data: data,
            page_number : pageNo,
            total_documents : totalData
        })
    }
}