$(document).ready(function () {

	var superHeroes = [];
	var villains = [];
	var playerDeck = [];
	var computerDeck = [];
	var playerTopCard = 0;
	var playerPrefStat = 0;
	var computerPrefStat = 0;
	var computerTopCard = 0;
	var startOver = true;
	var gameOver = false;
	var playerWins = 0;
	var computerWins = 0;
	var gameDraws = 0;
	var playerDeckCount = 0;
	var computerDeckCount = 0;
	var winner = "";
	pref = ["combat", "durability", "intelligence", "power", "speed", "strength"]
	var plainCard = [{
		"name": "Secret",
		"powerstats":{
			"combat": "",
			"durability": "",
			"intelligence": "",
			"power": "",
			"speed": "",
			"strength": ""
		},
		"images": {
			"xs": "",
			"sm": "",
			"md": "",
			"lg": ""
		}
	}]


	// this is only whilst testing!!
	// ALWAYS FETCH THE SUPERHEROES & VILLIANS DATA VIA THE SERVER API!!!!!!!!
	// THAT WAY WE GET A RAMDOM SELECTION OF HEROES & VILLAINS!!!!!!!!!!!!!!!!
	/*************************************************************************************** 
	 uncomment the calls to get the superheroes, this will put the data in local storage. 
	 THEN RE-COMMENT them both, so we don't use up the data fetch limits and can carry on 
	 working with the data locally
	****************************************************************************************/
	init();
	function init() {
		
		if (!fetchStoredData()) {
			//getsuperHeroes();
			//getvillains();
			console.log("in the if...");
			stackDecks();
			console.log("after stacking deck ", computerDeck, playerDeck);
		};
		computerTopCard = 0;
		playerTopCard = 0;
		var playerwins = 0;
		var ComputerWins = 0;
		var gameDraws = 0;
		renderNewCards("player");
		gameOver = false;
		startOver = false;
		
		//fetchCoolBackground();
		//console.log("comp deck: "+computerDeck, "player deck: "+playerDeck);
	};

	function fetchCoolBackground() {
		//var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=XDcKP9yHzjMMGS3G6VfDutHpZSq3DAY5";
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=XDcKP9yHzjMMGS3G6VfDutHpZSq3DAY5&q=blackholes@xponentialdesign";

		$.ajax({
		  url: queryURL,
		  method: "GET"
		}).then(function(response) {
		  console.log(response);
		  $("body").append("<img src='"+response.data[3].images.original.url+"'>");
		  
		//   for (var i=0; i<response.data.length; i++) {

		// 	$("body").append("<img src='"+response.data[i].images.original.url+"'>");
		//   }
		  //$("body").append("<img src='https://media.giphy.com/media/Tj4jjaCxXRVSARsUzN/giphy.gif?cid=ecf05e47v74p9cft7m8gufk11q5k1yr8vgpin4xmh91d2s66&rid=giphy.gif&ct=g'");
		});

	}
	function renderNewCards(winner) {
		displayCard(playerDeck, "#playerCards");
		displayCardStats(playerDeck, "#playerCardStats");
		if (winner === "player") {
			displayCard(plainCard, "#computerCards");
			displayCardStats(plainCard, "#computerCardStats");
			$(".computerPlay").prop("disabled", true);
			$(".playerPlay").prop("disabled", false);
			$("#computerStatus").empty();
			$("#playerStatus").html("<h4>Choose your Power!</h4>");
		}
		else {
			displayCard(computerDeck, "#computerCards");
			displayCardStats(computerDeck, "#computerCardStats");
			$(".playerPlay").prop("disabled", true);
			$(".computerPlay").prop("disabled", false);
			$("#playerStatus").empty();
			$("#computerStatus").html("<h4>Choose your Power!</h4>");
		}
	};

	// event listener to trigger the player to play
	$(document).on("click", ".computerPlay", function(event) {
		event.preventDefault();
		//================== remove these two lines once we get computer play working correctly====================
		computerPrefStat = $(this).attr("id");
		computerPrefStat = computerPrefStat.substring(1);
		//====================================================================


/* this code is towards making the computer play - though tghe logic isn't correct!!!!!
		computerPrefStat = getComputerPrefStat();

		console.log("before: ", $("#0c"));
		if (computerPrefStat === $("#0c")) {
				$("#0c").addClass("active");
		}
		console.log("after: ", $("#0c"));
		setTimeout(() => {
			// enough time for the player to see the comp's powerstats...
			console.log("game on from comp");
			gameOn(computerPrefStat, event);
			console.log("returning from comp game on");
		}, 60000);
		*/
		console.log("game on from comp");
		gameOn(computerPrefStat, event);
		console.log("returning from comp game on");

	});
	function getComputerPrefStat() {
		var compPowerstats= computerDeck[0].powerstats;
		console.log("getting comp prefs: "+compPowerstats["combat"]);

		var computerPrefStat = Math.max(
								compPowerstats["combat"], 
								compPowerstats["durability"],
								compPowerstats["intelligence"], 
								compPowerstats["power"], 
								compPowerstats["speed"], 
								compPowerstats["strength"]  );

		var index = 0;
		if (compPowerstats["combat"] === computerPrefStat) {
			index=0;
		}
		else if (compPowerstats["durability"] === computerPrefStat) {
			index=1;
		}
		else if (compPowerstats["intelligence"] === computerPrefStat) {
			index=2;
		}
		else if (compPowerstats["power"] === computerPrefStat) {
			index=3;
		}
		else if (compPowerstats["speed"] === computerPrefStat) {
			index=4;
		}
		else if (compPowerstats["strength"] === computerPrefStat) {
			index=5;
		}
		console.log("index: ", index);		
		return index;
	};

	// event listener to trigger the computer to play
	$(document).on("click", ".playerPlay", function(event) {
		event.preventDefault();
		playerPrefStat = $(this).attr("id");
		console.log("player pref stat: "+playerPrefStat);
		displayCard(computerDeck, "#computerCards");
		displayCardStats(computerDeck, "#computerCardStats");
		console.log("about to game on player side");
		gameOn(playerPrefStat, event);
		console.log("returning from player game on");
	});

	function gameOn(prefs, event) {

		var playerPrefs = playerDeck[playerTopCard].powerstats[pref[prefs]];
		var compPrefs = computerDeck[computerTopCard].powerstats[pref[prefs]];
		winner = "";
		console.log("comp prefs: "+compPrefs, "player prefs: "+playerPrefs);
		if (playerPrefs > compPrefs) {
			console.log("player wins");

			playerWins++;
			if (computerDeckCount > 0) {
				computerDeckCount--;
				playerDeckCount++;
				playerDeck.push(computerDeck.shift()); // take away from comp deck and plonk it at the end of player deck
				playerDeck.push(playerDeck.shift()); // shift the player array in a round robin stylee
				computerDeck.push(computerDeck.shift()); // shift the comp array in a round robin stylee
				winner = "player";

				// show a graphic of card moving from comp to player here and make a whoosing noise?
			}
			else {
				$("#result").html("<h4>Player Wins</h4>");
				gameOver = true;
				setTimeout(() => {
					// enough time for the player to see the comp's powerstats...
					renderNewCards(winner);
				}, 2000);
				return;
			}
		}
		else if (playerPrefs < compPrefs) {
			console.log("computer wins");
			computerWins++;
			if (playerDeckCount > 0) {
				playerDeckCount--;
				computerDeckCount++;
				computerDeck.push(playerDeck.shift()); // take away from playe deck and plonk it at the end of comp deck
				playerDeck.push(playerDeck.shift()); // shift the player array in a round robin stylee
				computerDeck.push(computerDeck.shift()); // shift the comp array in a round robin stylee
				winner = "computer";

				// show a graphic of card moving from player to comp here and make a whoosing noise?				
			}
			else {
				$("#result").html("<h4>Computer Wins</h4>");
				gameOver = true;
				setTimeout(() => {
					// enough time for the player to see the comp's powerstats...
					renderNewCards(winner);
				}, 2000);
				return;
			}
		}
		else {

			gameDraws++;
			console.log("its a draw"); // not taking anything away so just round robin the player & comp arrays
			playerDeck.push(playerDeck.shift()); // shift the player array in a round robin stylee
			computerDeck.push(computerDeck.shift()); // shift the comp array in a round robin stylee
			renderNewCards("player");
		}


		$("#gameStats").empty();
		var gameStats = $("<h4>").text("Player Wins: "+playerWins+"  Computer Wins: "+computerWins+"  Draws: "+gameDraws);
		var finished = $("<h4>").text("We are Done! ");
		if (computerDeckCount === 0 || playerDeckCount === 0) {
			$("#gameStats").append(gameStats, finished);
			setTimeout(() => {
				// enough time for the player to see the comp's powerstats...
				renderNewCards(winner);
			}, 2000);
			return;
		}
		else {
			$("#gameStats").append(gameStats);
		}

console.log("game over: ", gameOver);

		// startOver should be an option via a modal or button in case the player wants to play again
		if (gameOver && startOver) {
			// put up a modal showing the results and giving the opportunity to the player to store high scores locally
			// and if they want to start over!
			init();
			return;
		}
		else if (!gameOver) {
			// before rendering new cards, we need to wait to see the comp card else its just too damn quick!
			setTimeout(() => {
				// enough time for the player to see the comp's powerstats...
				renderNewCards(winner);
			}, 2000);

			console.log("player deck: "+playerDeck.length, "comp deck: "+computerDeck.length);
			if (winner === "computer") {	  
				//alert("comp wins - about to trigger click");
				setTimeout(() => {
					// enough time for the player to see the comp's powerstats...
					//$(".computerPlay").trigger("click");
				}, 1000);

				return;
			};
		};
	};

	function getsuperHeroes() {
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://superhero-search.p.rapidapi.com/api/heroes",
			//"url": "https://superhero-search.p.rapidapi.com/api/T-1000",
			"method": "GET",
			"headers": {
				"X-RapidAPI-Key": "d6635ac111msh992f1915364a87ep116fffjsne5b314922727",
				"X-RapidAPI-Host": "superhero-search.p.rapidapi.com"
			}
		}
		$.ajax(settings).done(function (response) {
			superHeroes = JSON.parse(response);
			//console.log(superHeroes.length);
			//console.log(superHeroes);
			//for (var i=0; i<superHeroes.length; i++) {
			//	console.log(superHeroes[i].name);
			//}
			localStorage.setItem("superHeroes", JSON.stringify(superHeroes));

		});
	};

	function getvillains() {
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://superhero-search.p.rapidapi.com/api/villains",
			//"url": "https://superhero-search.p.rapidapi.com/api/T-1000",
			"method": "GET",
			"headers": {
				"X-RapidAPI-Key": "d6635ac111msh992f1915364a87ep116fffjsne5b314922727",
				"X-RapidAPI-Host": "superhero-search.p.rapidapi.com"
			}
		}
		$.ajax(settings).done(function (response) {
			villains = JSON.parse(response);
			//console.log(villains.length);
			//console.log(villains);
			//for (var i=0; i<villains.length; i++) {
			//	console.log(villains[i].name);
			//}
			localStorage.setItem("villains", JSON.stringify(villains));

		});
	};

	function fetchStoredData() {
		var storedVillians = localStorage.getItem("villains");
		var storedSuperheroes = localStorage.getItem("superHeroes");

		if (storedVillians != "") {
			if (storedVillians != null) {
				villains = JSON.parse(storedVillians);
				if (storedSuperheroes != "") {
					if (storedSuperheroes != null) {
						superHeroes = JSON.parse(storedSuperheroes);
						stackDecks();
						computerTopCard = 0;
						playerTopCard = 0;
						return true;
					}
				}
				return false;
			}
		}
		return false;
	};

	function stackDecks() {
		//for (var i=0; i<superHeroes.length/2; i++) {
			playerDeckCount = 0;
			computerDeckCount = 0;
			for (var i=0; i<=1; i++) { // remember to take this out after testing and reinsert the real one
			playerDeck.push(superHeroes[getRandomNum(superHeroes.length)]);
			computerDeck.push(superHeroes[getRandomNum(superHeroes.length)]);
			playerDeck.push(villains[getRandomNum(villains.length)]);
			computerDeck.push(villains[getRandomNum(villains.length)]);
			playerDeckCount++;
			computerDeckCount++;
		}
	};

	function getRandomNum(number) {
		return Math.floor(Math.random()*number);
	};

	function displayCardStats(player, cardId) {
		if (cardId === "#computerCardStats") {
			if((cardId === "#computerCardStats" && computerDeckCount > 0) || 
			(cardId === "#playerCardStats" && playerDeckCount > 0) ) {
				var card = $("<div>").addClass("card");
				var name = $("<h4>").text(player[0].name);
		
				var power = $("<button>").attr({class: "btn btn-outline computerPlay", id: "33"});
				power.append($("<p>").text("Power: " + player[0].powerstats.power));
				
				var strength = $("<button>").attr({class: "btn btn-outline computerPlay", id: "55"});
				strength.append($("<p>").text("Strength: " + player[0].powerstats.strength));
		
				var intelligence = $("<button>").attr({class: "btn btn-outline computerPlay", id: "22"});
				intelligence.append($("<p>").text("Intelligence: " + player[0].powerstats.intelligence));
		
				var speed = $("<button>").attr({class: "btn btn-outline computerPlay", id: "44"});
				speed.append($("<p>").text("Speed: " + player[0].powerstats.speed));
		
				var combat = $("<button>").attr({class: "btn btn-outline computerPlay", id: "00"});
				combat.append($("<p>").text("Combat: " + player[0].powerstats.combat));
		
				var durability = $("<button>").attr({class: "btn btn-outline computerPlay", id: "11"});
				durability.append($("<p>").text("Durability: " + player[0].powerstats.durability));
			
				
				card.append(name, combat, durability, intelligence, power, speed, strength);
				$(cardId).html(card);
			}
		}
		else if(cardId === "#playerCardStats") {
			if((cardId === "#computerCardStats" && computerDeckCount > 0) || 
				(cardId === "#playerCardStats" && playerDeckCount > 0) ) {
				var card = $("<div>").addClass("card");
				var name = $("<h4>").text(player[0].name);
		
				var power = $("<button>").attr({class: "btn btn-outline playerPlay", id: "3"});
				power.append($("<p>").text("Power: " + player[0].powerstats.power));
				
				var strength = $("<button>").attr({class: "btn btn-outline playerPlay", id: "5"});
				strength.append($("<p>").text("Strength: " + player[0].powerstats.strength));
		
				var intelligence = $("<button>").attr({class: "btn btn-outline playerPlay", id: "2"});
				intelligence.append($("<p>").text("Intelligence: " + player[0].powerstats.intelligence));
		
				var speed = $("<button>").attr({class: "btn btn-outline playerPlay", id: "4"});
				speed.append($("<p>").text("Speed: " + player[0].powerstats.speed));
		
				var combat = $("<button>").attr({class: "btn btn-outline playerPlay", id: "0"});
				combat.append($("<p>").text("Combat: " + player[0].powerstats.combat));
		
				var durability = $("<button>").attr({class: "btn btn-outline playerPlay", id: "1"});
				durability.append($("<p>").text("Durability: " + player[0].powerstats.durability));
			
				
				card.append(name, combat, durability, intelligence, power, speed, strength);
				$(cardId).html(card);				
			}
		}
	};

	function displayCard(player, cardId) {
		if((cardId === "#computerCards" && computerDeckCount > 0) || 
		(cardId === "#playerCards" && playerDeckCount > 0) ) {
			var card = $("<div>").addClass("card");
			var name = $("<h4>").text(player[0].name);
			var img = $("<img>").attr("src", player[0].images.sm);
				
			card.append(name, img);
			$(cardId).html(card);
		}
	};
});

// toggle the navigation start

$(document).ready(function() {
	$(".navbar-toggler").click(function() {
	  $("#navbarNav").toggle();
	});
  });
  
  // toggle naivgation end