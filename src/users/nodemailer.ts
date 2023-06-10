import Nodemailer from 'nodemailer'
// var smtpTransport = require('nodemailer-smtp-transport');


export function sendEmailTechnician(params = {}) {
    Nodemailer.createTestAccount((err, account) => {
        let transporter = Nodemailer.createTransport({
            host: "mail.smtp2go.com",
            service: 'smtp2go',
            port: 587, // 8025, 587 and 25 can also be used.
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.PASS
            },
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: process.env.FROM_EMAIL,
            ...params
        };
        transporter.sendMail({ ...mailOptions }, (error, info) => {
            if (error) {
                return console.log('error------', error);
            }
            // console.log('Message sent: %s', info.messageId);
            // console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
        });
    })
}