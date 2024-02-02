import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "f13f6ed34406b0",
        pass: "4671b13859ff1a"
    }
});

export class NodemailMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Jackson Arceno <jackson.f205@gmail.com>',
            subject,
            html: body,
        })
    }
}