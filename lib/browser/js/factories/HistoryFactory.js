app.factory('HistoryFactory', function($http, DataFactory){
	var history = [];
	var appId;


	return {
		addToHistory: function(node) {
			history.push(node);
			
			
			DataFactory.dataPromise.then(function(data) {
				window.localStorage.setItem(data.appId, JSON.stringify(history));
			});	
		},
		//loadHistory() loads all history from local storage into the history array.
		//use getHistory() to actually return the history array.
		loadHistory: function(){
			
			DataFactory.dataPromise.then(function(data) {
				appId = data.appId;
				history = JSON.parse(window.localStorage.getItem(appId));
				if(!history){
					history = [];
				}
			});			
		},

		getHistory: function() {
			return history;
		}

	};
});