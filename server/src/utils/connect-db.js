import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

const connectDb = () => {
  const URL = MONGO_URL;
  mongoose
    .connect(URL)
    .then(() => {
      console.log("DB connected Successfully");
    })
    .catch((err) => {
      console.log("Db connection failed");
    });
};

export default connectDb;