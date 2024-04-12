"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (responseData) => {
    const { response_code, msg, resData, res } = responseData;
    res.status(200).send({ response_code: response_code, msg: msg, data: resData });
};
exports.responseHandler = responseHandler;
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
