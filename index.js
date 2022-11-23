const express = require("express");
const mongoose = require("mongoose");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router")
require("./db/connection");

require("dotenv").config();

const app = express();

const port =process.env.PORT|| 8003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("server start")
})

app.use(router)
app.listen(port, () => {
    console.log(`server is start port number ${port}`);
})