import mongoose from "mongoose";
import "dotenv-defaults/config.js";

async function connect() {
  if(!process.env.MONGO_URL){
    console.error("missing mongoose");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((res) => console.log("mongo db connection created"));
}

export default { connect };