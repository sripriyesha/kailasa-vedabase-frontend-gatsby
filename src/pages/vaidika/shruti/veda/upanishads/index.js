import React from "react";
import { graphql, Link } from "gatsby";
import { Row } from "react-bootstrap";
import Layout from "../../../../../components/layout";

const Upanishads = ({ data}) => {
  const scriptures = data.allStrapiScripture.edges;

  return (
    <Layout>
      <Row>
        {scriptures.map((scripture) => {
            if (scripture.node.scriptureCategory === null) {
                return;
            }

            if (scripture.node.scriptureCategory.name !== 'Upanishads') {
                return;
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
          scriptureCategory {
            name
          }
        }
      }
    }
  }
`;

export default Upanishads;