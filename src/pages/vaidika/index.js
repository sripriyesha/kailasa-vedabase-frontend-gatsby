import React from "react";
import { graphql, Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import Layout from "../../components/layout";

const Vaidika = ({ data}) => {
  const scriptureCategories = data.allStrapiScriptureCategory.edges;

  return (
    <Layout>
      <Row>
        <Col sm={12}>
          <h1>Vaidika</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {scriptureCategories.map((scriptureCategory) => {
            if (scriptureCategory.node.scripture_category_parent === null) {
              return null;
            }

            if (scriptureCategory.node.scripture_category_parent.name !== 'Vaidika') {
              return null;
            }

            return (
              <Link
                to={`/vaidika/${scriptureCategory.node.slug}`}
                key={scriptureCategory.node.id}
              >
                {scriptureCategory.node.name}
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
    allStrapiScriptureCategory {
      edges {
        node {
          id
          name
          slug
          scripture_category_parent {
            id
            name
            slug
            scripture_category_parent
          }
        }
      }
    }
  }
`;

export default Vaidika;