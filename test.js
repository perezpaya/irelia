var Lollib = require('./lollib.js');

var lol = new Lollib({
	endpoint: 'http://prod.api.pvp.net/api/lol/',
	key: 'your_key_goes_here',
	debug: true
});

lol.getSummonerByName('euw', 'NSZombie', function (err, res){

	console.log(err, res);

});

/*lol.getChampions('euw', true, function (err, res) {

	console.log(err, res);

});*/

/*lol.getRecentGamesBySummonerId('euw', 33682129, function (err, res) {
	console.log(err, res);
});*/

/*lol.getSummaryStatsBySummonerId('euw', 33682129, 'SEASON3', function (err, res) {
	console.log(err, res);
});*/