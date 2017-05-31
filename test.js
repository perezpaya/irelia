var Lollib = require('./lib/main.js');
var async = require('async');

var lol = new Lollib({
	secure: true,
	host: 'api.riotgames.com',
	path: '/lol/',
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
var accountId = 207144678;
var summonerId = 11806239;
var name = "poizonemd"
var matchId = 554610172;

irelia.getChampions(region, true, callback);
irelia.getRecentGamesByAccountId(region, accountId, callback);
irelia.getLeagueBySummonerId(region, summonerId, callback);
irelia.getChampionMastery(region, summonerId, championId, callback);
irelia.getLeagueEntryBySummonerId(region, summonerId, callback);
irelia.getChallengerLeagueByGametype(region, 'RANKED_SOLO_5X5');
irelia.getMasteriesBySummonerId(region, summonerId, callback);
irelia.getRunesBySummonerId(region, summonerId, callback);
irelia.getSummonerByName(region, name, callback);
irelia.getSummonerBySummonerId(region, summonerId, callback);
irelia.getStatus(region, callback);
irelia.getRecentMatchesByAccountId(region, accountId, callback);
irelia.getRecentMatchesByAccountId(region, accountId, callback);
irelia.getMatchByMatchId(region, matchId, callback);
irelia.getAllMasteries(region, summonerId, callback);
irelia.getTotalChampionMasteries(region, summonerId, callback);
