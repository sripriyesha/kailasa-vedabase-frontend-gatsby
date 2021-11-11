import React from "react";
import { Col, Navbar, Row } from "react-bootstrap";

const Nav = ({ children }) => (
    <Row>
        <Col sm={12}>
            <Navbar>
                <Navbar.Brand href="/">Kailasa Scriptures</Navbar.Brand>
            </Navbar>
            {children}
        </Col>
    </Row>
);

export default Nav;