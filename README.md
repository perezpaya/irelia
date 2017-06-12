Irelia
======

[![Travis Status](https://api.travis-ci.org/alexperezpaya/irelia.png)](https://travis-ci.org/alexperezpaya/irelia)

[![NPM Download](https://nodei.co/npm/irelia.png?downloads=true)](https://www.npmjs.org/package/irelia)

Irelia is a Node.js Wrapper that will allow you to start coding easily with the [League of Legends Oficial API](http://developer.riotgames.com).

Get your API Key at [http://developer.riotgames.com](http://developer.riotgames.com)


There are API limits right now, so use the API with caching with Redis, Memcache, etc.


### Installation

```
npm install irelia
```

### Usage

```javascript
var Irelia = require('irelia');
var irelia = new Irelia({
	secure: true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
	host: 'api.riotgames.com',
	path: '/lol/',
>>>>>>> origin/master
=======
	host: 'api.riotgames.com',
	path: '/lol',
>>>>>>> parent of be04f3e... Status, Match, Champion Mastery v3 API
	key: 'your_key_goes_here',
	debug: true
});
irelia.getSummonerByName('euw', 'NSZombie', function (err, res){
	console.log(err, res);
});
```

### Errors

```javascript
var Irelia = require('irelia');
var irelia = new Irelia({
	secure: true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
	host: 'api.riotgames.com',
	path: '/lol/',
>>>>>>> origin/master
=======
	host: 'prod.api.pvp.net',
	path: '/api/lol/',
>>>>>>> parent of be04f3e... Status, Match, Champion Mastery v3 API
	key: 'your_key_goes_here',
	debug: true
});
irelia.getSummonerByName('euw', 'NSZombie', function (err, summoner){
	if(err){
		if(err.status){
			if(err.status.code == 429){
				console.log(err.status.message);
			} else if(err.status.code == 404){
				console.log(err.status.message);
			} else if(err.status.code == 500){
				console.log(err.status.message);
			} else {
				console.log('Unknown error code');
			}
		} else {
			console.log(err); // Non http error
		}
	} else {
		console.log(summoner);
	}
});
```

### Constants

- lol.regions['euw'] -> ***'Europe West'***
- lol.queues[2] -> ***'Normal 5v5 Blind Pick'***
- lol.gametypes['CUSTOM_GAME'] -> ***'Custom game'***
- lol.gamemode['CLASSIC'] -> ***'Summoner's Rift/Twisted Treeline game'***
- lol.regionCodes['euw'] -> ***'euw1'***

### Methods

Callbacks - Response is given asyncronly using callbacks.
```javascript
irelia.getChampions('euw', true, function (err, champions){
	console.log(err, champions);
});
```

- irelia.getChampions(region, freeToPlay[optional], callback);
- irelia.getRecentGamesByAccountId(region, accountId, callback);
- irelia.getLeagueBySummonerId(region, summonerId, callback);
<<<<<<< HEAD
<<<<<<< HEAD
=======
- irelia.getChampionMastery(region, summonerId, championId, callback);
>>>>>>> origin/master
=======
- irelia.getChampionMastery(region, summunerId, callback);
>>>>>>> parent of be04f3e... Status, Match, Champion Mastery v3 API
- irelia.getLeagueEntryBySummonerId(region, summonerId, callback);
- irelia.getChallengerLeagueByGametype(region, type[***example***'RANKED_SOLO_5X5'])
- irelia.getMasteriesBySummonerId(region, summonerId, callback);
- irelia.getRunesBySummonerId(region, summonerId, callback);
- irelia.getSummonerByName(region, name, callback);
- irelia.getSummonerBySummonerId(region, summonerId, callback);
<<<<<<< HEAD
<<<<<<< HEAD
- irelia.getSummonersBySummonerIds(region, summonerIds[Array list], callback);
- irelia.getTeamsBySummonerId(region, summonerId, callback);
- irelia.getChampions(region, true, callback);
- irelia.getRecentGamesByAccountId(region, accountId, callback);
- irelia.getChampionMastery(region, summonerId, championId, callback);
- irelia.getLeagueEntryBySummonerId(region, summonerId, callback);
- irelia.getSummonerByName(region, name, callback);
- irelia.getStatus(region, callback);
- irelia.getMatchByMatchId(region, matchId, callback);
=======
- irelia.getStatus(region, callback);
- irelia.getRecentMatchesByAccountId(region, accountId, callback);
- irelia.getRecentMatchesByAccountId(region, accountId, callback);
- irelia.getMatchByMatchId(region, matchId, callback);
- irelia.getAllMasteries(region, summonerId, callback);
>>>>>>> origin/master
- irelia.getTotalChampionMasteries(region, summonerId, callback);
=======
>>>>>>> parent of be04f3e... Status, Match, Champion Mastery v3 API

### Stats

- irelia.getRealms(region, callback);
- irelia.getRunes(version, locale, callback);
- irelia.getMasteries(version, locale, callback);
- irelia.getItems(version, locale, callback);
- irelia.getChampionsData(version, locale, callback);
- irelia.getSummonerSpells(version, locale, callback);
- irelia.getLanguage(version, locale, callback);

