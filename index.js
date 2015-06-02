var 
	request = require("request")
	, url = require("url")
;

function CronitorClient (option){
	this.access_token =  option.access_token || null;
	this.endpoint	= option.endpoint || "https://cronitor.io/v1";
	this.auth_header = new Buffer(this.access_token + ':').toString('base64');

}

/*****
* Create new cron on cronitor.io
*
* @params {Object}  cron objects
*
*/

CronitorClient.prototype.test = function(){

	var finalURL = url.resolve( this.endpoint, "/v1/monitors");


	var options = {
		url: finalURL,
		port: 443,
		headers: {
			'Authorization': 'Basic ' + this.auth_header
		}
	};

	request( options, 
			function(err, res, body){
				if(err){
					console.log( "Got Error:  %s", err );
					throw new Error( err);
				}else{

					if( res.statusCode === 403){
						console.log( body);
						console.log( "Access key invalid or absent");
						throw new Error("Access key invalid or absent");
					}
					console.log( body);
				}
		});

}

/****
* Create new monitor
* 
* @params { Object } obj monitor information
* @returns {Callback} callback (err, body)
*
*/
CronitorClient.prototype.new = function(obj, callback){

	var finalURL = url.resolve( this.endpoint, "/v1/monitors");


	var options = {
		method: 'POST',
		url: finalURL,
		port: 443,
		headers: {
			'Authorization': 'Basic ' + this.auth_header
			},
		body: obj,
		json: true
	};

	request( options, 
			function(err, res, body){
				if( res.statusCode !== 201){
					callback(body, null);
				}else{
					callback(err, body);
				}
		});
}

/**
* Fetch all monitors 
*
* @returns {Object} Array of monitors
*
*/
CronitorClient.prototype.all = function( callback){

	var finalURL = url.resolve( this.endpoint, "/v1/monitors");


	var options = {
		method: 'GET',
		url: finalURL,
		port: 443,
		headers: {
			'Authorization': 'Basic ' + this.auth_header
			},
		json: true
	};

	request( options, 
			function(err, res, body){

				if( res.statusCode !== 200){
					callback(body, null);
				}else
					callback(err, body);
		});
}


/**
* Read single monitor
*
* @params { String} monitor code
* @return {Object} monitor
*/

CronitorClient.prototype.get = function( code,callback){

	var finalURL = url.resolve( this.endpoint, "/v1/monitors/"+ code);


	var options = {
		method: 'GET',
		url: finalURL,
		port: 443,
		headers: {
			'Authorization': 'Basic ' + this.auth_header
			},
		json: true
	};

	request( options, 
			function(err, res, body){

				if( res.statusCode !== 200){
					callback(body, null);
				}else
					callback(err, body);
		});
}


/**
* Update  monitor
*
* @params { String} monitor code
* @params {Object} monitor info to update
* @return {Object} monitor
*/

CronitorClient.prototype.update = function( code, obj, callback){

	var finalURL = url.resolve( this.endpoint, "/v1/monitors/"+ code);


	var options = {
		method: 'PUT',
		url: finalURL,
		port: 443,
		headers: {
			'Authorization': 'Basic ' + this.auth_header
			},
		json: true
	};

	request( options, 
			function(err, res, body){

				if( res.statusCode !== 200){
					callback(body, null);
				}else
					callback(err, body);
		});
}


module.exports = CronitorClient;

