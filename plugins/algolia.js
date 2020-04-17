import algoliasearch from 'algoliasearch/lite'
import {createInstantSearch} from "vue-instantsearch";

import {history} from 'instantsearch.js/es/lib/routers'

export default ({app}, inject) => {
  const searchClient = algoliasearch(
    '781Q9SKBUD',
    '1c32ff5e581fbb5f0ebd95f3018ece85'
  );


  const {instantsearch} = createInstantSearch({
    searchClient,
    indexName: 'snippets',
    routing:{
      router: history()
    }
  });

  inject('instantsearch', instantsearch)
}

