/*@author: Moeid Heidari
Description: used to send email to user.
*/
const _ = require('lodash');
const nodemailer = require('nodemailer');
const config = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'moied3d@gmail.com',
        pass: '903048555'
    }
};
const transporter = nodemailer.createTransport(config);
const defaultMail = {
    from: 'moied3d@gmail.com',
    text: 'test text',
};
//======================================================================================================================
/*@author: Moeid Heidari
Description: define and export a function used to send email outside the file.
*/
module.exports = function (mail) {
    transporter.sendMail(mail, function (error, info) {
        if (error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};