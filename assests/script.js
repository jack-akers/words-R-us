var searchInput = $('#search-input')
var searchButton = $('#search-button')
var searchHistory = $('#search-history')
var word = $(searchInput).val()
var def = $('definition')
var synonym = $('#synonym')
 


function getApi(requestUrl) {
    var requestUrl=`https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=b09d1310-a453-424a-9da2-e911b084efce`

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
       
       console.log(data)

      })
  
  };






searchButton.on('click', getApi)

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
searchButton.on('click', getSynonymsApi)















