var searchInput = $('#search-input')
var searchButton = $('#search-button')
var searchHistory = $('#search-history')
var word
var def = $('#definition')
var synonym = $('#synonym')
var searchedWord = $('#searched-word')
var partOfSpeach = $('#part-of-speach')

var previousSearches = JSON.parse(localStorage.getItem('words'))|| [];


if(previousSearches.length > 0){
  for(i=0; i< previousSearches.length; i++){
   
    
     var button = $("<button>", {class:"history button is-outlined is-rounded  is-medium is-responsive"});
     button.text(previousSearches[i]);
    $(searchHistory).prepend(button);}
  
}

function userSearch() {
 word = $(searchInput).val()
 // check if word was previously searched
 for(i=0;i<previousSearches.length;i++){
  // if searched before, remove it from the array
  if(previousSearches[i] == word){
    const x = previousSearches.splice(i, 1);
  }
 }

 // now that the word no longer exists, now word only exists once in array once unshifted 
previousSearches.unshift(word)
 if(previousSearches.length > 7){
  previousSearches.pop()
 };
 console.log(previousSearches)
 // remove all buttons
 while(document.querySelector('#search-history').firstChild){
  document.querySelector('#search-history').firstChild.remove()
 }
 // re append all buttons by the newly organized array
 for(i=0; i< previousSearches.length; i++){ 
  var button = $("<button>", {class:"history button is-outlined is-rounded  is-medium is-responsive"});
  button.text(previousSearches[i]);
 $(searchHistory).prepend(button);}
  localStorage.setItem('words', JSON.stringify(previousSearches));
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
        var button = $("<button>", {class:"history button is-outlined is-rounded is-medium is-responsive"});
        button.text(word);
        $(searchHistory).prepend(button);
          if ($("button").length>7)
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
  $(def).empty()
  $(partOfSpeach).empty()
  $(synonym).empty()
   event.preventDefault()
  userSearch()
  getApi()
  synonymApi()
 
  
})


$(searchHistory).on("click",".history", function(){
    def.empty()
    synonym.empty()
    partOfSpeach.empty()


    


   word=$(this).text();
  var requestUrl=`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b09d1310-a453-424a-9da2-e911b084efce`
  getApi(requestUrl);

  synonymApi()
      
})

// Select a random word from the array
function getWordOfTheDay() {
  var words = ['Abstemious', 'Bereft', 'Complaisant', 'Ebullient', 'Fastidious', 'Gregarious', 'Inexorable', 'Jocular', 'Laconic', 'Mendacious'];
  var word = words[Math.floor(Math.random() * words.length)];
  var requestUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=b09d1310-a453-424a-9da2-e911b084efce`;

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('API request failed.');
      }
    })
    .then(function (data) {
      console.log(data);
      // Check if the 'shortdef' and 'fl' properties exist in the data object
      if (data && data[0] && data[0].shortdef && data[0].shortdef[0] && data[0].fl) {
        var definition = data[0].shortdef[0];
        var partOfSpeech = data[0].fl;
        displayWordOfTheDay(word, definition, partOfSpeech);
      } else {
        throw new Error('Definition not found.');
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Display the word of the day
function displayWordOfTheDay(word, definition, partOfSpeech) {
  $('#wordOfTheDay').text(word);
  $('#wordOfTheDayDefinition').text(definition);
  $('#wordOfTheDayPartOfSpeech').text(partOfSpeech);
}

// Call the function to get and display the word of the day
getWordOfTheDay();