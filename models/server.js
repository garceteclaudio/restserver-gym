const express = require('express');
var cors = require('cors');
const { dbConection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares: una funcion que se ejecuta antes de llamar el controlador o seguir con las ejecuciones de las peticinoes
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto:", this.port)
        })
    }

}

module.exports = Server;