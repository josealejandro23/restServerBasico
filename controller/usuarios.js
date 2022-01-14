//--como en este punto no se sabe de qué tipo es res o req entonces se importa el paquete de express para que vsc sepa el tipo de dato
const { response, request } = require("express");

const getUsuarios = (req = request, res = response) => {
   //se leen los parámetros que vienen en url
   const { id } = req.params;
   //se leen los querys que vienen en la url
   const { apikey, lang, nombre = "no disponible" } = req.query;
   if (!id) data = "No se indicó el id";
   else data = Number(id);
   res.json({
      mensaje: "api get - controller",
      data,
      query: {
         apikey,
         lang,
         nombre,
      },
   });
};

const postUsuarios = (req = request, res = response) => {
   let { nombre, edad } = req.body;
   res.json({
      nombre,
      edad,
      mensaje: "api post - controller",
   });
};

const putUsuarios = (req, res = response) => {
   res.json({
      mensaje: "api put - controller",
      body: req.body,
   });
};

const deleteUsuarios = (req, res = response) => {
   res.json({
      mensaje: "api delete - controller",
   });
};

module.exports = {
   getUsuarios,
   postUsuarios,
   putUsuarios,
   deleteUsuarios,
};
