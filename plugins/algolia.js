import algoliasearch from 'algoliasearch/lite'
import {createInstantSearch} from "vue-instantsearch";

import {history} from 'instantsearch.js/es/lib/routers'

export default async ({app}, inject) => {

  let key = await app.$axios.$get('keys/algolia');

  const searchClient = algoliasearch(
    '781Q9SKBUD',
    key.data
  );


  const {instantsearch} = createInstantSearch({
    searchClient,
    indexName: 'snippets',
    routing: {
      router: history()
    }
  });

  inject('instantsearch', instantsearch)
}

