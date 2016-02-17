/**
 * http://usejsdoc.org/
 */
var dbManager = require('./DataStoreManager');
setTimeout(function() {
	dbManager.upload({"key":'registration_photo',"id":21567,"content" :'photo'},function(response){
		
		console.log(response.data);
	});
}, 3000);

setTimeout(function() {
	dbManager.get({key:'registration_visit',id:21567 },function(response){
		console.log(response.data);
	});
}, 3000);

