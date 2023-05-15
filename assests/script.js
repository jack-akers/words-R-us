var searchInput = $('#search-input')
var searchButton = $('#search-button')
var searchHistory = $('#search-history')
var word
var def = $('#definition')
var synonym = $('#synonym')
var searchedWord = $('#searched-word')
var partOfSpeach = $('#part-of-speach')
 
function userSearch() {
 word = $(searchInput).val()
  localStorage.setItem('word', word);
}

function getApi(requestUrl) {
    var requestUrl=`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b09d1310-a453-424a-9da2-e911b084efce`

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        searchedWord.text(data[0].hwi.hw)
        partOfSpeach.text(data[0].fl)
        
        
        for (i = 0; i < data[0].shortdef.length; i++) {
          console.log(data[0].shortdef[i])
          def.append(data[0].shortdef[i] + '; ')
        }
        
        
      var a=$('.history').text();
      var b=word;

      if (a.includes(b)){
        return

      } else {
        var button = $("<button>", {class:"history"});
        button.text(word);
        $(searchHistory).prepend(button);
          if ($("button").length>11)
        {
            searchHistory.find("button:last").remove();
        }
      }



      })
  
  };

 
function synonymApi(){
  $.ajax({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/thesaurus?word=${word}`,
      headers: { 'X-Api-Key': 'J6nLD/htJ/diddzSyLBckA==i64GEEwXxxucqjXK'},
      contentType: 'application/json',
      success: function(result) {
        for (i = 0; i < 5; i++) {
          console.log(result.synonyms[i])
          synonym.append(result.synonyms[i] + "; ")
        }
  
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
      
  });
}






searchButton.on('click',function(event){
  $('p').empty()
  event.preventDefault()
  userSearch()
  getApi()
  synonymApi()
})


$(searchHistory).on("click",".history", function(){
    def.empty()
    synonym.empty()
    
   word=$(this).text();
  var requestUrl=`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b09d1310-a453-424a-9da2-e911b084efce`
  getApi(requestUrl);

  synonymApi()

})










