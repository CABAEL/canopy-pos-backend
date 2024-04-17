import { Request, Response } from 'express'; 
import fs from 'fs'
import path from 'path'
import {Messages} from '../utils/Messages'

interface ResponseData {
    response_code:number,
    msg:string,
    resData:{}
}

export const responseHandler = (responseData: ResponseData,req:Request,res:Response) => {
    
    const { response_code, msg, resData} = responseData;
    res.status(200).send({ response_code:response_code, msg:msg, data: resData });

}

export const errResponse = {
    response_code: 0,
    msg: Messages.SIMPLE_FAILED,
    resData: {},
    req: Response,
    res: Request
};

export const successResponse = {
    response_code: 1,
    msg: Messages.SIMPLE_SUCCESS,
    resData: {}
};



