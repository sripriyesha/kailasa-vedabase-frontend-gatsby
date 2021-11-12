import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/layout";
import Nav from "../components/nav";
import "../assets/css/main.css";

const IndexPage = () => {
  const data = useStaticQuery(query);

  const scriptures = data.allStrapiScripture.edges;

  return (
    <Layout>
      <Container>
        <Nav>
          <h2>The topmost source of sanskrit scriptures</h2>
        </Nav>
        <Row>
          {scriptures.map((scripture) => {
            return (
              <Col sm={2} md={2} lg={2}>
                <Link
                  to={`/scripture/${scripture.node.slug}`}
                  key={scripture.node.slug}
                >
                  {scripture.node.title}
                </Link>
              </Col>
            )
          })}
        </Row>
      </Container>
    </Layout>
  );
};

const query = graphql`
  query {
    allStrapiScripture {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;

export default IndexPage;