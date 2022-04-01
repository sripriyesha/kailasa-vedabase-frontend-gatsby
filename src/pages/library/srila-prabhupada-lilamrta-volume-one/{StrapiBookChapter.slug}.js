import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../../../components/layout";

const BookChapter = ({ data}) => {
  const bookChapter = data.strapiBookChapter;

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
          {bookChapter.content.split('\n').map(function(item, key) {
            return (
              <span key={key}>
                {item}
                <br/>
              </span>
            )
          })}
        </Col>
      </Row>
    </Layout>
  );
};

export const query = graphql`
  query SrilaPrabhupadaLilamrtaVolumeOneBookChapter($slug: String!) {
    strapiBookChapter(slug: { eq: $slug }) {
      title
      content
      book {
        title
        slug
      }
    }
  }
`;

export default BookChapter;