import mongo from './mongo.js'
import db from './models/Mongodb.js'
import { GraphQLServer, PubSub } from 'graphql-yoga';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import ChatBox from './resolvers/ChatBox.js';
import Message from './resolvers/Message.js';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Mutation,
    Subscription,
    ChatBox,
    Message
  },
  context: {
    db,
    pubsub,
  },
});

mongo();
server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});
