import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Row, Button } from "react-bootstrap";
import Layout from "../../../components/layout";

const BookChapter = ({ data}) => {
  const bookChapter = data.strapiBookChapter;
  let bookChaptersEdges = data.allStrapiBookChapter.edges;

  bookChaptersEdges = bookChaptersEdges.filter((edge) => {
    return edge.node.book.slug === 'bhagavad-gita-decoded';
  });

  let previousLinkSlug = null;
  let nextLinkSlug = null;

  if (bookChapter.order !== 1) {
    previousLinkSlug = bookChaptersEdges.filter((edge) => {
      return edge.node.order === bookChapter.order - 1;
    })[0].node.slug;
  }

  const maxOrder = Math.max.apply(Math, bookChaptersEdges.map(bookChapter => bookChapter.node.order));

  if (bookChapter.order !== maxOrder) {
    nextLinkSlug = bookChaptersEdges.filter((edge) => {
      return edge.node.order === bookChapter.order + 1;
    })[0].node.slug;
  }

  return (
    <Layout>
      <Row>
        <Col sm={12}>
          <Link to={`/library/${bookChapter.book.slug}`}>
            {bookChapter.book.title}
          </Link>
          <h1>{bookChapter.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {bookChapter.content.data.content.split('\n').map(function(item, key) {
            return (
              <span key={key}>
                {item}
                <br/>
              </span>
            )
          })}
        </Col>
      </Row>
      <Row>
        {previousLinkSlug !== null ?
          <Col sm={6}>
            <Button
              variant="primary"
              href={`/library/${bookChapter.book.slug}/${previousLinkSlug}`}
            >Previous</Button>
          </Col>
        :
          <Col sm={6}></Col>
        }
        {nextLinkSlug !== null ?
          <Col sm={6}>
            <Button
              variant="primary"
              href={`/library/${bookChapter.book.slug}/${nextLinkSlug}`}
              className="pull-right"
            >Next</Button>
          </Col>
        :
          null
        }
      </Row>
    </Layout>
  );
};

export const query = graphql`
  query BhagavadGitaDecodedBookChapter($slug: String!) {
    strapiBookChapter(slug: { eq: $slug }) {
      title
      content {
        data {
          content
        }
      }
      order
      book {
        title
        slug
      }
    }
    allStrapiBookChapter {
      edges {
        node {
          slug
          order
          book {
            slug
          }
        }
      }
    }
  }
`;

export default BookChapter;