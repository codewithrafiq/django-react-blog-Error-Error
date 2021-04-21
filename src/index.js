import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Root from "./Root";
import { createUploadLink } from "apollo-upload-client";

function omitTypename(key, value) {
  return key === "__typename" ? undefined : value;
}

const cleanTypenameFieldLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }

  return forward(operation);
});

const uri = "http://127.0.0.1:8000/graphql";
const uploadLink = createUploadLink({ uri });
const appLink = cleanTypenameFieldLink.concat(uploadLink);

// // Apollo client
// const client = new ApolloClient({
//   link: appLink,
//   cache: new InMemoryCache(),
//   credentials: "same-origin",
// });

const token = window.localStorage.getItem("token");
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const clientt = new ApolloClient({
  link: authLink.concat(appLink),
  cache: new InMemoryCache(),
  credentials: "same-origin",
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "http://127.0.0.1:8000/graphql",
  }),
});
ReactDOM.render(
  <ApolloProvider client={clientt}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
