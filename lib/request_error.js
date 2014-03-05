var RequestError = function(url, statusCode){
	Error.call(this);
	Error.captureStackTrace(this, RequestError);

	this.name = 'RequestError';
	this.url = url;
	this.statusCode = statusCode;
	this.message = 'HTTP Status Code ' + statusCode + ' received when requesting ' + url;

	this.populateStatus();
};
RequestError.prototype = new Error();
RequestError.prototype.constructor = RequestError;

RequestError.prototype.populateStatus = function(){
	if(this.statusCode === 404){
		this.status = {
			message: 'Not found',
			code: this.statusCode
		};
	} else if(this.statusCode === 429){
		this.status = {
			message: 'Rate limit exceeded',
			code: this.statusCode
		};
	} else if(this.statusCode === 500){
		this.status = {
			message: 'Internal server error',
			code: this.statusCode
		};
	} else {
		this.status = {
			message: 'Unknown error',
			code: 0
		};
	}
};

module.exports = RequestError;
