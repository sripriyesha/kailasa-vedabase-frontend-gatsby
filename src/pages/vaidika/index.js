import React from "react";
import { graphql, Link } from "gatsby";
import { Row } from "react-bootstrap";
import Layout from "../../components/layout";

const Vaidika = ({ data}) => {
  const scriptureCategories = data.allStrapiScriptureCategory.edges;

  return (
    <Layout>
      <Row>
        {scriptureCategories.map((scriptureCategory) => {
            if (scriptureCategory.node.scriptureCategoryParent === null) {
                return;
            }

            if (scriptureCategory.node.scriptureCategoryParent.name !== 'Vaidika') {
                return;
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

export default Vaidika;