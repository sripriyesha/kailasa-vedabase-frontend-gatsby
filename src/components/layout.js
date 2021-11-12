import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, seo }) => (
  <>
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;