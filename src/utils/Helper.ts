import { Request, Response } from 'express'; 
import fs from 'fs'
import path from 'path'

// const logData = (data: string) => {
//     const { monthNameYear, dateYMD } = getCurrentDateFormatted();
//     const logsDir = path.join(__dirname, 'runtime/logs', monthNameYear);
//     const logFileName = `${dateYMD}.log`;
//     const logFilePath = path.join(logsDir, logFileName);

//     // Ensure the directory exists
//     fs.mkdirSync(logsDir, { recursive: true });

//     // Append the data to the log file, creating the file if it doesn't exist
//     fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${data}\n`, { encoding: 'utf-8' });

// };

interface ResponseData {
    response_code:number,
    msg:string,
    resData:any,
    req?:any,
    res?:any
}

export const responseHandler = (responseData: ResponseData) => {
    const { response_code, msg, resData, res } = responseData;

    res.status(200).send({ response_code:response_code, msg:msg, data: resData });

}

// function getCurrentDateFormatted(): { monthNameYear: string, dateYMD: string } {
//     const now = new Date();
//     const year = now.getFullYear();
//     const monthNames = ["January", "February", "March", "April", "May", "June",
//                         "July", "August", "September", "October", "November", "December"];
//     const monthName = monthNames[now.getMonth()];
//     const dateYMD = now.toISOString().split('T')[0]; // Formats to YYYY-MM-DD

//     return {
//         monthNameYear: `${monthName}-${year}`,
//         dateYMD,
//     };
// }



