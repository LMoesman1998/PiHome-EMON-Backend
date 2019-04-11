import { ApolloServer, gql } from 'apollo-server';

import schemaGraphQL from './graphql/schema';
import resolvers from './graphql/resolvers';

const typeDefs = gql`${schemaGraphQL}`;
const introspection = true;
const playground = true;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection,
  playground
});

const initServer = async () => {
  server.listen({ port: 3596 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

initServer();