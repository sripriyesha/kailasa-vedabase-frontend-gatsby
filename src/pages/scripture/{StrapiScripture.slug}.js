import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Layout from "../../components/layout";
import "../../assets/css/main.css";

const Scripture = ({ data}) => {
  const scripture = data.strapiScripture;

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={12}>
            <Navbar>
              <Navbar.Brand href="/">Kailasa Scriptures</Navbar.Brand>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Link to={`/scripture/${scripture.slug}`}>
              <h1>{scripture.title}</h1>
            </Link>
          </Col>
        </Row>
        <Row>
          {scripture.scriptureVerses.map((scriptureVerse) => {
            return (
              <Link
                to={`/scripture-verse/${scriptureVerse.slug}`}
                key={`${scripture.slug}__${scriptureVerse.slug}`}
              >
                {scriptureVerse.sutraNumber}
              </Link>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query Scripture($slug: String!) {
    strapiScripture(slug: { eq: $slug }) {
      title
      slug
      scriptureVerses {
        sutraNumber
        slug
      }
    }
  }
`;

export default Scripture;