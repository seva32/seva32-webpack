/* eslint-disable wrap-iife */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import loadData from "../../utils/fetch/loadData";
import requireAuth from "../../components/Auth/requireAuth";
import { Layout } from "../Layout";

function Todos(props) {
  const [todosArr, setTodosArr] = useState([]);
  useEffect(() => {
    if (props.staticContext && props.staticContext.data.todos) {
      setTodosArr([...todosArr, ...props.staticContext.data.todos]);
    } else if (
      typeof window !== "undefined" &&
      window.__ROUTE_DATA__ &&
      window.__ROUTE_DATA__.todos
    ) {
      setTodosArr([...todosArr, ...window.__ROUTE_DATA__.todos]);
      delete window.__ROUTE_DATA__;
    } else {
      (async function load() {
        const data = await loadData("todos");
        setTodosArr([...todosArr, ...data]);
      })();
    }
  // eslint-disable-next-line react/destructuring-assignment
  }, [props.staticContext, todosArr]);
  return (
    <Layout>
      <Helmet>
        <title>Todos</title>
      </Helmet>
      <ul>
        {todosArr.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </Layout>
  );
}

export default requireAuth(Todos);
