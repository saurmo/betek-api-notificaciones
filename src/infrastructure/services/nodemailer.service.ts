
import nodemailer from 'nodemailer'
import config from 'config'
import { MailOptions } from 'nodemailer/lib/ses-transport'
import { EmailOptions } from '../../domain/EmailOptions'
export class NodemailerEmailService {


    sendEmail(options: EmailOptions) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get('smtp.user'),
                pass: config.get('smtp.pass')
            }
        })

        const attachments = []
        if (options.pdf) {
            attachments.push({
                filename: 'Reporte.pdf',
                content: options.pdf
            })
        }

        const mailOptions: MailOptions = {
            from: 'Santiago - saurmo0108@gmail.com',
            to: options.to,
            subject: options.subject,
            html: options.body,
            attachments
        }
        return transporter.sendMail(mailOptions)
    }
}