import express from "express";
import cors from "cors";
import actionroute from "./src/routes/index";
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import bodyParser from 'body-parser';

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));


const app = express();

app.use(cors());
app.use(bodyParser.json())

// app.use("/api/clear-db", func1);
// app.use("/api/create-card", func2);
// app.use("/api/query-cards", func3);

app.use('', actionroute);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sever is up on port ${port}.`);
});