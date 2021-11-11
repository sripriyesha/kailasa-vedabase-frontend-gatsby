import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import Layout from "../components/layout";
import "../assets/css/main.css";

const IndexPage = () => {
  const data = useStaticQuery(query);

  const scriptures = data.allStrapiScripture.edges;

  return (
    <Layout seo={data.strapiHomepage.seo}>
      <Container>
        <Row>
          <Col sm={12}>
            <Navbar>
              <Navbar.Brand href="/">Kailasa Scriptures</Navbar.Brand>
            </Navbar>
            <h2>The topmost source of sanskrit scriptures</h2>
          </Col>
        </Row>
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
    strapiHomepage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          localFile {
            publicURL
          }
        }
      }
    }
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