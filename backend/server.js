//import express from 'express'
import cors from 'cors'
import create from './generate'
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import letterModel from "./models/letter.js";
import mongo from "./mongo.js";
import "dotenv-defaults/config.js";

const express = require('express')
//const expressGraphQL = require('express-graphql')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')

const app = express()

// init middleware
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// define routes
app.use('/api/create', create)

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    letterModel,
    pubSub,
  },
});

mongo.connect();

// define server
const port = process.env.PORT || 4000

/*server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});*/

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
}) 