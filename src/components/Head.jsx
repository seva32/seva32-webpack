import React from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Head = ({ title }) => (
  <Helmet key={Math.random()}>
    <title>Seva32 {title}</title>
    <meta property="og:title" content="SSR Daily News - ilker ALTIN" />
    <meta
      name="description"
      content="Breaking news,latest articles, popular articles"
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://sebastianfantini.com" />
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string,
};

Head.defaultProps = {
  title: ""
};

export default Head;
