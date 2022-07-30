require("dotenv").config();

const workoutRoutes = require("./routes/workouts");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("cooncted to db & Running on ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Eror in connection", error);
  });
