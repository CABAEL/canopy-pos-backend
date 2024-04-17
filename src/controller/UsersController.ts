import express from 'express'
import User from '../model/User'
import { responseHandler,errResponse,successResponse} from '../utils/Helper';

const router = express.Router()

router.get('/list', async (req, res) => {

    try {

        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10


        const show_only_this = {
            fname:1,
            mname:1,
            lname:1,
            usrn:1,
            email:1,
            contact_num:1,
            created_by:1,
            created_at:1,
        } 

        const skip = (page - 1) * limit

        const users = await User.find({},show_only_this).skip(skip).limit(limit)

        successResponse.resData = users

        responseHandler(successResponse,req,res);

    } catch (error) {

        console.error('Error fetching paginated users:', error)
        res.status(500).json({ error: 'Internal Server Error' })
        
    }

})

export default router