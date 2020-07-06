/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "semantic-ui-react";
import Head from "../../components/Head";
import { Container } from "./Test.style";
import { NavBar } from "../Navigation";
// import { Layout } from "../Layout";

const items = [
  { content: "Home", key: "home", to: "/" },
  { content: "Posts", key: "posts", to: "/posts" },
  { content: "Todos", key: "todos", to: "/todos" },
];

function Test() {
  return (
    <>
      <Head title="T" />
      <NavBar leftItems={items} rightItems={items}>
        <Container>
          <h1>Test works again with muck</h1>
          <Button />
        </Container>
      </NavBar>
    </>
  );
}

export default Test;
