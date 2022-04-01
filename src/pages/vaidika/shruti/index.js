import React from "react";
import { graphql, Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../components/layout";

const Shruti = ({ data}) => {
  const scriptureCategories = data.allStrapiScriptureCategory.edges;

  return (
    <Layout>
      <Row>
        <Col sm={12}>
          <Link to={'/vaidika'}>
            Vaidika
          </Link>
          /
          <span>Shruti</span>
          <h1>Shruti</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {scriptureCategories.map((scriptureCategory) => {
            if (scriptureCategory.node.scriptureCategoryParent === null) {
              return null;
            }

            if (scriptureCategory.node.scriptureCategoryParent.name !== 'Shruti') {
              return null;
            }

            return (
              <Link
                to={`/vaidika/shruti/${scriptureCategory.node.slug}`}
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
          scriptureCategoryParent {
            id
            name
            slug
            scriptureCategoryParent
          }
        }
      }
    }
  }
`;

export default Shruti;