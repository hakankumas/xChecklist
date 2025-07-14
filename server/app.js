const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

app.get("/", (req, res) => {});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.SERVER_URL}`);
});
