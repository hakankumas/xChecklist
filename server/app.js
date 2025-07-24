const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));

// Routes
const profileRoutes = require("./routes/profile");
const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
const logRoutes = require("./routes/log");

app.use("/profile", profileRoutes);
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/log", logRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
