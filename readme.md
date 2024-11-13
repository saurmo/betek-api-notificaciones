# API de notificaciones

## Comandos para crear el proyecto
- `npm init -y` : Inicializar el archivo package.json de forma rápida
- `tsc -init` : Inicializar el archivo tsconfig.json para la configuracion de typescript


## Instalar dependencias
- `npm i express config nodemailer`
- `npm i -D @types/express @types/config @types/nodemailer`


## Crear archivo .gitignore
Crear archivo `.gitignore` para ignorar los archivo que no quiero subir al repositorio

## Crear la estructura de carpetas
> https://www.hackio.com/blog/que-es-arquitectura-hexagonal-en-programacion?amp

|
|-config  : Archivos de configuración del proyecto
|-src : Código de la aplicación
|-- applicacion
|-- infrastructure
|-- domain
|-tests : Pruebas unitarias

## Crear script en el package.json
` "dev": "nodemon -e ts,json --exec 'ts-node index.ts' " `