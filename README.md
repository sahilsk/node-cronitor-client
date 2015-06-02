nodejs cronitor.io client  
-------------------------

An unofficial simple asynchronous node.js client to ease working with cronitor.io API's.

How-to
--------

- Create new CronitorClient instance    

``` js
var cc = new CronitorClient({
				access_token: <Acess key here> });
```
- Start using it

## Create new monitor 
### Args: `new( monitor-object, callback)`

``` js
# Create new monitor

var newMonitor = {
	    "name": data[1]+"_"+ uid(10),
	    "notifications": {
	        "phones": [], 
	        "webhooks": [], 
	        "emails": [
	            "sonukr.meena@practo.com"
	        ]
	    }, 
	    "rules": [
	        {
	            "rule_type": "not_run_in", 
	            "duration": 1, 
	            "time_unit": "minutes"
	        },
	        {
	            "rule_type": "ran_longer_than", 
	            "duration": 1, 
	            "time_unit": "minutes"
	        }
	    ],
	    "note": data[2]
	};

cc.new( newMonitor, function(err, body){
	if( err){
		console.log( err);
		throw new Error( err );
	}else{
		console.log( "Cron created", body.code );
	}
});
```	

## Get all monitors

### Args: `all( callback)`

``` js
# Get all monitor
cc.all( function(err, body){
    if(!err){
			console.log( body);
			}
		});
```

## Get single monitor

### Args: `get( monitor code, callback)...`
``` js
cc.get('myMonitor_code',  function(err, monitor){
			console.log( monitor);
		});
```		

## Update monitor

### Args: `update( monitor-code, monitor-obj, callback)...`

``` js
var updateMonitorObj = {...}
cc.new( 'myMonitor_code', updateMonitorObj, function(err, body){
	if( err){
		console.log( err);
		throw new Error( err );
	}else{
		console.log( "monitor updated", body );
	}
});
```
		
		
Things-to-do
----------

- Writing test cases


License
-----------
MIT