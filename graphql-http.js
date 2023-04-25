const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http");
const serverless = require("serverless-http");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    console.log("hello");
    return "Hello world!";
  },
};

const app = express();
app.all("/graphql", createHandler({ schema, rootValue: root }));

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});

module.exports.handler = serverless(app);
