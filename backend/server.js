import express from 'express'
import cors from 'cors'
import mongo from "./mongo.js";
import create from './check.js'
import "dotenv-defaults/config.js";

const app = express()

// init middleware
app.use(cors())

// define routes
app.use('/api/create', create)

mongo.connect();

// define server
const port = process.env.PORT || 5000

/*server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});*/

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
}) 