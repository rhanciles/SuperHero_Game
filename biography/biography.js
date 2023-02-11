var userInput = $("#user-input");
// console.log(userInput)
var searchBtn = $("#search-button");
// console.log(searchBtn)
var userInputValue = $("#user-input").val();
// console.log(userInputValue
var biographyContainer = $("#biography-container");

APIkey = "10220548467573520";

function superheroIndex() {
  searchBtn.on("click", function (event) {
    event.preventDefault();
    biographyContainer.empty()
    var findHero = userInput.val().trim();
    var queryURL =
      "https://www.superheroapi.com/api.php/" + APIkey + "/search/" + findHero;
      
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      // Loop over results to get all versions of specific character.
      for (var i = 0; i < response.results.length; i++) {
        // Find and create Img.
        var superheroImg =
          response.results[i].image.url ||
          "https://via.placeholder.com/240x320.png";
        var img = $("<img>").attr("src", superheroImg).addClass("img-fluid");

        
        var superHeroName = $("<h2>")
          .text(response.results[i].name)
          .addClass("text-center font-weight-bold text-uppercase info");

        var dataDiv = $("<div>")
          .attr("id", "div-styling")
          .addClass("border div-styling");
        biographyContainer.append(img, superHeroName);
        
        // Create biography info.
        var biography = $("<ul>")
          .text("Biography")
          .addClass("text-center font-weight-bold underline")

        var fullname = $("<li>").text(
          "Full name:" + " " + response.results[i].biography["full-name"]
        );
        var placeofBirth = $("<li>").text(
          "Place of Birth:" +
            " " +
            response.results[i].biography["place-of-birth"]
        );
        var firstAppearance = $("<li>").text(
          "First appearance:" +
            " " +
            response.results[i].biography["first-appearance"]
        );
        var publisher = $("<li>").text(
          "Publisher:" + " " + response.results[i].biography.publisher
        );
        biographyContainer.append(dataDiv);
        dataDiv.append(
          biography,
          fullname,
          placeofBirth,
          firstAppearance,
          publisher
        );

        // Create appearance info.
        var appearance = $("<ul>")
          .text("Appearance")
          .addClass("text-center font-weight-bold underline")

        var gender = $("<li>").text(
          "Gender:" + " " + response.results[i].appearance.gender
        );
        var hairColor = $("<li>").text(
          "Hair color:" + " " + response.results[i].appearance["hair-color"]
        );
        var race = $("<li>").text(
          "Race:" + " " + response.results[i].appearance.race
        );
        var height = $("<li>").text(
          "Height:" + " " + Object.values(response.results[i].appearance.height)
        );
        var weight = $("<li>").text(
          "Weight:" + " " + Object.values(response.results[i].appearance.weight)
        );
        dataDiv.append(appearance, gender, hairColor, race, height, weight);

        // Create
        

        // Create Powerstats info.
        var powerStats = $("<ul>")
          .text("Power Stats")
          .addClass("text-center font-weight-bold underline");
        dataDiv.append(powerStats);

        const object = response.results[i].powerstats;

        for (const property in object) {
          dataDiv.append(`${property}: ${object[property]} , `);
        }
      }
    });
  });
}
superheroIndex();

