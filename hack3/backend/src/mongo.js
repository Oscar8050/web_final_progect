import mongoose from "mongoose";
import { dataInit } from "./upload.js";

//import "dotenv-defaults/config.js";
import dotenv from "dotenv-defaults";

async function connect() {
  dotenv.config();
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

const db = mongoose.connection

db.once("open", () => {
    console.log("Mongo database connected!");
  });
  // TODO 1.1 Connect your MongoDB
}

export default { connect };