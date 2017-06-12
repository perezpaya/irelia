var Lollib = require('./lib/main.js');
var async = require('async');

var lol = new Lollib({
	secure: true,
	key: 'ddad33ef-e7a4-4d99-8af8-aa8bf5260db0', // TEST API KEY -> Better get your own cause if not rate limit will be exceeded all time
	debug: true
});

/*lol.getSummonerByName('euw', 'NSZombie', function (err, res){
	console.log(err, res);
});
*/

lol.getChallengerLeagueByGametype('euw', 'RANKED_SOLO_5x5', function (err, res){

	console.log('Err:' + err, 'Players in Challenger queue: ' + res.entries.length);

});

lol.getChampions('euw', true, function (err, res) {

	async.map(res.champions, function (champion, callback){

		callback(null, champion.id)

	}, function (err, champions){

		console.log('Err:' + err,  'Free champions:' + champions.join(', '));

	});

});
var region = "tr";
var callback = function (res,err) {};
var callback = function (res,err) {
	console.log("called");
};
var accountId = 207144678;
var summonerId = 11806239;
var name = "poizonemd"
var matchId = 554610172;
var championId = 12; //Alistar


lol.getChampions(region, true, callback);
lol.getRecentGamesByAccountId(region, accountId, callback);
lol.getChampionMastery(region, summonerId, championId, callback);
lol.getLeagueEntryBySummonerId(region, summonerId, callback);
lol.getSummonerByName(region, name, callback);
lol.getStatus(region, callback);
lol.getMatchByMatchId(region, matchId, callback);
lol.getTotalChampionMasteries(region, summonerId, callback);
lol.getTotalChampionMasteries(region, summonerId, callback);
