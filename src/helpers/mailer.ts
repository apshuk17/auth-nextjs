import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { EmailType } from './interfaces';



export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === EmailType.VERIFY) {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        } else if (emailType === EmailType.RESET) {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiree: Date.now() + 3600000
            });
        }


        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: 'apoorva@xyz.com',
            to: email,
            subject: emailType === EmailType.VERIFY ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
             ${emailType === EmailType.VERIFY ? 'verify your email' : 'reset your password'}.<br /> OR copy and 
             paste this URL in your browser. ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (err: any) {
        throw new Error(err.message);
    }
}
