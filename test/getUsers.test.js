const mongoose = require("mongoose");
const supertest = require("supertest");
const serverExpress = require("../app");
const {Usuario} = require('../models');
const { users, usersPost } = require("./initialUsers");

//función a testear
const sumar = (a, b) => {
   return a + b;
};

const pruebas = [
   { a: 1, b: 2, result: 3 },
   { a: 5, b: 4, result: 9 },
   { a: 3, b: 5, result: 8 },
];

//se llama la función test encargada de testear la función de interés
//describe solo agrupa un conjunto de test bajo un nombre común
// describe('prueba de suma', ( ) => {
//    pruebas.forEach(({ a, b, result }) => {
//       //se pasa un nombre al test, y se llama en el callback la función a testear
//       test(`suma de ${a} + ${b} = ${result}`, () => {
//          const val = sumar(a, b);
//          //se valida que el resultado obtenido sea igual al esperado
//          expect(val).toBe(result);
//       });
//    });
// });

const api = supertest(serverExpress.app);

// antes de cada test ejecutar el siguiente bloque
// beforeEach(async () => {
   //eliminar toda la data previa
//    await Usuario.deleteMany();

   // este método no asegura que la información se guarde en orden debe usarse el ciclo for of
//    users.forEach(async user => {
//       let newUser = new Usuario(user);
//       await newUser.save();
//    })

   //debe hacerse así para poder guardar en orden los usuarios ya que el save es asíncrono y usar la manera anterior con await no bloquearía el código
//    for (const user of users) {
//       const usuario = new Usuario(user);
//       await usuario.save();
//    }
// })

describe('testing tipo de datos, longitud de respuesta y longitud de info en la db' , ( ) => {
   test("validar que el response sea JSON", async () => {
      await api
         .get("/api/usuarios")
         .expect(200)
         .expect("Content-Type", /application\/json/);
   }, 20000);

   test("validar que la estructura de respuesta sea correcta", async () => {
      const response = await api.get("/api/usuarios");
      expect(Object.keys(response.body)).toHaveLength(2);
   }, 20000);

   test("validar que la longitud de los datos sea correcta", async () => {
      const response = await api.get("/api/usuarios");
      expect(response.body.usuarios).toHaveLength(usersPost.length);
   }, 20000);
});

//este bloque se ejecuta al finalizar todos los test
afterAll(() => {
   mongoose.connection.close();
   serverExpress.server.close();
});
