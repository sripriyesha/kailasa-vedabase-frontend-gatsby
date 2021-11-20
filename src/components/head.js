import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Head = ({ title }) => {
  return (
    <Helmet
      title={title}
    />
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
};

Head.defaultProps = {
  title: null,
};