//-- El nombre de este archivo es el singular del modelo de datos en mongo
//-- en este caso ese modelo se llama roles
const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
   rol: {
      type: "string",
      required: [true, "el rol es obligatorio"],
   },
});

module.exports = model("Role", RoleSchema);
