const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    mobile: Number,
    work: String,
    address: String,
    description: String
});

const users = new mongoose.model("users", userSchema);

module.exports = users;