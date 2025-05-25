const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, toUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, toUserId].sort().join("$"))
    .digest("hex");
};

const initSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //handle events
    socket.on("joinChat", ({ firstName, userId, toUserId }) => {
      const roomId = getSecretRoomId(userId, toUserId);
      socket.join(roomId);
      console.log(`${firstName} joined room with ${roomId}`);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, toUserId,  text }) => {
        try {
          const roomId = getSecretRoomId(userId, toUserId);
          console.log(`${firstName} says ${text} `);

          //TODO: check of both users are connected

          let chat = await Chat.findOne({
            participants: {
              $all: [userId, toUserId],
            },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, toUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
          });
        } catch (error) {
          console.log("Error ", error);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};

module.exports = initSocket;
