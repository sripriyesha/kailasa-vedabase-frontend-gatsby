import React, { useCallback, useState } from "react";
import { graphql, Link } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import "../../assets/css/main.css";

const ScriptureVerse = ({ data }) => {
  const scriptureVerse = data.strapiScriptureVerse;
  const [devanagariEnabled, setDevanagariEnabled] = useState(true);
  const [verseTextEnabled, setVerseTextEnabled] = useState(true);
  const [glossaryEnabled, setGlossaryEnabled] = useState(true);
  const [englishTranslationEnabled, setEnglishTranslationEnabled] = useState(true);
  const [hindiTranslationEnabled, setHindiTranslationEnabled] = useState(true);

  const toggleDevanagari = useCallback(() => {
    setDevanagariEnabled(!devanagariEnabled);
  }, [devanagariEnabled]);

  const toggleVerseText = useCallback(() => {
    setVerseTextEnabled(!verseTextEnabled);
  }, [verseTextEnabled]);

  const toggleGlossary = useCallback(() => {
    setGlossaryEnabled(!glossaryEnabled);
  }, [glossaryEnabled]);

  const toggleEnglishTranslation = useCallback(() => {
    setEnglishTranslationEnabled(!englishTranslationEnabled);
  }, [englishTranslationEnabled]);

  const toggleHindiTranslation = useCallback(() => {
    setHindiTranslationEnabled(!hindiTranslationEnabled);
  }, [hindiTranslationEnabled]);

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
        <button
          onClick={toggleDevanagari}
          className={devanagariEnabled ? "btn-toggle" : "btn-toggle off"}
        >
          {devanagariEnabled ? <i class="fa fa-check-circle-o fa-lg"></i> : <i class="fa fa-ban fa-lg"></i>}
          {' '}Devanagari
        </button>
        <button
          onClick={toggleVerseText}
          className={verseTextEnabled ? "btn-toggle" : "btn-toggle off"}
        >
          {verseTextEnabled ? <i class="fa fa-check-circle-o fa-lg"></i> : <i class="fa fa-ban fa-lg"></i>}
          {' '}Verse Text
        </button>
        <button
          onClick={toggleGlossary}
          className={glossaryEnabled ? "btn-toggle" : "btn-toggle off"}
        >
          {glossaryEnabled ? <i class="fa fa-check-circle-o fa-lg"></i> : <i class="fa fa-ban fa-lg"></i>}
          {' '}Glossary
        </button>
        <button
          onClick={toggleEnglishTranslation}
          className={englishTranslationEnabled ? "btn-toggle" : "btn-toggle off"}
        >
          {englishTranslationEnabled ? <i class="fa fa-check-circle-o fa-lg"></i> : <i class="fa fa-ban fa-lg"></i>}
          {' '}English translation
        </button>
        <button
          onClick={toggleHindiTranslation}
          className={hindiTranslationEnabled ? "btn-toggle" : "btn-toggle off"}
        >
          {hindiTranslationEnabled ? <i class="fa fa-check-circle-o fa-lg"></i> : <i class="fa fa-ban fa-lg"></i>}
          {' '}Hindi translation
        </button>
        <Row>
          <p>{scriptureVerse.sutraNumber}</p>
          {devanagariEnabled && <p>{scriptureVerse.sanskritSutra}</p>}
          {verseTextEnabled && <p>{scriptureVerse.transliteration}</p>}
          {glossaryEnabled && <p>{scriptureVerse.glossary}</p>}
          {englishTranslationEnabled && <p>{scriptureVerse.translationAurobindoEnglish}</p>}
          {hindiTranslationEnabled && <p>{scriptureVerse.translationAurobindoHindi}</p>}
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
