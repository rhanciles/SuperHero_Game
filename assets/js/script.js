const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://superhero-search.p.rapidapi.com/api/villains",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "d6635ac111msh992f1915364a87ep116fffjsne5b314922727",
		"X-RapidAPI-Host": "superhero-search.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});