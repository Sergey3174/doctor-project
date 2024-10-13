const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const cors = require("cors");
const apiRouter = require("./routes/api");

const { loginUser } = require("./users.controller");
const { addApplication, getApplications } = require("./application.controller");

const port = 3000;
const app = express();

app.set("views", "public");
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.json({ message: "ok" });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    await addApplication(
      req.body.name,
      req.body.telephone,
      req.body.description
    );
    res.json();
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.json();
});

app.use("/api", auth, apiRouter);

app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

mongoose
  .connect(
    "mongodb+srv://sergey:sL95QnMuhLOL8GSC@cluster0.flwoy.mongodb.net/doctor_app?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started ${port}`));
    });
  });
