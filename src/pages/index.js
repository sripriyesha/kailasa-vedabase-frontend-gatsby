import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Col, Row } from "react-bootstrap";

import Layout from "../components/layout";

const NavChildren = () => (
  <h2>The topmost source of sanskrit scriptures</h2>
)

const IndexPage = () => {
  const data = useStaticQuery(query);

  const scriptureCategories = data.allStrapiScriptureCategory.edges;
  const scriptures = data.allStrapiScripture.edges;

  return (
    <Layout navChildren={NavChildren}>
      <h2>Categories</h2>
      {scriptureCategories.map((scriptureCategory) => {
        if (scriptureCategory.node.scriptureCategoryParent !== null) {
          return;
        }

        return (
          <Row>
            <Link
              to={scriptureCategory.node.slug}
              key={scriptureCategory.node.slug}
            >
              {scriptureCategory.node.name}
            </Link>
          </Row>
        )
      })}
      <h2>Scriptures</h2>
      {scriptures.map((scripture) => {
        return (
          <Row>
            <Link
              to={`/scripture/${scripture.node.slug}`}
              key={scripture.node.slug}
            >
              {scripture.node.title}
            </Link>
          </Row>
        )
      })}
    </Layout>
  );
};

const query = graphql`
  query {
    allStrapiScriptureCategory {
      edges {
        node {
          id
          name
          slug
          scriptureCategoryParent {
            id
            name
            slug
            scriptureCategoryParent
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