import React, { useEffect } from "react";
import { graphql, Link } from "gatsby";
import { Col, Row } from "react-bootstrap";
import $ from 'jquery';
import Cookies from 'js-cookie';

import Layout from "../../components/layout";


const ScriptureVerse = ({ data }) => {
  const scriptureVerse = data.strapiScriptureVerse;
  
  useEffect(() => {
    const cookies = [
      'vedabase_devanagari',
      'vedabase_verse-text',
      'vedabase_glossary',
      'vedabase_translation-english',
      'vedabase_translation-hindi'
    ];

    for (let index = 0; index < cookies.length; index++) {
        const cookieName = cookies[index];
        const cookie = Cookies.get(cookieName);
        const classNamePart2 = cookieName.split('_')[1];
        const $btn = $('.btn-' + classNamePart2);
        const $text = $('.text-' + classNamePart2);

        if (cookie === undefined) {
          Cookies.set(cookieName, 'true');
        }

        if (cookie === 'false') {
          $btn.addClass('off');
          $btn.find('.fa').removeClass('fa-check-circle-o').addClass('fa-ban');
          $text.hide();
        }

        $btn.on('click', function() {
            if ($btn.hasClass('off')) {
                $btn.removeClass('off');
                $btn.find('.fa').removeClass('fa-ban').addClass('fa-check-circle-o');
                $text.show();
                Cookies.set(cookieName, 'true');
                return;
            }

            $btn.addClass('off');
            $btn.find('.fa').removeClass('fa-check-circle-o').addClass('fa-ban');
            $text.hide();
            Cookies.set(cookieName, 'false');
        });  
    }
  }, []);

  return (
    <Layout>
      <Row>
        <Col sm={12}>
          <Link to={`/scripture/${scriptureVerse.scripture.slug}`}>
            <h1>{scriptureVerse.scripture.title}</h1>
          </Link>
        </Col>
      </Row>
      <button className="btn-devanagari btn-toggle">
        <i className="fa fa-check-circle-o fa-lg"></i>
        {' Devanagari'}
      </button>
      <button className="btn-verse-text btn-toggle">
        <i className="fa fa-check-circle-o fa-lg"></i>
        {' Verse Text'}
      </button>
      <button className="btn-glossary btn-toggle">
        <i className="fa fa-check-circle-o fa-lg"></i>
        {' Glossary'}
      </button>
      <button className="btn-translation-english btn-toggle">
        <i className="fa fa-check-circle-o fa-lg"></i>
        {' English translation'}
      </button>
      <button className="btn-translation-hindi btn-toggle">
        <i className="fa fa-check-circle-o fa-lg"></i>
        {' Hindi translation'}
      </button>
      <Row>
        <p>{scriptureVerse.sutraNumber}</p>
        <p className="text-devanagari">{scriptureVerse.sanskritSutra}</p>
        <p className="text-verse-text">{scriptureVerse.transliteration}</p>
        <p className="text-glossary">{scriptureVerse.glossary}</p>
        <p className="text-translation-english">{scriptureVerse.translationAurobindoEnglish}</p>
        <p className="text-translation-hindi">{scriptureVerse.translationAurobindoHindi}</p>
      </Row>
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
