const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

// route / request handler

// app.use("/admin", (req, res, next) => {
//     //   next();
//     return res.send("Hello from the server....");
//   });

// app.get("/admin/getAllData", (req, res, next) => {
//   //   next();
//   return res.send("Hello from the server....");
// });

// app.get("/admin/deleteUser", (req, res, next) => {
//   // next();
//   return res.send("User Deleted from the server....");
// });
// app.get('/ping', (req,res) => {
//     return res.send('Pong')
// })
// app.use("/hello", (req, res) => {
//   return res.send("Hello hello from the server....");
// });
// app.use("/", (req, res) => {
//   return res.send("Hello ....");
// });

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Flash",
    lastName: "India",
    emailId: "flash@india.in",
  });

  try {
    await user.save();
    res.send("User Saved Successfully");
  } catch (error) {
    res.status(400).send("Errior saving user");
  }
});

connectDB()
  .then(() => {
    console.log("Connected.....");
    app.listen(3000, () => console.log("Server is running on port 3000...."));
  })
  .catch((err) => {
    console.error("Error in db connection", err);
  });
