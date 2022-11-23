const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });

const DB = process.env.DATABASE ;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));