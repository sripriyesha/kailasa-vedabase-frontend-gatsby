import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { Col, Row, Image } from "react-bootstrap";

import Layout from "../components/layout";

const IndexPage = () => {
  const data = useStaticQuery(query);

  let books = data.allStrapiBook.edges;
  const scriptureCategories = data.allStrapiScriptureCategory.edges;
  const scriptures = data.allStrapiScripture.edges;

  books = books.sort((a, b) => {
    return a.node.title < b.node.title ? -1 : (a.node.title > b.node.title ? 1 : 0);
  })

  return (
    <Layout>
      <h2>Books</h2>
      <Row>
        {books.map((book) => {
          return (
            <Col sm={3} key={`col-${book.node.slug}`}>
              <Link
                to={`/library/${book.node.slug}`}
                key={book.node.slug}
              >
                <Image
                  style={{
                    width: 261,
                    height: 324,
                  }}
                  src={book.node.cover.localFile.publicURL}
                />
                <p style={{ textAlign: 'center' }}>{book.node.title}</p>
              </Link>
            </Col>
          )
        })}
      </Row>
      <h2>Scriptures Categories</h2>
      {scriptureCategories.map((scriptureCategory) => {
        if (scriptureCategory.node.scripture_category_parent !== null) {
          return null;
        }

        return (
          <Row key={`row-${scriptureCategory.node.slug}`}>
            <Col sm={12} key={`col-${scriptureCategory.node.slug}`}>
              <Link
                to={scriptureCategory.node.slug}
                key={scriptureCategory.node.slug}
              >
                {scriptureCategory.node.name}
              </Link>
            </Col>
          </Row>
        )
      })}
      <h2>Scriptures</h2>
      {scriptures.map((scripture) => {
        return (
          <Row key={`row-${scripture.node.slug}`}>
            <Col sm={12} key={`col-${scripture.node.slug}`}>
              <Link
                to={`/scripture/${scripture.node.slug}`}
                key={scripture.node.slug}
              >
                {scripture.node.title}
              </Link>
            </Col>
          </Row>
        )
      })}
    </Layout>
  );
};

const query = graphql`
  query {
    allStrapiBook {
      edges {
        node {
          title
          slug
          cover {
            localFile {
              publicURL
            }
          }
        }
      }
    }
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
            scripture_category_parent {
              id
              name
              slug
            }
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