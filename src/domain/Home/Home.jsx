/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import styles from "./home.scss";

import { Layout } from "../Layout";
import { FormUI } from "../../components";
import Head from "../../components/Head";
import * as Styles from "./Home.style";

// eslint-disable-next-line react/prop-types
const Home = () => (
  <Layout>
    <Head title="Home" />
    <h1 className={styles.red}>Home Screen</h1>
    <Styles.StyledContainer>
      <FormUI />
    </Styles.StyledContainer>
  </Layout>
);

export default Home;
