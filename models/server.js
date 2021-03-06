const {Server} = require('http');
const express = require("express");
var cors = require("cors");
const fileUpload = require('express-fileupload');
require("colors");

const { dbConnection } = require("../database/config");
class ServidorSencillo {
   constructor() {
      this.server = new Server();
      this.port = process.env.PORT,
      this.app = express(),
      this.paths = {
         pathUsuarios : "/api/usuarios",
         pathLogin :    "/api/login", 
         categorias :   "/api/categorias",
         productos :    "/api/producto",
         bucar :        "/api/buscar",
         buscarXCategoria: "/api/categoria" ,
         uploads        :"/api/uploads"
      }
      //middlewares
      this.middlewares();
      //rutas de la aplicación
      this.rutas();
   }

   middlewares() {
      //se usa el paquete de cors para configurar esta característica del server
      this.app.use(cors());
      //se configura el middleware para usar el json que viene en los bodys de las peticiones
      this.app.use(express.json());
      //se sirve el index.html de la carpeta public cuando se llama al server sin path en el url
      this.app.use(express.static("public"));
      //carga de archivos
      this.app.use(fileUpload({
         useTempFiles: true,
         tempFileDir: "/tmp/",
         createParentPath : true //permite que se cree un directorio de almacenamiento si no existe
         })
      );
   }

   rutas() {
      //al usar el sgte middleware indico que cuando se llame a la ruta api/usuarios se dirijan las peticiones
      //al objeto de ruta del archivo y allí se manejará la respuesta
      this.app.use(this.paths.pathLogin, require('../routes/login'));
      this.app.use(this.paths.pathUsuarios, require("../routes/usuarios"));
      this.app.use(this.paths.categorias, require("../routes/categorias"));
      this.app.use(this.paths.productos, require("../routes/productos"));
      this.app.use(this.paths.bucar, require("../routes/buscar"));
      this.app.use(this.paths.buscarXCategoria, require("../routes/buscarPorCategoria"));
      this.app.use(this.paths.uploads, require("../routes/uploads"));
   }

   inicio() {
      this.server = this.app.listen(this.port, async () => {
         await dbConnection();
         console.log("Server corriendo en", this.port.toString().green);
      });
   }
}

module.exports = ServidorSencillo;