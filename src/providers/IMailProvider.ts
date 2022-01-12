
interface IAddres {
    email: string;
    name: string;
}

export interface IMessage {
    to: IAddres;
    from: IAddres;
    subject: string;
    body: string;
}

export interface IMailProvider {
    sendMail(message: IMessage): Promise<void>
}