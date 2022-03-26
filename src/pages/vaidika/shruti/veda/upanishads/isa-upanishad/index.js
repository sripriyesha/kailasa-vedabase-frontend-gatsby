import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../../../../../../components/layout";

const Scripture = ({ data}) => {
  const scripture = data.strapiScripture;
  const scriptureCategories = data.allStrapiScriptureCategory;
  console.log(scriptureCategories);

  return (
    <Layout>
      <Row>
        <Col sm={12}>
          <Link to={`/vaidika/shruti/veda/upanishads/${scripture.slug}`}>
            <h1>{scripture.title}</h1>
          </Link>
        </Col>
      </Row>
      <Row>
        {scripture.scriptureVerses.map((scriptureVerse) => {
          return (
            <Link
              to={`/vaidika/shruti/veda/upanishads/isa-upanishad/${scriptureVerse.slug}`}
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
  query {
    strapiScripture(slug: { eq: "isa-upanishad" }) {
      title
      slug
      scriptureVerses {
        sutraNumber
        slug
      }
      scriptureCategory {
        id
        name
        scriptureCategoryParent
      }
    }
  }
`;

export default Scripture;