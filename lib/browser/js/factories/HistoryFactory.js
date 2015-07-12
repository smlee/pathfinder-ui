app.factory('HistoryFactory', function($http, DataFactory){
	var history = [];
	var appId;


	return {
		// uploadFile: uploadFile,

		concatHistory: function(arr) {
			history = history.concat(arr);
			// console.log("arr", arr)
			// console.log("concatted hist", history)
		},

		addToHistory: function(node) {
			//Deep copy else all history will point to the same object
			var copy = JSON.parse(JSON.stringify(node));
			history.push(copy);
		
			
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
			console.log("ran getHistory");
			return history;
		}

	};
});