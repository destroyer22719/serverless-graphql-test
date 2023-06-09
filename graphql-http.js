const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
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
    return "Hello world!";
  },
};

const app = express();
app.use("/graphql", createHandler({ schema, rootValue: root }));

app.listen(3000, () => {
  console.log(
    "Running a GraphQL API server at http://localhost:3000/graphql graphql-http"
  );
});

module.exports.handler = serverless(app);
