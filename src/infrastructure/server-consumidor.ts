import amqp, { Channel, ConsumeMessage } from "amqplib";
import { NodemailerEmailService } from "./services/nodemailer.service";
import { EmailOptions } from "../domain/EmailOptions";

const conectarMq = async () => {
    try {
        const url: string = "amqp://localhost";
        const conexion = await amqp.connect(url);
        console.log("Conectado a MQ");

        const channel = await conexion.createChannel();
        console.log("Creación del canal - Habilitado para crear colas.");

        const nombraCola = "notificaciones";
        channel.assertQueue(nombraCola, { durable: true });

        const nombraColas = "pedidos";
        channel.assertQueue(nombraColas, { durable: true });
        return channel;
    } catch (error) {
        console.log(error);
    }
};

const consumirMensajes = async (channel: Channel) => {
    try {
        const resultado = await channel.consume("notificaciones", (message: ConsumeMessage | null) => {
            if (message) {
                console.log("Mensaje recibido");
                const payload = JSON.parse(message.content.toString())
                const pdf = payload.pdf ? Buffer.from(payload.pdf, 'base64') : undefined

                const mailService = new NodemailerEmailService()
                const options: EmailOptions = {
                    to: payload.to,
                    subject: payload.subject,
                    body: payload.body,
                    pdf
                }
                mailService.sendEmail(options).then(() => {
                    console.log('El correo se envio');
                }).catch(error => {
                    console.error('El correo NO se envio', error);
                })
                // Confirmación de lectura del mensaje en la MQ
                channel.ack(message)
            } else {
                console.log("No hay mensaje");
            }
        });
        console.log(resultado);

    } catch (error) { }
};

export const consumerMqNotifications = async () => {
    const channel = await conectarMq();
    if (channel) {
        consumirMensajes(channel);
    }
};