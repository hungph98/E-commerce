const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");


app.use(express.json());

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("Connect database successfully!")
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(process.env.PORT, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`)
})