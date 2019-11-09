require("dotenv").config();
require("express-async-errors");
const server = require("./api/server");

const PORT = process.env.PORT || 5000;

const http = require("http").createServer(server);
const io = require("socket.io")(http);

const clients = {};

io.on("connection", socket => {
  console.log("New connection id: " + socket.id);

  socket.on("join", data => {
    console.log("received", data);
    clients[data.id] = socket.id;
    console.log(clients);
  });

  socket.on("send notification", data => {
    data.userIds.forEach(id => {
      const socketid = clients[id];
      console.log("send notification");
      io.to(socketid).emit("new notification", data);
      // if the user is online lets find his socket id,
    });
  });

  socket.on("send invite", data => {
    data.userIds.forEach(id => {
      const socketid = clients[id];
      console.log("send invite");
      io.to(socketid).emit("new invite", data);
      // if the user is online lets find his socket id,
    });
  });

  socket.on("reply", data => {
    console.log("reply::::::::::::::::::::::::", data);
    // data.userIds.forEach
  });

  socket.on("disconnect", () => {
    console.log("disconnected id: " + socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`\n* Server Running on port ${PORT} *\n`);
});
