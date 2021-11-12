import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
// import Nav from "./nav";
// import Head from "./head";

const Layout = ({ children, seo }) => (
  <>
    {/* <Head seo={seo} /> */}
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;