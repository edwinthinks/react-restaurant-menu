import React, { useState, useEffect } from "react";
import TodoList from './TodoList.jsx';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: 'https://hasura-playtime.herokuapp.com/v1/graphql',
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
