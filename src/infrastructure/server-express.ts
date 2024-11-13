
import express from "express";
import router from "./routes/index.router";


export const createServerExpress = () => {

    const app = express()

    // Configuraciones
    // -- Middleware para recibir los json ---
    app.use(express.json())

    // Rutas del api
    app.use(router)

    // TODO: Middlewade 404 -> Not Found - si no encuentra una ruta


    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
        console.log(`Api de notificaciones ejecutandose en http://localhost:${PORT}`);
    })

}


