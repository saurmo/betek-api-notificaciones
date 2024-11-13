import express, { Request, Response } from "express";
import { NodemailerEmailService } from "../services/nodemailer.service";

const router = express.Router()

router.post('/api/v1/notificaciones/correo', (request: Request, response: Response) => {

    const payload = request.body

    //TODO: Validar el body (to, subject, email)
    const mailService = new NodemailerEmailService()
    
    // TODO: Guardar en base de datos el resultado del envio de correo (Solucion enviada o solución con error)
    mailService.sendEmail(payload.to, payload.subject, payload.body).then(() => {
        console.log('El correo se envio');
    }).catch(error => {
        console.error('El correo NO se envio', error);
    })


    response.json({
        ok: true,
        message: 'Solicitud de envio de correo aceptada'
    })


})


export default router