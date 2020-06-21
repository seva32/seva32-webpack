/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Helmet } from "react-helmet-async";
// import styles from "./home.scss";

import { Layout } from "../Layout";
import { FormUI } from "../../components";
import * as Styles from "./Home.style";

// eslint-disable-next-line react/prop-types
const Home = () => (
  <Layout>
    <Helmet>
      <title>Ho!</title>
      <link rel="canonical" href="https://www.example.com/" />
    </Helmet>
    {/* <h1 className={styles.red}>Home</h1> */}
    <h1>Home Page</h1>
    <Styles.StyledContainer>
      <FormUI />
    </Styles.StyledContainer>
  </Layout>
);

export default Home;
