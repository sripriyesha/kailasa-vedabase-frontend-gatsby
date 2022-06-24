const scripturesQuery = `{
  scriptures: allStrapiScripture {
    edges {
      node {
        id
        title
        slug
      }
    }
  }
}`;

function scriptureToAlgoliaRecord({ node: { id, ...rest } }) {
    return {
        objectID: id,
        ...rest,
    }
}

const scriptureVersesQuery = `{
    scriptureVerses: allStrapiScriptureVerse {
      edges {
        node {
            id
            sutra_number
            sanskrit_sutra
            transliteration
            translation_aurobindo_english
            translation_aurobindo_hindi
            glossary
            slug
            scripture {
              title
            }
        }
      }
    }
}`;

function scriptureVerseToAlgoliaRecord({ node: { id, ...rest } }) {
    return {
        objectID: id,
        ...rest,
    }
}

const queries = [
  {
    query: scripturesQuery,
    transformer: ({ data }) => data.scriptures.edges.map(scriptureToAlgoliaRecord),
    indexName: 'scripture',
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: scriptureVersesQuery,
    transformer: ({ data }) => data.scriptureVerses.edges.map(scriptureVerseToAlgoliaRecord),
    indexName: 'scripture-verse',
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;