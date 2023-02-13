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
    biographyContainer.empty();
    var findHero = userInput.val().trim();
    console.log(findHero);
    if(findHero) {


    var queryURL =
      "https://www.superheroapi.com/api.php/" + APIkey + "/search/" + findHero;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //console.log(response);

      // Loop over results to get all versions of specific character.
      for (var i = 0; i < response.results.length; i++) {
        // Find and create Img.
        var superheroImg =
          response.results[i].image.url ||
          "https://via.placeholder.com/240x320.png";
        var img = $("<img>").attr("src", superheroImg).addClass("img-fluid imgstyling");

        document.body.style.cssText = 'background-image: url("../assets/images/Bkgnd-maxres.jpg"); background-size: contain;'
        

        // Create HR tag to seperate content

        var hr = $("<hr>").addClass("hrstyling");
        var hr1 = $("<hr>").addClass("hrstyling");
        var hr2 = $("<hr>").addClass("hrstyling");
        // var hr3 = $("<hr>").addClass("hrstyling");
        // var hr4 = $("<hr>").addClass("hrstyling");


        // Create div to display appended API data.

        var dataDiv = $("<div>")
          .attr("id", "div-styling")
          .addClass("borderstyle div-styling");
        biographyContainer.append(img);

        // Create biography info.

        

        var superHeroName = $("<h2>")
          .text(response.results[i].name)
          .addClass("text-center font-weight-bold text-uppercase info namestyling");

        var biography = $("<ul>")
          .text("Biography")
          .addClass("text-left font-weight-bold infoheading ultitle");

        var fullname = $("<li>")
          .text("Full name:" + " " + response.results[i].biography["full-name"])
          .addClass("listitems");
        var placeofBirth = $("<li>")
          .text(
            "Place of Birth:" +
              " " +
              response.results[i].biography["place-of-birth"]
          )
          .addClass("listitems");
        var firstAppearance = $("<li>")
          .text(
            "First appearance:" +
              " " +
              response.results[i].biography["first-appearance"]
          )
          .addClass("listitems");
        var publisher = $("<li>")
          .text("Publisher:" + " " + response.results[i].biography.publisher)
          .addClass("listitems");

        biographyContainer.append(dataDiv);
        dataDiv.append(
          superHeroName,
          hr,
          biography,
          fullname,
          placeofBirth,
          firstAppearance,
          publisher,
          hr1
        );

        // Create appearance info.
        var appearance = $("<ul>")
          .text("Appearance")
          .addClass("text-left font-weight-bold infoheading ultitle");

        var gender = $("<li>")
          .text("Gender:" + " " + response.results[i].appearance.gender)
          .addClass("listitems");
        var hairColor = $("<li>")
          .text(
            "Hair color:" + " " + response.results[i].appearance["hair-color"]
          )
          .addClass("listitems");
        var race = $("<li>")
          .text("Race:" + " " + response.results[i].appearance.race)
          .addClass("listitems");
        var height = $("<li>")
          .text(
            "Height:" +
              " " +
              Object.values(response.results[i].appearance.height)
          )
          .addClass("listitems");
        var weight = $("<li>")
          .text(
            "Weight:" +
              " " +
              Object.values(response.results[i].appearance.weight)
          )
          .addClass("listitems");

        dataDiv.append(
          appearance,
          gender,
          hairColor,
          race,
          height,
          weight,
          hr2
        );

        // // Create work info.

        // var work = $("<ul>")
        //   .text("Work")
        //   .addClass("text-left font-weight-bold infoheading ultitle");
        // dataDiv.append(work);

        // var base = $("<li>")
        //   .text("Base:" + " " + response.results[i].work.base)
        //   .addClass("listitems");
        // var occupation = $("<li>")
        //   .text("Occupation:" + " " + response.results[i].work.occupation)
        //   .addClass("listitems");

        // dataDiv.append(base, occupation, hr3);

        // // Create Connections info.

        // var Connections = $("<ul>")
        //   .text("Connections")
        //   .addClass("text-left font-weight-bold infoheading ultitle");
        // dataDiv.append(Connections);

        // var groupAffiliation = $("<li>")
        //   .text(
        //     "Group Affiliation:" +
        //       " " +
        //       response.results[i].connections["group-affiliation"]
        //   )
        //   .addClass("listitems");
        // var relatives = $("<li>")
        //   .text("Relatives:" + " " + response.results[i].connections.relatives)
        //   .addClass("listitems");

        // dataDiv.append(groupAffiliation, relatives, hr4);

        // Create Powerstats info and skills bar.
        var combatValues = response.results[i].powerstats.combat;
        var durabilityValues = response.results[i].powerstats.durability;
        var intelligenceValues = response.results[i].powerstats.intelligence;
        var powerValues = response.results[i].powerstats.power;
        var speedValues = response.results[i].powerstats.speed;
        var strengthValues = response.results[i].powerstats.strength;

        var powerStats = $("<ul>")
          .text("Power Statistics")
          .addClass("text-left font-weight-bold infoheading ultitle");
        dataDiv.append(powerStats);

        var stattitle1 = $("<p>").text(
          "Combat:" + " " + combatValues + " " + "Rating"
        );
        var statdiv1 = $("<div>").addClass("barcontainer");
        var statdiv2 = $("<div>").addClass("skills");
        statdiv2.css({ width: combatValues + "%", backgroundColor: "#04AA6D" });
        dataDiv.append(stattitle1, statdiv1, statdiv2);

        var stattitle2 = $("<p>")
          .text("Durability")
          .text("Durability:" + " " + durabilityValues + " " + "Rating");
        var statdiv3 = $("<div>").addClass("barcontainer");
        var statdiv4 = $("<div>").addClass("skills");
        statdiv4.css({
          width: durabilityValues + "%",
          backgroundColor: "#04AA6D",
        });
        dataDiv.append(stattitle2, statdiv3, statdiv4);

        var stattitle3 = $("<p>")
          .text("Intelligence")
          .text("Intelligence:" + " " + intelligenceValues + " " + "Rating");
        var statdiv5 = $("<div>").addClass("barcontainer");
        var statdiv6 = $("<div>").addClass("skills");
        statdiv6.css({
          width: intelligenceValues + "%",
          backgroundColor: "#04AA6D",
        });
        dataDiv.append(stattitle3, statdiv5, statdiv6);

        var stattitle4 = $("<p>")
          .text("Power")
          .text("Power:" + " " + powerValues + " " + "Rating");
        var statdiv7 = $("<div>").addClass("barcontainer");
        var statdiv8 = $("<div>").addClass("skills");
        statdiv8.css({ width: powerValues + "%", backgroundColor: "#04AA6D" });
        dataDiv.append(stattitle4, statdiv7, statdiv8);

        var stattitle5 = $("<p>")
          .text("Speed")
          .text("Speed:" + " " + speedValues + " " + "Rating");
        var statdiv9 = $("<div>").addClass("barcontainer");
        var statdiv10 = $("<div>").addClass("skills");
        statdiv10.css({ width: speedValues + "%", backgroundColor: "#04AA6D" });
        dataDiv.append(stattitle5, statdiv9, statdiv10);

        var stattitle6 = $("<p>")
          .text("Strength")
          .text("Strength:" + " " + strengthValues + " " + "Rating");
        var statdiv11 = $("<div>").addClass("barcontainer");
        var statdiv12 = $("<div>").addClass("skills");
        statdiv12.css({
          width: strengthValues + "%",
          backgroundColor: "#04AA6D",
        });
        dataDiv.append(stattitle6, statdiv11, statdiv12);

        // Create Buttons
        var addFavBtn = $("<button>");
        addFavBtn.text("+ Add to favourites List").addClass("btn btn-primary btn-lg btn-block")
        dataDiv.append(addFavBtn)


        function storeCharacter() {
          // Stringify and set "todos" key in localStorage to todos array
          var favouriteCharacter = [response.results[i].name]
          console.log(favouriteCharacter)
          localStorage.setItem("favouriteCharacter", JSON.stringify(favouriteCharacter));
          
        }
        storeCharacter()
        
        function renderFavouritePage() {
          addFavBtn.on("click", function(){
          window.location.href = "favourites.html"
        })
      
        }
        renderFavouritePage()
      

      }
    });
  }
  });
}
superheroIndex();


        // // When form is submitted...
        // todoForm.addEventListener("submit", function(event) {
        //   event.preventDefault();
        
        //   var todoText = todoInput.value.trim();
        
        //   // Return from function early if submitted todoText is blank
        //   if (todoText === "") {
        //     return;
        //   }
        
        //   // Add new todoText to todos array, clear the input
        //   todos.push(todoText);
        //   todoInput.value = "";
        
        //   // Store updated todos in localStorage, re-render the list
        //   storeTodos();
        //   renderTodos();
        // });