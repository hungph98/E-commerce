const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");
const cartRouter = require("./src/routes/cart");
const orderRouter = require("./src/routes/order");


app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("Connect database successfully!")
    })
    .catch((err) => {
        console.log(err)
    })


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`)
})