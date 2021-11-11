import React, { useCallback, useState } from "react";
import { graphql, Link } from "gatsby";
import { Col, Container, Row } from "react-bootstrap";
import useCookie from 'react-use-cookie';

import Layout from "../../components/layout";
import Nav from "../../components/nav";
import ButtonToggle from "../../components/button-toggle";
import "../../assets/css/main.css";

const useBooleanCookie = (cookieName, initialState) => {
  const [cookie, setCookie] = useCookie(cookieName, String(initialState));
  const [isCookieEnabled, setCookieEnabled] = useState(cookie === 'true');

  const setCookieState = (state) => {
    setCookieEnabled(state);
    setCookie(String(state));
  }

  return [isCookieEnabled, setCookieState];
}

const ScriptureVerse = ({ data }) => {
  const scriptureVerse = data.strapiScriptureVerse;

  const [devanagariEnabled, setDevanagariEnabled] = useBooleanCookie('vedabase_devanagari', true);
  const [verseTextEnabled, setVerseTextEnabled] = useBooleanCookie('vedabase_versetext', true);
  const [glossaryEnabled, setGlossaryEnabled] = useBooleanCookie('vedabase_glossary', true);
  const [englishTranslationEnabled, setEnglishTranslationEnabled] = useBooleanCookie('vedabase_englishtranslation', true);
  const [hindiTranslationEnabled, setHindiTranslationEnabled] = useBooleanCookie('vedabase_hinditranslation', true);

  const toggleDevanagari = useCallback(() => {
    setDevanagariEnabled(!devanagariEnabled);
  }, [setDevanagariEnabled, devanagariEnabled]);

  const toggleVerseText = useCallback(() => {
    setVerseTextEnabled(!verseTextEnabled);
  }, [setVerseTextEnabled, verseTextEnabled]);

  const toggleGlossary = useCallback(() => {
    setGlossaryEnabled(!glossaryEnabled);
  }, [setGlossaryEnabled, glossaryEnabled]);

  const toggleEnglishTranslation = useCallback(() => {
    setEnglishTranslationEnabled(!englishTranslationEnabled);
  }, [setEnglishTranslationEnabled, englishTranslationEnabled]);

  const toggleHindiTranslation = useCallback(() => {
    setHindiTranslationEnabled(!hindiTranslationEnabled);
  }, [setHindiTranslationEnabled, hindiTranslationEnabled]);

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
