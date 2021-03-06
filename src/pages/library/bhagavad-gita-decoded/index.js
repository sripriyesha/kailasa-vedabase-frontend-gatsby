import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../../../components/layout";

const BookChapters = ({ data}) => {
  const book = data.strapiBook;
  const bookChapters = book.book_chapters.sort((a, b) => {
    return a.order < b.order ? -1 : (a.order > b.order ? 1 : 0);
  });

  return (
    <Layout>
      <Row>
        <Col sm={12}>
            <h1>{book.title}</h1>
        </Col>
      </Row>
      <Row>
        {bookChapters.map((bookChapter) => {
          return (
            <Link
              to={`/library/bhagavad-gita-decoded/${bookChapter.slug}`}
              key={`${bookChapter.slug}`}
            >
              {bookChapter.title}
            </Link>
          );
        })}
      </Row>
    </Layout>
  );
};

export const query = graphql`
  query {
    strapiBook(slug: {eq: "bhagavad-gita-decoded"}) {
      title
      book_chapters {
        title
        slug
        order
      }
    }
  }
`;

export default BookChapters;