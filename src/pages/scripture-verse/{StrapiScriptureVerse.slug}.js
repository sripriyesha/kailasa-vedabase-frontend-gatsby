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
        let cookieValue = Cookies.get(cookieName);
        const classNamePart2 = cookieName.split('_')[1];
        const $btn = $('.btn-' + classNamePart2);
        const $text = $('.text-' + classNamePart2);

        if (cookieValue === undefined) {
          Cookies.set(cookieName, 'on');
          cookieValue = Cookies.get(cookieName);
        }

        if (cookieValue === 'on') {
          $text.show();
        }

        if (cookieValue === 'off') {
          $btn.addClass('off');
          $btn.find('.fa').removeClass('fa-check-circle-o').addClass('fa-ban');
        }

        $btn.on('click', function() {
            if ($btn.hasClass('off')) {
                $btn.removeClass('off');
                $btn.find('.fa').removeClass('fa-ban').addClass('fa-check-circle-o');
                $text.show();
                Cookies.set(cookieName, 'on');
                return;
            }

            $btn.addClass('off');
            $btn.find('.fa').removeClass('fa-check-circle-o').addClass('fa-ban');
            $text.hide();
            Cookies.set(cookieName, 'off');
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
        <p className="text-devanagari" style={{ display: 'none'}}>{scriptureVerse.sanskrit_sutra}</p>
        <p className="text-verse-text" style={{ display: 'none'}}>{scriptureVerse.transliteration}</p>
        <p className="text-glossary" style={{ display: 'none'}}>{scriptureVerse.glossary}</p>
        <p className="text-translation-english" style={{ display: 'none'}}>{scriptureVerse.translation_aurobindo_english}</p>
        <p className="text-translation-hindi" style={{ display: 'none'}}>{scriptureVerse.translation_aurobindo_hindi}</p>
      </Row>
    </Layout>
  );
};

export const query = graphql`
  query ScriptureVerse($slug: String!) {
    strapiScriptureVerse(slug: { eq: $slug }) {
        sutra_number
        sanskrit_sutra
        transliteration
        translation_aurobindo_english
        translation_aurobindo_hindi
        glossary
        scripture {
          title
          slug
        }
    }
  }
`;

export default ScriptureVerse;
