import React, { useCallback, useState } from "react";
import { graphql, Link } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import ButtonToggle from "../../components/button-toggle";
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
        <ButtonToggle
          toggleFunction={toggleDevanagari}
          flag={devanagariEnabled}
          title={'Devanagari'}
        />
        <ButtonToggle
          toggleFunction={toggleVerseText}
          flag={verseTextEnabled}
          title={'Verse Text'}
        />
        <ButtonToggle
          toggleFunction={toggleGlossary}
          flag={glossaryEnabled}
          title={'Glossary'}
        />
        <ButtonToggle
          toggleFunction={toggleEnglishTranslation}
          flag={englishTranslationEnabled}
          title={'English translation'}
        />
        <ButtonToggle
          toggleFunction={toggleHindiTranslation}
          flag={hindiTranslationEnabled}
          title={'Hindi translation'}
        />
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
