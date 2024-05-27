const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_user',
        pass: 'your_app_password'
    }
});


exports.sendEmail = (email, otp) => {
    var mailOptions = {
        from: 'your_email',
        to: email,
        subject: 'Petuk',
        text: otp
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

