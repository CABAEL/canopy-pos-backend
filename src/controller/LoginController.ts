import jwt, { Secret } from 'jsonwebtoken';
import { responseHandler,errResponse,successResponse} from '../utils/Helper';
import express, { Request, Response } from 'express';
import User from '../model/User';
import { Messages } from '../utils/Messages';


const router = express.Router();

router.post('/authenticate', async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const appSecret = process.env.APP_SECRET as Secret;

    try {
        const user = await User.findOne({ usrn: username });

        if (!user) {
            errResponse.msg = Messages.LOGIN_ERR
            return responseHandler(errResponse,req,res)
        }

        const userPassword = user.pwd as string;

        if (password === userPassword) {

            const token = jwt.sign({ uid: user._id }, appSecret, { expiresIn: '1800s' });
            
            successResponse.resData = {token:token}
    
            return responseHandler(successResponse,req,res);

        } else {

            errResponse.msg = Messages.LOGIN_ERR
            return responseHandler(errResponse,req,res)

        }
    } catch (error:any) {

        errResponse.msg = error.message || "Unknown error";
        return responseHandler(errResponse,req,res)

    }

});

export default router;
