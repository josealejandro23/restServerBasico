const mongoose = require("mongoose");
const supertest = require("supertest");
const serverExpress = require("../app");
const { users, usersPost, userPost } = require("./initialUsers");
const {Usuario} = require('../models')

const api = supertest(serverExpress.app);

// antes de cada test ejecutar el siguiente bloque
beforeAll(async () => {
   //eliminar toda la data previa
   await Usuario.deleteMany();
})

describe('creación de un usuario', ( ) => {
   //se realiza un test por cada petición post con cada usuario a crear
   usersPost.forEach(user => {
      test('crear usuario', async ( ) => {
         const response = await api
            .post("/api/usuarios")
            .send(user)
            .expect(200)
            .expect("Content-Type", /application\/json/);
   
         expect(response.body.usuario.uid).toBeDefined();
      })
   });
});

afterAll(( ) => {
   mongoose.connection.close();
   serverExpress.server.close();
})