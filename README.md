#Irelia
======

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
	endpoint: 'http://prod.api.pvp.net/api/lol/',
	key: 'your_key_goes_here',
	debug: true
});
irelia.getSummonerByName('euw', 'NSZombie', function (err, res){
	console.log(err, res);
});
```

### Methods

Callbacks - Response is given asyncronly using callbacks.
```javascript
irelia.getChampions('euw', true, function (err, champions){
	console.log(err, champions);
});
```

- getChampions(region, freeToPlay[optional], callback);
- getRecentGamesBySummonerId(region, summonerId, callback);
- getLeagueBySummonerId(region, summonerId, callback);
- getSummaryStatsBySummonerId(region, summonerId, season [optional], callback);
- getRankedStatsBySummonerId(region, summonerId, season [optional], callback);
- getMasteriesBySummonerId(region, summonerId, callback);
- getRunesBySummonerId(region, summonerId, callback);
- getSummonerByName(region, name, callback);
- getSummonerBySummonerId(region, summonerId, callback);
- getNamesBySummonerIds(region, summonerIds[Array list], callback);
- getTeamsBySummonerId(region, summonerId, callback);