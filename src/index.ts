import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";

import userTypeDef from "./typeDefs/user.typeDef.js";
import transactionTypeDef from "./typeDefs/transaction.typeDef.js";
import userResolver from "./resolvers/user.resolver.js";
import transactionResolver from "./resolvers/transaction.resolver.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import colors from "colors";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);
const mergedResolvers = mergeResolvers([transactionResolver, userResolver]);

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  
});

await server.start();

app.use(
  "/graphql",
  cors({
    origin: "*",
    credentials: true,
  }),

  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(colors.bgCyan(`🚀 Server ready at http://localhost:4000/graphql`));
