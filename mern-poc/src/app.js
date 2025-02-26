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
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    password: req.body.password,
  });

  try {
    await user.save();
    res.send("User Saved Successfully");
  } catch (error) {
    res.status(400).send(`Errior saving user: ${error}`);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {}
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    // const user = await User.findOne({ emailId: req.body.emailId });

    if (user.length === 0) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {}
});

app.patch('/user', async (req, res) => {
    const userDetails = req.body;
    try {
      console.log('', userDetails);
      const user = await User.findByIdAndUpdate({ _id: userDetails.userId}, userDetails);
      console.log("User----->", user);
      res.send(user);
      
    } catch (error) {
        console.log("Error ", error);
        
    }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    // const user = await User.findByIdAndDelete({_id: userId});
    res.status(200).send("User Deleted Successfully");
  } catch (error) {}
});
connectDB()
  .then(() => {
    console.log("Connected.....");
    app.listen(3000, () => console.log("Server is running on port 3000...."));
  })
  .catch((err) => {
    console.error("Error in db connection", err);
  });
