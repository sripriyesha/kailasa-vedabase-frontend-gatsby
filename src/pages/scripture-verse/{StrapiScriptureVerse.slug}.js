import React from "react";
import { graphql, Link } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import "../../assets/css/main.css";

const ScriptureVerse = ({ data }) => {
  const scriptureVerse = data.strapiScriptureVerse;

  return (
    <Layout>
      <Container>
        <Nav />
        <Row>
          <Col sm={12}>
            <Link to={`/scripture/${scriptureVerse.scripture.slug}`}>
              <h1>{scriptureVerse.scripture.title}</h1>
            </Link>
          </Col>
        </Row>
        <Row>
          <p>{scriptureVerse.sutraNumber}</p>
          <p>{scriptureVerse.sanskritSutra}</p>
          <p>{scriptureVerse.transliteration}</p>
          <p>{scriptureVerse.translationAurobindoEnglish}</p>
          <p>{scriptureVerse.translationAurobindoHindi}</p>
        </Row>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query ScriptureVerse($slug: String!) {
    strapiScriptureVerse(slug: { eq: $slug }) {
        sutraNumber
        sanskritSutra
        transliteration
        translationAurobindoEnglish
        translationAurobindoHindi
        glossary
        scripture {
          title
          slug
        }
    }
  }
`;

export default ScriptureVerse;
