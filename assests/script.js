var searchInput = $('#search-input')
var searchButton = $('#search-button')
var searchHistory = $('#search-history')
var word = $(searchInput).val()
var def = $('#definition')
var synonym = $('#synonym')
var searchedWord = $('#searched-word')
var partOfSpeach = $('#part-of-speach')
 


function getApi(requestUrl) {
  word = $(searchInput).val()
    var requestUrl=`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b09d1310-a453-424a-9da2-e911b084efce`

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        searchedWord.text(data[0].hwi.hw)
        partOfSpeach.text(data[0].fl)
        
        
        for (i = 0; i < data[0].shortdef.length; i++) {
          console.log(data[0].shortdef[i])
          def.append(data[0].shortdef[i] + '; ')
        }
        
        
      })
  
  };







function getSynonymsApi(requestUrlSynonyms) {
  var requestUrlSynonyms =`https://www.stands4.com/services/v2/syno.php?uid=1001&tokenid=tk324324&word=consistent&format=json`
  fetch(requestUrlSynonyms)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     console.log(data)
    })
};
searchButton.on('click', getSynonymsApi, getApi)















