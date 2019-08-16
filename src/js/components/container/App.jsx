import React, { useState, useEffect } from "react";
import TodoList from './TodoList.jsx';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: 'https://hasura-playtime.herokuapp.com/v1/graphql'
});

const wsLink = new WebSocketLink({
  uri: `wss://hasura-playtime.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <TodoList/>
      </ApolloProvider>
    </>
  )
}

export default App
