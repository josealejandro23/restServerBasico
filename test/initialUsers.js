const users = [
   {
      nombre: "test1",
      correo: "test1@test.com",
      rol: "USER",
      password: "123456",
      google: false,
   },
   {
      nombre: "test2",
      correo: "test2@test.com",
      rol: "USER",
      password: "123456",
      google: false,
   },
   {
      nombre: "test3",
      correo: "test3@test.com",
      rol: "USER",
      password: "123456",
      google: false,
   },
];

const usersPost = [
   {
      nombre: "test4",
      correo: "test4@test.com",
      rol: "ADMIN",
      password: "123456",
      google: false,
   },
   {
      nombre: "test5",
      correo: "test5@test.com",
      rol: "USER",
      password: "123456",
      google: false,
   },
   {
      nombre: "test6",
      correo: "test6@test.com",
      rol: "USER",
      password: "123456",
      google: false,
   },
];

const userPut = {
   nombre: "alejandro",
   correo: "alejo@test.com",
   rol: "ADMIN",
   password: "123456",
   google: false,
}

const loginUser = {
   correo: "test4@test.com",
   password: "123456",
};

module.exports = { users, usersPost, userPut, loginUser };