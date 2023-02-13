$(document).ready(function () {
	var superHeroes = [];
	var villains = [];
	var playerDeck = [];
	var computerDeck = [];
	var playerTopCard = 0;
	var playerPrefStat = 0;
	var computerPrefStat = 0;
	var computerTopCard = 0;
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
	if (fetchStoredData()) {
		//getsuperHeroes();
		//getvillains();
	};



	stackDecks();
	displayCard(playerDeck, playerTopCard, "#playerCards");
	displayCard(plainCard, 0, "#computerCards");
	displayCardStats(playerDeck, playerTopCard, "#playerCardStats");
	displayCardStats(plainCard, 0, "#computerCardStats");

	// event listener to trigger the computer to play
	$(document).on("click", ".play", function(event) {
		event.preventDefault();
		playerPrefStat = $(this).attr("id");
		console.log(playerPrefStat);

		displayCard(computerDeck, computerTopCard, "#computerCards");
		displayCardStats(computerDeck, computerTopCard, "#computerCardStats");
		console.log(pref);
//console.log(playerDeck[playerTopCard].powerstats.pref[0]);


		var preference = pref[playerPrefStat].toString();
		var playerPrefs = playerDeck[playerTopCard].powerstats.$(preference);// .powerstats.preference;
		var compPrefs = computerDeck[computerTopCard].powerstats.$(preference);

console.log(preference);
console.log(playerPrefs);//.preference.toString());
console.log(compPrefs);//.preference.toString());
		if (playerPrefs > compPrefs) {
			console.log("player wins");
		}
		else if (playerPrefs < compPrefs) {
			console.log("computer wins");
		}
		else {
			console.log("its a draw");
		}
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

		var power = $("<button>").attr({class: "btn btn-outline play", id: "3"});
		power.append($("<p>").text("Power: " + player[index].powerstats.power));
		
		var strength = $("<button>").attr({class: "btn btn-outline play", id: "5"});
		strength.append($("<p>").text("Strength: " + player[index].powerstats.strength));

		var intelligence = $("<button>").attr({class: "btn btn-outline play", id: "2"});
		intelligence.append($("<p>").text("Intelligence: " + player[index].powerstats.intelligence));

		var speed = $("<button>").attr({class: "btn btn-outline play", id: "4"});
		speed.append($("<p>").text("Speed: " + player[index].powerstats.speed));

		var combat = $("<button>").attr({class: "btn btn-outline play", id: "0"});
		combat.append($("<p>").text("Combat: " + player[index].powerstats.combat));

		var durability = $("<button>").attr({class: "btn btn-outline play", id: "1"});
		durability.append($("<p>").text("Durability: " + player[index].powerstats.durability));
	  
		
		card.append(name, combat, durability, intelligence, power, speed, strength);
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

  
