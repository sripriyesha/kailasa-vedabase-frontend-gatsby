import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Col, Row } from "react-bootstrap";

import Layout from "../components/layout";

const NavChildren = () => (
  <h2>The topmost source of sanskrit scriptures</h2>
)

const IndexPage = () => {
  const data = useStaticQuery(query);

  const scriptures = data.allStrapiScripture.edges;

  return (
    <Layout navChildren={NavChildren}>
      <Row>
        {scriptures.map((scripture) => {
          return (
            <Col sm={2} md={2} lg={2} key={scripture.node.slug}>
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