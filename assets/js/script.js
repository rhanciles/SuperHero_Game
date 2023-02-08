$(document).ready(function () {
	var superHeroes = [];
	var villains = [];
	var playerDeck = [];
	var computerDeck = [];
	var playerTopCard = 0;
	var computerTopCard = 0;


	// this is only whilst testing!!
	// ALWAYS FETCH THE SUPERHEROES & VILLIANS DATA VIA THE SERVER API!!!!!!!!
	// THAT WAY WE GET A RAMDOM SELECTION OF HEROES & VILLAINS!!!!!!!!!!!!!!!!
	/*************************************************************************************** 
	 uncomment the calls to get the superheroes, this will put the data in local storage. 
	 THEN RE-COMMENT them both, so we don't use up the data fetch limits and can carry on 
	 working with the data locally
	****************************************************************************************/
	if (!fetchStoredData()) {
		//getsuperHeroes();
		//getvillains();
	};



	stackDecks();
	displayCard(playerDeck, playerTopCard, "#playerCards");
	displayCard(computerDeck, computerTopCard, "#computerCards");
	displayCardStats(playerDeck, playerTopCard, "#playerCardStats");
	displayCardStats(computerDeck, computerTopCard, "#computerCardStats");

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
			console.log(superHeroes.length);
			console.log(superHeroes);
			for (var i=0; i<superHeroes.length; i++) {
				console.log(superHeroes[i].name);
			}
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
			console.log(villains.length);
			console.log(villains);
			for (var i=0; i<villains.length; i++) {
				console.log(villains[i].name);
			}
			localStorage.setItem("villains", JSON.stringify(villains));

		});
	};

	function fetchStoredData() {
		var storedVillians = localStorage.getItem("villains");
		var storedSuperheroes = localStorage.getItem("superHeroes");
		if (storedVillians != "") {
			villains = JSON.parse(storedVillians);
			if (storedSuperheroes != "") {
				superHeroes = JSON.parse(storedSuperheroes);
				return true;
			}
			return false;
		}
		return false;
	};

	function stackDecks() {
		for (var i=0; i<superHeroes.length/2; i++) {
			playerDeck.push(superHeroes[getRandomNum(superHeroes.length)]);
			computerDeck.push(superHeroes[getRandomNum(superHeroes.length)]);
			playerDeck.push(villains[getRandomNum(villains.length)]);
			computerDeck.push(villains[getRandomNum(villains.length)]);
		}

	};

	function getRandomNum(number) {
		return Math.floor(Math.random()*number);
	};

	function displayCardStats(player, index, cardId) {
		var card = $("<div>").addClass("card");
		var name = $("<h4>").text(player[index].name);
		var power = $("<p>").text("Power: " + player[index].powerstats.power);
		var strength = $("<p>").text("Strength: " + player[index].powerstats.strength);
		var intelligence = $("<p>").text("Intelligence: " + player[index].powerstats.intelligence);
		var speed = $("<p>").text("Speed: " + player[index].powerstats.speed);
		var combat = $("<p>").text("Combat: " + player[index].powerstats.combat);
		var durability = $("<p>").text("Durability: " + player[index].powerstats.durability);
	  
		card.append(name, power, strength, intelligence, speed, combat, durability);
		$(cardId).html(card);

	};

	function displayCard(player, index, cardId) {
		var card = $("<div>").addClass("card");
		var name = $("<h4>").text(player[index].name);
		var img = $("<img>").attr("src", player[index].images.sm);
			  
		card.append(name, img);
		$(cardId).html(card);
	};
});

  
