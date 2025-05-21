const socket = require("socket.io");

const initSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //handle events
    socket.on("joinChat", ({ firstName, toUserId, userId }) => {
      const roomId = [userId, toUserId].sort().join("_");
      socket.join(roomId);
      console.log(`${firstName} joined room with ${roomId}`);
    });

    socket.on("sendMessage", ({ firstName, userId, toUserId, text }) => {
      const roomId = [userId, toUserId].sort().join("_");
      console.log(`${firstName} says ${text} `);

      io.to(roomId).emit("messageReceived", { firstName, text });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};

module.exports = initSocket;
