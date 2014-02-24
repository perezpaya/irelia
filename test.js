var Lollib = require('./lib/main.js');

var lol = new Lollib({
	secure: true,
	host: 'prod.api.pvp.net',
	path: '/api/lol/',
	key: 'ddad33ef-e7a4-4d99-8af8-aa8bf5260db0', // TEST API KEY -> Better get your own cause if not rate limit will be exceeded all time
	debug: true
});

/*lol.getSummonerByName('euw', 'NSZombie', function (err, res){

	console.log(err, res);

});
*/

lol.getChampions('euw', true, function (err, res) {

	console.log(err, res);

});

lol.getRecentGamesBySummonerId('euw', 33682129, function (err, res) {
	console.log(err, res);
});

lol.getSummaryStatsBySummonerId('euw', 33682129, function (err, res) {
	console.log(err, res);
});
/*
console.log(lol.regions['euw']);
console.log(lol.queues[2]);
console.log(lol.gametypes['CUSTOM_GAME']);
console.log(lol.gamemode['CLASSIC']);
*/

/*

GET IMAGES AND OBJECT DATA

This isn't part of the API, but you can already retrieve JSON-formatted item and champion data. 

This link, for example, returns all items and their statistics in english for the current patch: 
http://ddragon.leagueoflegends.com/cdn/3.14.41/data/en_US/item.json 

There are a number of others for static data, such as champion.json, mastery.json, and rune.json. 

If you want more information for a specific champion (and maybe items, but I haven't checked), you can do so: 
http://ddragon.leagueoflegends.com/cdn/3.14.41/data/en_US/champion/Ahri.json 

Instead of hardcoding version numbers, I recommend getting the latest from this file (and other regions): 
http://ddragon.leagueoflegends.com/realms/na.json


*/