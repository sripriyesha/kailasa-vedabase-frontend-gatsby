import React from "react";
import { graphql, Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../../../components/layout";

const Upanishads = ({ data}) => {
  const scriptures = data.allStrapiScripture.edges;

  return (
    <Layout>
      <Row>
        <Col sm={12}>
        <Link to={'/vaidika'}>
            Vaidika
          </Link>
          /
          <Link to={'/vaidika/shruti'}>
            Shruti
          </Link>
          /
          <Link to={'/vaidika/shruti/veda'}>
            Veda
          </Link>
          /
          <span>Upanishads</span>
          <h1>Upanishads</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {scriptures.map((scripture) => {
            if (scripture.node.scripture_category === null) {
              return null;
            }

            if (scripture.node.scripture_category.name !== 'Upanishads') {
              return null;
            }

            return (
              <Link
                to={`/vaidika/shruti/veda/upanishads/${scripture.node.slug}`}
                key={scripture.node.id}
              >
                {scripture.node.title}
              </Link>
            );
          })}
        </Col>
      </Row>
    </Layout>
  );
};

export const query = graphql`
  query {
    allStrapiScripture {
      edges {
        node {
          title
          slug
          scripture_category {
            name
          }
        }
      }
    }
  }
`;

export default Upanishads;