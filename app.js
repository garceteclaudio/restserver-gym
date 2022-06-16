const Server = require("./models/server");

require("dotenv").config();


const server = new Server();
server.listen();

//https://restserver-gym.herokuapp.com//api/usuarios/get?q=hola&apellido=Garcetex