const nodemailer = require('nodemailer');

const sendEmail = async (option)=> {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        
        logger: true,
        debug: true
    });

    // Define Email Options
    const emailOptions = {
        from: 'Cineflex support<support@cineflix.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages.");
        }
    });
    
    await transporter.sendMail(emailOptions)
};

module.exports = sendEmail;