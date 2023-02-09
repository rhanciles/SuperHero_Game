var userInput = $("#user-input")
// console.log(userInput)
var searchBtn = $("#search-button");
// console.log(searchBtn)
var userInputValue = $("#user-input").val()
// console.log(userInputValue
var biographyContainer = $("#biography-container");

APIkey = "10220548467573520"

function superheroIndex() {
  searchBtn.on("click", function(event) {
      event.preventDefault()
      var findHero= userInput.val()
      var queryURL = "https://www.superheroapi.com/api.php/" + APIkey + "/search/" + findHero
      
    
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          console.log(response)
          var superheroImg = response.results[1].image.url
          biographyContainer.append($("<img>").attr("src", superheroImg))
          biographyContainer.append($("<h2>").text("Biography")).addClass("text-center").append($("<p>").text(response.results[1].biography))
 
        });
    });
}
superheroIndex()
