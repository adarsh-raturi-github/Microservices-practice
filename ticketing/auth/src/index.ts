import express from "express";
import {
  currentUserRouter,
  signInUserRouter,
  signOutRouter,
  signUpRouter,
} from "./routes";
const app = express();
import { errorHandlerMiddleware } from "./middlewares";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);
app.use(signInUserRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);
app.use(errorHandlerMiddleware);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not found");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-cluster-ip-srv:27017/auth");
  } catch (err) {
    console.log(err);
  }

  console.log("connect to db");
  app.listen(3000, () => {
    console.log("Auth service started on port 3000!!!");
  });
};
start();
