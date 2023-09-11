const { io } = require("../index");

let users = [];

users.push({
  id: "1",
  alias: "mama",
  gender: 2,
  punto: 0
});

users.push({
  id: "2",
  alias: "papa",
  gender: 2,
  punto: 0
});
users.push({
  id: "3",
  alias: "abuela genny",
  gender: 2,
  punto: 0
});
users.push({
  id: "4",
  alias: "abuela  yanira",
  gender: 2,
  punto: 0
});
users.push({
  id: "5",
  alias: "abuelo Enrique",
  gender: 2,
  punto: 0
});
users.push({
  id: "6",
  alias: "abuelo Angel",
  gender: 2,
  punto: 0
});

// Mensajes de Sockets
io.on("connection", client => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", payload => {
    console.log("Mensaje", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" + payload });
  });

  client.on("getUsers", payload => {
    io.emit("newUser", users);
  });
  client.on("inicioJugador", payload => {
    console.log("inicioJugador", payload);
    const [id, genero] = payload.split(",");
    users = users.map(function(user) {
      if (user.id == id) {
        user = {
          ...user,
          gender: parseInt(genero)
        };
      }
      return user;
    });
    io.emit("newUser", users);
  });
  client.on("puntos", payload => {
    const { id, puntos } = payload;
    let total = 0;
    let elu ;
    users = users.map(function(user) {
      if (user.id == id) {
        elu = user;
        total = user.punto + puntos;
        user = {
          ...user,
          punto: total
        };
      }
      return user;
    });

    if (total > 20) {
        console.log('ganador',elu   )
      io.emit("ganador", elu);
    }else{
        io.emit("newUser", users);
    }
  });
});

setInterval(() => {
  const bebes = [];
  for (let i = 0; i < 29; i++) {
    bebes.push({
      x: Math.floor(Math.random() * 8), // Genera un número aleatorio entre 0 y 7
      y: Math.floor(Math.random() * 11), // Genera un número aleatorio entre 0 y 11
      gender: Math.floor(Math.random() * 3) // Genera un número aleatorio entre 0 y 2
    });
  }
  io.emit("bebes", bebes);
}, 10000);
