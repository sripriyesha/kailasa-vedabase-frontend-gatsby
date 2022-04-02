import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../../../../../../components/layout";

const Scripture = ({ data}) => {
  const scripture = data.strapiScripture;

  return (
    <Layout>
      <Row>
        <Col sm={12}>
          <Link to={`/vaidika`}>
            <span>Vaidika</span>
          </Link>
          /
          <Link to={`/vaidika/shruti`}>
            <span>Shruti</span>
          </Link>
          /
          <Link to={`/vaidika/shruti/veda`}>
            <span>Veda</span>
          </Link>
          /
          <Link to={`/vaidika/shruti/veda/upanishads`}>
            <span>Upanishads</span>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
            <h1>{scripture.title}</h1>
        </Col>
      </Row>
      <Row>
        {scripture.scripture_verses.map((scriptureVerse) => {
          return (
            <Link
              to={`/vaidika/shruti/veda/upanishads/isa-upanishad/${scriptureVerse.slug}`}
              key={`${scripture.slug}__${scriptureVerse.slug}`}
            >
              {scriptureVerse.sutra_number}
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
      scripture_verses {
        sutra_number
        slug
      }
    }
  }
`;

export default Scripture;