
var request = require('request');

// Inits class and saves settings in it

var lollib = function (settings){

	this.key = settings.key;
	this.endpoint = settings.endpoint;
	
	if (settings.debug === true){
		this.debug = true;
	};

	return this;

};

// Generic functions -> can be called from the outside

lollib.prototype.makeRequest = function (url, cb){

	if (this.debug){
		console.log('Calling url', url);
	};

	request.get(url, function (err, res, body){

		if (this.debug){
			console.log(body);
		};

		if(err){
			
			if (this.debug){
				console.log('Err:', err);
			}

			cb(err);
		} else{

			try {

				body = JSON.parse(body);
				cb(null, body);
			} catch (e){

				cb(e);
			}

		}

	});

}

// LoLAPI Url Generator with parameters

lollib.prototype.getChampions = function (region, fp, cb){

	if(!cb && typeof fp == 'function'){
		cb = season;
	}

	var url = this.endpoint + region + '/v1.1/champion?freeToPlay='+Boolean(fp)+'&api_key=' + this.key;

	this.makeRequest(url, cb);

};

lollib.prototype.getRecentGamesBySummonerId = function (region, summonerId, cb){

	var url = this.endpoint + region + '/v1.2/game/by-summoner/' + summonerId + '/recent?api_key=' + this.key; 
	this.makeRequest(url, cb);

};

lollib.prototype.getLeagueBySummonerId = function (region, summonerId, cb){

	var url = this.endpoint + region + '/v2.2/league/by-summoner/' + summonerId + '?api_key=' + this.key; 
	this.makeRequest(url, cb);

};


lollib.prototype.getSummaryStatsBySummonerId = function (region, summonerId, season, cb){
	
	if(!cb && typeof season == 'function'){
		cb = season;
		season = null;
	}
	
	var url = this.endpoint + region + '/v1.2/stats/by-summoner/' + summonerId + '/summary?api_key=' + this.key + ((season == undefined || season == null) ? ('') : ('&season=' + season));

	this.makeRequest(url, cb);

};

lollib.prototype.getRankedStatsBySummonerId = function (region, summonerId, season, cb){

	if(!cb && typeof season == 'function'){
		cb = season;
		season = null;
	}

	var url = this.endpoint + region + '/v1.2/stats/by-summoner/' + summonerId + '/ranked?api_key=' + this.key + ((season == undefined || season == null) ? ('') : ('&season=' + season));
	this.makeRequest(url, cb);

};

lollib.prototype.getMasteriesBySummonerId = function (region, summonerId, cb) {

	var url = this.endpoint + region + '/v1.1/summoner/' + summonerId + '/masteries?api_key=' + this.key; 
	this.makeRequest(url, cb);

};

lollib.prototype.getRunesBySummonerId = function (region, summonerId, cb) {

	var url = this.endpoint + region + '/v1.1/summoner/' + summonerId + '/runes?api_key=' + this.key; 
	this.makeRequest(url, cb);

};


lollib.prototype.getSummonerByName = function (region, name, cb){

	var url = this.endpoint + region + '/v1.1/summoner/by-name/' + name + '?api_key=' + this.key; 
	this.makeRequest(url, cb);

};

lollib.prototype.getSummonerBySummonerId = function (region, summonerId, cb){

	var url = this.endpoint + region + '/v1.1/summoner/' + summonerId + '?api_key=' + this.key; 
	this.makeRequest(url, cb);

};

lollib.prototype.getNamesBySummonerIds = function (region, summonerIds, cb){

	var url = this.endpoint + region + '/v1.1/summoner/' + summonerIds.join(',') + '?api_key=' + this.key; 
	this.makeRequest(url, cb);

};

lollib.prototype.getTeamsBySummonerId = function (region, summonerId, cb) {

	var url = this.endpoint + region + '/v2.2/team/by-summoner/' + summonerId + '?api_key=' + this.key; 
	this.makeRequest(url, cb);

}

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
}

lollib.prototype.gametypes = {
	'CUSTOM_GAME': 'Custom game',
	'MATCHED_GAME':	'Matched game',
	'CO_OP_VS_AI_GAME':	'Bot game',
	'TUTORIAL_GAME':	'Tutorial game'
}

lollib.prototype.gamemode = {
	'CLASSIC': 'Summoner\'s Rift/Twisted Treeline game',
	'ODIN': 'Dominion/Crystal Scar game',
	'ARAM':	'ARAM/Howling Abyss game',
	'TUTORIAL':	'Tutorial game'
}

module.exports = lollib;