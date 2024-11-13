
import nodemailer from 'nodemailer'
import config from 'config'
import { MailOptions } from 'nodemailer/lib/ses-transport'
export class NodemailerEmailService {


    sendEmail(to: string, subject: string, body: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get('smtp.user'),
                pass: config.get('smtp.pass')
            }
        })
     
        
        const mailOptions: MailOptions = {
            from: 'Santiago - saurmo0108@gmail.com',
            to,
            subject,
            text: body
        }
        return transporter.sendMail(mailOptions)
    }
}