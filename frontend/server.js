import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { importSchema } from "graphql-import";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import * as db from "./backend/src/db.js";
import Query from "./backend/src/resolvers/Query.js";
import Mutation from "./backend/src/resolvers/Mutation.js";
import Subscription from "./backend/src/resolvers/Subscription.js";
import ChatBox from './backend/src/resolvers/ChatBox.js';
import Message from './backend/src/resolvers/Message.js';
import Letter from './backend/src/resolvers/Letter.js';
import mongo from "./backend/src/mongo.js";
//import apiRoute from "./backend/src/route/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/src/schema.graphql");
const pubsub = new PubSub();
const app = express();

app.use(cors());
//app.use("/api", apiRoute);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = new ApolloServer({
    typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    ChatBox,
    Message,
    Letter,
  },
  context: {
    db,
    pubsub,
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});