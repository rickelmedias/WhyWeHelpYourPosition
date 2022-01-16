require('dotenv/config');
import nodemailer from 'nodemailer';

describe('Testing mailtrapper credentials', () => {
    it ('should not able send mailtrap because the .env user and pass are INVALID credentials', async () => {
        const transporter = await transporterCreate("smtp.mailtrap.io", 2525, "", "");
        const response = await trySendMail(transporter);        

        expect(response).toEqual(`Missing credentials for "PLAIN"`);
    });

    it ('should able send mailtrap because the .env user and pass are VALID credentials', async () => {
        const transporter = await transporterCreate("smtp.mailtrap.io", 2525, process.env.MAIL_USER, process.env.MAIL_PASS);
        const response = await trySendMail(transporter);        

        const res_status = response.response.substring(0,3);
        expect(res_status).toEqual('250');
    });
});

// Functions to use to test MailTrap.io

async function trySendMail(transporter: nodemailer.Transporter) {
    try {
        return ( 
            await transporter.sendMail({
            to: {
                name: "message to name",
                address: "message_to@teste.com"
            },
            from: {
                name: "message from name",
                address: "message_from@teste.com"
            },
            subject: "Subject Test",
            html: "Testing message body."
            }));
    }
    catch (e) {
        return e.message;
    }
}

async function transporterCreate(host: string, port: number, user: string, pass: string) {
    return (
        await nodemailer.createTransport({
        host: host,
        port: port,
        auth: {
            user: user,
            pass: pass
            }
        })
    );
}