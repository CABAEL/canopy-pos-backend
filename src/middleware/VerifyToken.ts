import { Request, Response, NextFunction} from "express";
import { responseHandler,errResponse,successResponse} from '../utils/Helper';
import jwt, {Secret} from "jsonwebtoken";
import {Messages} from '../utils/Messages'

const appSecret = process.env.APP_SECRET as Secret;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(" ")[1];
  
  try {

    if (!token){

      errResponse.msg = Messages.TOKEN_ERR
      return responseHandler(errResponse,req,res)

    }
    
    jwt.verify(token, appSecret);
    next();

  } catch (error:any) {

    errResponse.msg = error.message || "Unknown error";
    return responseHandler(errResponse,req,res)

  }

};

export default verifyToken;
