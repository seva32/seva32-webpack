import React from "react";
import { Helmet } from "react-helmet-async";
import Status from "../../components/Status/Status";
import imgPath from "../../assets/images/notfound.png";
import * as Styles from "./NotFound.style";
import { Layout } from "../Layout";

const NotFound = () => (
  <Layout>
    <Helmet>
      <title>Todos</title>
    </Helmet>
    <Status status={404}>
      <Styles.StyledContainer img={imgPath} />
    </Status>
  </Layout>
);

export default NotFound;
