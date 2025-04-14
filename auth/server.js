import "./config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

//route imports
import signup_r from "./routes/signup.route.js";
import login_r from "./routes/login.route.js";
import refresh_r from "./routes/refresh.route.js";

//env data
const connection_str = process.env.connection_str;
const PORT = process.env.PORT || 3000;

await mongoose.connect(connection_str);

//express
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

//route
app.use("/", signup_r);
app.use("/", login_r);
app.use("/", refresh_r);

app.listen(PORT, () => console.log("server"));
