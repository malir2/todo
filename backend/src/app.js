import express from "express";
import postRouter from "./router/postRoute.js";
import session from "express-session";
import userRouter from "./router/userRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "http://localhost:5173" }));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production with HTTPS
  })
);

app.use("/api/v1/todo", postRouter);
app.use("/api/v1/user", userRouter);

export default app;
