const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465, // veya 587 (TLS)
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function send_mail(condition) {
    const { email, subject, message, profile_id, step_no } = condition;
    const mailOptions = {
        from: `"Adanet Dijital Reklam Ajansı" ${process.env.MAIL_USER}`,
        to: email,
        subject: subject,
        text: message,
        attachments: [
            {
                filename: `${profile_id}-${step_no}.pdf`,
                path: `./public/pdf/${profile_id}-${step_no}.pdf`,
            },
        ],
    };

    return transporter.sendMail(mailOptions);
}

module.exports = send_mail;
