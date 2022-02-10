const mongoose = require("mongoose");
const supertest = require("supertest");
const serverExpress = require("../app");
const { Usuario } = require("../models");
const { usersPost, userPut, loginUser } = require("./initialUsers");

const api = supertest(serverExpress.app);

beforeAll(async ( ) => {
  await Usuario.deleteMany();
})

describe('CRUD Usuario, prueba: ', ( ) => {
   let uidUser1 = '';
   let uidUser2 = "";
   let token = '';

   //crear usuario, se hace un test por cada usuario del arreglo a crear
   usersPost.forEach(user => {
      test('Crear usuario', async ( ) => {
         const { body } = await api
            .post("/api/usuarios")
            .send(user)
            .expect(201);
         
         //se valida que la propiedad de uid venga en cada respuesta, así se sabe si se creó bien o no el usuario
         expect(body.usuario.uid).toBeDefined();
      });
   });

   //get usuarios, se obtienen todos los usuarios que deberían ser la misma cantidad que los recién creados
   test("obtener usuarios", async ( ) => {
      const { body } = await api
         .get("/api/usuarios")
         .expect(200)
         .expect("Content-Type", /application\/json/);

      expect(body.total).toBe(usersPost.length);
      expect(body.usuarios).toHaveLength(usersPost.length);

      //se extrae el uid de un par de usuarios para pruebas posteriores, el de la posición 0 es admin entonces es útil para el test de borrado
      //y el de la posición 1 sirve para ser borrado
      uidUser1 = body.usuarios[0].uid;
      uidUser2 = body.usuarios[1].uid;;
   });

   //se cambia la información de uno de los usuarios
   test("Modificar usuario", async ( ) => {
      const { body } = await api
         .put(`/api/usuarios/${uidUser1}`)
         .send(userPut)
         .expect(200)

      expect(body.usuario.uid).toBeDefined();
      //se valida que el nuevo nombre coincida con el que se envió en el body del put
      expect(body.usuario.nombre).toBe(userPut.nombre);
   });

   //se hace un login con el usuario admin para así obtener el token que permita hacer la petición de borrado más adelante
   test("Login de usuario", async () => {
      const { body } = await api
         .post(`/api/login`)
         .send(loginUser)
         .expect(200);

      expect(body.usuario).toBeDefined();
      expect(body.token).toBeDefined();
      //se extrae el token retornado en la respuesta
      token = body.token; 
   });

   //se borra un usuario y se envía el token capturado en el test de login
   test("Borrar usuario", async () => {
      const { body } = await api
         .delete(`/api/usuarios/${uidUser2}`)
         //se fija una cabecera con el nombre que nos interesa y se envía el token allí
         .set('x-token', token)
         .expect(200);

      expect(body.usuario).toBeDefined();
      //se valida que el estado del usuario eliminado si halla cambiado a falso
      expect(body.usuario.estado).toBe(false);
      expect(body.usuarioautenticado).toBeDefined();
      expect(body.usuarioautenticado.correo).toBe(loginUser.correo);
   });

   //se reconsultan todos los usuarios para así verificar que ahora hay uno menos que fue el que se borró
   test("obtener usuarios luego de borrar", async () => {
      const { body } = await api
         .get("/api/usuarios")
         .expect(200)
         .expect("Content-Type", /application\/json/);

      expect(body.total).toBe(usersPost.length-1);
      expect(body.usuarios).toHaveLength(usersPost.length-1);
   });
});


afterAll(( ) => {
   mongoose.connection.close();
   serverExpress.server.close();
})