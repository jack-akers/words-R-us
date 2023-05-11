var searchInput = $('#search-input')
var searchButton = $('#search-button')
var searchHistory = $('#search-history')
var word = $('#searched-word')
var def = $('definition')
var synonym = $('#synonym')
var requestDictionaryAPI=`https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=b09d1310-a453-424a-9da2-e911b084efce`



//JOSH CODE!!!
$(document).ready(() => {
    $('#search-button').click(() => {
      const word = $('#search-input').val();
      searchWord(word);
    });
  });

  async function searchWord(word) {
    const dictionaryApiKey = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=b09d1310-a453-424a-9da2-e911b084efce';
    const thesaurusApiKey = '';
  
    try {
      const wordData = await $.ajax({
        url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionaryApiKey}`,
      });
  
      // Code to display the definition and examples
  
      const synonymsData = await $.ajax({
        url: `https://www.wordsapi.com/mashape/words/${word}/synonyms?when=2012-08-18T02:34:02Z&encrypted=USE_YOUR_THESAURUS_API_KEY`,
      });
  
      // Code to display the synonyms
    } catch (error) {
      displayError(error.message);
    }
  }

  function displayError(message) {
    $('#results-container').html(`<p>Error: ${message}</p>`);
  }