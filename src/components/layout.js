import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import Nav from "./nav";
import "../assets/css/main.css";

const Layout = ({ children, navChildren }) => (
  <>
    <Container>
      <Nav />
      <main>{children}</main>
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;