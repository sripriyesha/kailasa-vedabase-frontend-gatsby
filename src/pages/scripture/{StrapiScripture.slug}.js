import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/layout";

const Scripture = ({ data}) => {
  const scripture = data.strapiScripture;

  return (
    <Layout>
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