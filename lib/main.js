
"use strict";

var request = require('request');
var url = require('url');
var colors = require('colors');
var RequestError = require('./request_error');


// Inits class and saves settings in it

var lollib = function (settings){

	this.key = settings.key;
	this.endpoint = settings.endpoint;

	if(this.endpoint){
		console.log('Irelia has been updated to version 0.2 where we are using a new url system. You will have to update your config for using it. Check documentation at: '.cyan + 'https://github.com/alexperezpaya/irelia'.underline.blue);
	}

	if (settings.debug === true){
		this.debug = true;
	}

	this.secure = (settings.secure) ? settings.secure : false;
	this.host = settings.host;
	this.path = settings.path;

	return this;

};

// Generic functions -> can be called from the outside

lollib.prototype.generateUrl = function (options){

	if(options && options.query){
		options.query.api_key = this.key;
	} else {
		options.query = {api_key: this.key};
	}

	var host = (options.region.toLowerCase() == 'euw') ? 'euw.api.pvp.net' : this.host

	var result = url.format({
		protocol: (this.secure) ? 'https:' : 'http:',
		host: host + this.path +  options.region + options.path,
		query: options.query		
	});

	return result;

};

lollib.prototype.makeRequest = function (url, cb){

	if (this.debug){
		console.log('Calling url', url);
	}

	request.get(url, function (err, res, body){

		if (this.debug){
			console.log(body);
		};

		if(err){
			
			if (this.debug){
				console.log('Request err:', err);
			}

			cb(err);
		} else{
			if(res.statusCode === 200){
				try {

					body = JSON.parse(body);
					cb(null, body);
				} catch (e){

					cb(e);
				}
			} else {
				err = new RequestError(url, res.statusCode);
				cb(err);
			}

		}

	});

};

// LoLAPI Url Generator with parameters

lollib.prototype.getChampions = function (region, fp, cb){

	if(!cb && typeof fp === 'function'){
		cb = fp;
		fp = false;
	}

	var url = this.generateUrl({
		region: region,
		path: '/v1.2/champion',
		query: {
			freeToPlay: Boolean(fp)
		}
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getRecentGamesBySummonerId = function (region, summonerId, cb){

	var url = this.generateUrl({
		region: region,
		path: '/v1.3/game/by-summoner/' + summonerId + '/recent'
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getLeagueBySummonerId = function (region, summonerId, cb){

	var url = this.generateUrl({
		region: region,
		path: '/v2.4/league/by-summoner/' + summonerId
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getLeagueEntryBySummonerId = function (region, summonerId, cb){

	var url = this.generateUrl({
		region: region,
		path: '/v2.4/league/by-summoner/' + summonerId + '/entry'
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getChallengerLeagueByGametype = function (region, type, cb){

	var url = this.generateUrl({
		region: region,
		path: '/v2.4/league/challenger',
		query: {
			type: type
		}
	});

	// https://prod.api.pvp.net/api/lol/euw/v2.3/league/challenger?type=RANKED_SOLO_5x5&api_key=94f44207-a683-4b27-a7da-790a3ef66c6c

	this.makeRequest(url, cb);

};

lollib.prototype.getSummaryStatsBySummonerId = function (region, summonerId, season, cb){
	
	if(!cb && typeof season === 'function'){
		cb = season;
		season = null;
	}

	var query = {};

	if(season){
		query.season = season;
	}
	
	var url = this.generateUrl({
		region: region,
		path: '/v1.3/stats/by-summoner/' + summonerId + '/summary',
		query: query
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getRankedStatsBySummonerId = function (region, summonerId, season, cb){

	if(!cb && typeof season === 'function'){
		cb = season;
		season = null;
	}

	var query = {};

	if(season){
		query.season = season;
	}
	
	var url = this.generateUrl({
		region: region,
		path: '/v1.3/stats/by-summoner/' + summonerId + '/ranked',
		query: query
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getMasteriesBySummonerId = function (region, summonerId, cb) {

	var url = this.generateUrl({
		region: region,
		path: '/v1.4/summoner/' + summonerId + '/masteries'
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getRunesBySummonerId = function (region, summonerId, cb) {

	var url = this.generateUrl({
		region: region,
		path: '/v1.4/summoner/' + summonerId + '/runes'
	});

	this.makeRequest(url, cb);

};


lollib.prototype.getSummonerByName = function (region, name, cb){

	var url = this.generateUrl({
		region: region,
		path: '/v1.4/summoner/by-name/' + name
	});
	
	this.makeRequest(url, cb);

};

lollib.prototype.getSummonerBySummonerId = function (region, summonerId, cb){

	var url = this.generateUrl({
		region: region,
		path: '/v1.4/summoner/' + summonerId
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getSummonersBySummonerIds = function (region, summonerIds, cb){

	if(!(summonerIds instanceof Array)){
		summonerIds = [summonerIds];
	}

	var url = this.generateUrl({
		region: region,
		path: '/v1.4/summoner/' + summonerIds.join(',')
	});

	this.makeRequest(url, cb);

};

lollib.prototype.getTeamsBySummonerId = function (region, summonerId, cb) {

	var url = this.generateUrl({
		region: region,
		path: '/v2.2/team/by-summoner/' + summonerId
	});

	this.makeRequest(url, cb);

};


/* DDragon Private API */

lollib.prototype.getRealms = function (region, cb){

	var url = 'http://ddragon.leagueoflegends.com/realms/' + region + '.json';

	this.makeRequest(url, cb);

};

lollib.prototype.getRunes = function (version, locale, cb){

	var url = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/' + locale + '/rune.json';

	this.makeRequest(url, cb);

};

lollib.prototype.getMasteries = function (version, locale, cb){

	var url = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/' + locale + '/mastery.json';

	this.makeRequest(url, cb);

};

lollib.prototype.getChampionsData = function (version, locale, cb){

	var url = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/' + locale + '/champion.json';

	this.makeRequest(url, cb);

};

lollib.prototype.getSummonerSpells = function (version, locale, cb){

	var url = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/' + locale + '/summoner.json';

	this.makeRequest(url, cb);

};

lollib.prototype.getItems = function (version, locale, cb){

	var url = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/' + locale + '/item.json';

	this.makeRequest(url, cb);

};

lollib.prototype.getLanguage = function (version, locale, cb){

	var url = 'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/' + locale + '/language.json';

	this.makeRequest(url, cb);

};

// http://ddragon.leagueoflegends.com/cdn/3.14.41/data/en_US/champion/Ahri.json
// http://ddragon.leagueoflegends.com/cdn/3.14.41/data/en_US/item.json
// http://ddragon.leagueoflegends.com/realms/na.json
// http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_1.jpg

// DDragon Images

// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/mastery0.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/rune0.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/spell0.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/item0.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/item1.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/item2.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/champion0.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/champion1.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/champion2.png
// http://ddragon.leagueoflegends.com/cdn/4.2.6/img/sprite/champion3.png


lollib.prototype.regions = {
	'euw': 'Europe West',
	'eune': 'Europe Nordic and East',
	'na': 'North America',
	'br': 'Brazil',
	'oce': 'Oceania',
	'ru': 'Russia',
	'tr': 'Turkish',
	'lan': 'Latin America North',
	'las': 'Latin America South',
	'kr': 'Republic of Korea',
	'pbe': 'Public Beta Environment'
};

lollib.prototype.queues = {
	2: 'Normal 5v5 Blind Pick',
	4: 'Ranked Solo 5v5',
	7: 'Coop vs AI 5v5',
	8: 'Normal 3v3',
	14:	'Normal 5v5 Draft Pick',
	16:	'Dominion 5v5 Blind Pick',
	17:	'Dominion 5v5 Draft Pick',
	25: 'Dominion Coop vs AI',
	41:	'Ranked Team 3v3',
	42:	'Ranked Team 5v5',
	52:	'Twisted Treeline Coop vs AI',
	65:	'ARAM',
	67:	'ARAM Coop vs AI',
	72:	'Snowdown Showdown 1v1',
	73:	'Snowdown Showdown 2v2'
};

lollib.prototype.gametypes = {
	'CUSTOM_GAME': 'Custom game',
	'MATCHED_GAME':	'Matched game',
	'CO_OP_VS_AI_GAME': 'Bot game',
	'TUTORIAL_GAME': 'Tutorial game',
	'RANKED_SOLO_5x5': 'Ranked SoloQ',
	'RANKED_TEAM_5x5': 'Ranked Team 5v5',
	'RANKED_TEAM_3x3': 'Ranked Team 3v3'
};

lollib.prototype.gamemode = {
	'CLASSIC': 'Summoner\'s Rift/Twisted Treeline game',
	'ODIN': 'Dominion/Crystal Scar game',
	'ARAM':	'ARAM/Howling Abyss game',
	'TUTORIAL':	'Tutorial game'
};

module.exports = lollib;
