const { response } = require("express");

const validarArchivoSubir = (req, res = response, next) => {
   //se valida que sí se reciban archivos
   if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({ msg: "No se han recibido archivos. archivo - validarArchivo" });
      return;
   }

   next();
};

module.exports = { validarArchivoSubir };
