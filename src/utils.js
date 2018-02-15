import { createApolloFetch } from 'apollo-fetch'

const uri = 'https://api.wpgraphql.com/graphql';
export const apolloFetch = createApolloFetch({ uri });