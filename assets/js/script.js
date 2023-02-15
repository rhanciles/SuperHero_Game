$(document).ready(function () {

	var superHeroes = [];
	// var villains = [];
	var playerDeck = [];
	var computerDeck = [];
	var playerTopCard = 0;
	var playerPrefStat = 0;
	var computerPrefStat = 0;
	var computerTopCard = 0;
	// var startOver = true;
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
			"sm": src="./assets/images/superhero-disabled.jpg",
			"md": "",
			"lg": ""
		}
	}]

	var startCard = [{
		"name": "Let's Play",
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
			"sm": src="./assets/images/superhero-start.jpg",
			"md": "",
			"lg": ""
		}
	}]

	//-------------------------------------------------------------------
	// CREATED A FUNCTION TO FETCH THE SUPERHEROES DATA VIA THE SERVER API IF BEING LOADED FOR THE FIRST TIME!!!
	// THAT WAY WE GET A RAMDOM SELECTION OF JUST HEROES WHICH IS THEN STORED IN LOCAL STORAGE!!! (DISABLED VALLIANS TO SCALE THINGS DOWN)
	// ************************************************************************ 
	// Left original code commented-out tp preserve Ranj's original code.
	//******************************************************************** */

	init();
	function init() {
		
		if (!fetchStoredData()) {
		// 	//getsuperHeroes();
		// 	//getvillains();
		// 	console.log("in the if...");
			stackDecks();
			console.log("after stacking deck ", computerDeck, playerDeck);
		};
		computerTopCard = 0;
		playerTopCard = 0;
		playerWins = 0;
		computerWins = 0;
		gameDraws = 0;
		gameOver = false;
		startOver = false;
		loadPage()
		
		//console.log("comp deck: "+computerDeck, "player deck: "+playerDeck);
	};

	
	function loadPage () {
		displayCard(startCard, "#playerCards");
		displayCardStats(startCard, "#playerCardStats");
		displayCard(startCard, "#computerCards");
		displayCardStats(startCard, "#computerCardStats");
	}


	function fetchRemoteData() {
		getsuperHeroes();
		//getvillains();
		console.log("in the if...");
		init();
	};

	$("#letsPlay").on("click", function(event) {

		renderNewCards("player");

	});

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

	function fetchStoredData() {
		// var storedVillians = localStorage.getItem("villains");
		var storedSuperheroes = localStorage.getItem("superHeroes");

		// if (storedVillians != "") {
		// 	if (storedVillians != null) {
		// 		villains = JSON.parse(storedVillians);
				if (storedSuperheroes != "") {
					if (storedSuperheroes != null) {
						superHeroes = JSON.parse(storedSuperheroes);
						stackDecks();
						computerTopCard = 0;
						playerTopCard = 0;
						return true;
					}
				}
				alert("You have no cards. Please press Fetch")
				return false;
		// 	}
		// }
		// return false;
	};

	$("#fetchData").on("click", function(event) {

		fetchRemoteData();

	});

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
			displayCard(plainCard, "#computerCards");
			displayCardStats(plainCard, "#computerCardStats");
			// $(".playerPlay").prop("disabled", true);
			// $(".computerPlay").prop("disabled", false);
			// $("#playerStatus").empty();
			$("#computerStatus").html("<h4>Choose your Power!</h4>");
		}
	};
	
	// event listener to trigger the player to play
	$(document).on("click", ".computerPlay", function(event) {
		event.preventDefault();
		//================== remove these two lines once we get computer play working correctly====================
		// computerPrefStat = $(this).attr("id");
		// computerPrefStat = computerPrefStat.substring(1);
		//===============================================================
		//---------------------------------------------------------------
		/* this code is towards making the computer play - though the logic isn't correct!!!!!
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
		//----------------------------------------------------------------
		console.log("game on from comp");
		gameOn(computerPrefStat, event);
		console.log("returning from comp game on");

	});


	function getComputerPrefStat() {
		var compPowerstats = computerDeck[0].powerstats;
		console.log("getting comp prefs: "+ compPowerstats["combat"]);

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
		console.log("player pref stat: " + playerPrefStat);
		displayCard(computerDeck, "#computerCards");
		displayCardStats(computerDeck, "#computerCardStats");
		console.log("about to game on player side");
		gameOn(playerPrefStat, event);
		console.log("returning from player game on");
	});

	function gameOn(prefs, event) {

		var playerPrefs = playerDeck[playerTopCard].powerstats[pref[prefs]];
		var compPrefs = computerDeck[computerTopCard].powerstats[pref[prefs]];
		// $(compPrefs).css({ 'background-color': '#fdcc52'});
		winner = "";
		console.log("comp prefs: "+ compPrefs, "player prefs: "+ playerPrefs);
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

				console.log(playerDeckCount)

				// show a graphic of card moving from comp to player here and make a whoosing noise?
			}
			else {
				$("#result").html("<h4>Player Wins</h4>");
				gameOver = true;
				displayCard(startCard, "#playerCards");
				displayCard(startCard, "#computerCards");
				setTimeout(() => {
					// enough time for the player to see the comp's powerstats...
					//renderNewCards(winner);
				}, 2000);
				//return;
				
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

				console.log(computerDeckCount)

				// show a graphic of card moving from player to comp here and make a whoosing noise?				
			}
			else {
				$("#result").html("<h4>Computer Wins</h4>");
				gameOver = true;
				displayCard(startCard, "#computerCards");
				displayCard(startCard, "#playerCards");
				/*
				setTimeout(() => {
					// enough time for the player to see the comp's powerstats...
					renderNewCards(winner);
				}, 2000);
				return;
				*/
			}
		}
		else {

			gameDraws++;
			console.log("its a draw"); // not taking anything away so just round robin the player & comp arrays
			playerDeck.push(playerDeck.shift()); // shift the player array in a round robin stylee
			computerDeck.push(computerDeck.shift()); // shift the comp array in a round robin stylee
			winner = "player";
		}


		$(".game-stats").empty();
		var gameStats = $("<div class='game-stats'>");
		var pScore = $("<p class='showScores'>" + "Player Wins: " + "<span class='score'>" + playerWins + "</span>");
		var cScore = $("<p class='showScores'>" + "Computer Wins: " + "<span class='score'>" + computerWins + "</span>");
		var dScore = $("<p class='showScores'>" + "Draws: " + "<span class='score'>" + gameDraws + "</span>");
	
		var finished = $("<h2>").text("Game Over!");
		if (computerDeckCount === 0 || playerDeckCount === 0) {
			displayCard(startCard, "#playerCards");
			displayCard(startCard, "#computerCards");
			$(".game-stats").html(finished);
			$(".computerPlay").prop("disabled", true);
			$(".playerPlay").prop("disabled", true);
			$("#computerStatus").empty();
			$("#playerStatus").empty();
			setTimeout(() => {
				// enough time for the player to see the comp's powerstats, etc...

				//renderNewCards("player");
			}, 2000);
			return;
		}
		else {
			$(".results").append(gameStats);
			$(gameStats).append(pScore, cScore, dScore);
			
		}

	console.log("game over: ", gameOver);

		// startOver should be an option via a modal or button in case the player wants to play again
		/*
		if (gameOver && startOver) {
			// put up a modal showing the results and giving the opportunity to the player to store high scores locally
			// and if they want to start over!
			init();
			return;
		};
		*/
		//  commented this out for now - we don't need this if not using comp!!!!!!
		if (!gameOver) {
			setTimeout(() => {
				// enough time for the player to see the comp's powerstats...
				renderNewCards(winner);
			}, 1500);

			/* commented out for comp player...
			// before rendering new cards, we need to wait to see the comp card else its just too damn quick!
			setTimeout(() => {
				// enough time for the player to see the comp's powerstats...

			}, 2000);
			*/
			console.log("player deck: "+playerDeck.length, "comp deck: "+computerDeck.length);
			/*	if (winner === "computer") {	  
				//alert("comp wins - about to trigger click");
				setTimeout(() => {
					// enough time for the player to see the comp's powerstats...
					//$(".computerPlay").trigger("click");
				}, 1000);

				return;
			};
			*/
		};
		
	};

	// listener for starting over
	$("#startOver").on("click", function(event) {
		// $("#gameStats").empty();
		// init();
			location.reload(true);
	});

	function getRandomNum(number) {
		return Math.floor(Math.random()*number);
	};
	

	function stackDecks() {
		// this is what we need to use in the end!!!! i.e change the for loop! (I find anything above 5 length could make the game very long)
		//for (var i=0; i<superHeroes.length/2; i++) {
			playerDeckCount = 0;
			computerDeckCount = 0;
			for (var i=0; i<=1; i++) { // remember to take this out after testing and reinsert the real one
			playerDeck.push(superHeroes[getRandomNum(superHeroes.length)]);
			computerDeck.push(superHeroes[getRandomNum(superHeroes.length)]);
			// playerDeck.push(villains[getRandomNum(villains.length)]);
			// computerDeck.push(villains[getRandomNum(villains.length)]);
			playerDeckCount++;
			computerDeckCount++;
		}
	};

	function displayCardStats(player, cardId) {
		if (cardId === "#computerCardStats") {
			if((cardId === "#computerCardStats" && computerDeckCount > 0) || 
			(cardId === "#playerCardStats" && playerDeckCount > 0) ) {
				var card = $("<div>").addClass("card");
				var name = $("<h4>").text("Card Count - " + computerDeckCount.valueOf());
		
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
				var name = $("<h4>").text(playerDeckCount.valueOf() + " - Card Count");
		
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

  