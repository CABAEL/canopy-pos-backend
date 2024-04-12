import jwt, { Secret } from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import User from '../model/User';
import { responseHandler } from '../utils/Helper';
import { Messages } from '../utils/Messages';

const router = express.Router();

router.post('/authenticate', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const appSecret = process.env.APP_SECRET as Secret;

    try {
        const user = await User.findOne({ usrn: username });

        if (!user) {
            const errResponse = {
                response_code: 0,
                msg: Messages.SIMPLE_FAILED,
                resData: [],
                req,
                res
            };
            return responseHandler(errResponse);
        }

        const userPassword = user.pwd as string;

        if (password === userPassword) {

            const token = jwt.sign({ uid: user._id }, appSecret, { expiresIn: '1800s' });
            const successResponse = {
                response_code: 0,
                msg: Messages.SIMPLE_SUCCESS,
                resData: { token },
                req,
                res
            };
            
            return responseHandler(successResponse);

        } else {
            const errResponse = {
                response_code: 0,
                msg: Messages.SIMPLE_FAILED,
                resData: [],
                req,
                res
            };
            return responseHandler(errResponse);
        }
    } catch (error) {
        console.error('Login failed:', error);
        return res.status(500).send('Internal Server Error');
    }
});

export default router;
