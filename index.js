import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './db.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import ChatBox from './resolvers/ChatBox.js';
import Message from './resolvers/Message.js';
import Letter from './resolvers/Letter.js';
import mongo from './mongo.js';

mongo();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
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

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
