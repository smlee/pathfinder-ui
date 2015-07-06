app.factory('RequestFactory', function($http){
		var currNode = {
			url: "",
			method: "",
			params: {}, 
			urlParams: []
		}


		var setParams = function(){
			currNode.params = {};
			currNode.url.split("/").forEach(function(item){
				if(item[0] === ":"){
					currNode.params[item.slice(1)] = null;
				}
			})
		}
		var populateData = function(node){
			
			currNode.urlParams = []
			currNode.method = node.method
			currNode.url = node.name
			setParams()

		}
		var getUrl = function(){
				// 
				var urlFinal = currNode.url.split("/").map(function(item){
					// 
					if(item[0] === ":"){
						var val = currNode.params[item.slice(1)]
						// 
						if(val === null){
							return item
						} else{
							return val
						}
					} else{
						return item
					}
				})
				.join("/")
				// 
				// 
				if(currNode.urlParams.length){
					var query = []
					currNode.urlParams.forEach(function(obj){
						if(obj.key.length){
							var pair = obj.key + "=" + obj.val;
							query.push(pair);
						}
					})
					if(query.length){
						urlFinal += "?" + query.join("&");
					}
				}

				return urlFinal
			}
		var addUrlParam = function(){
			currNode.urlParams.push({key: "", 
				val: ""})
			
		}
		var getUrlParams = function(){
			
			return currNode.urlParams
		}
		var getParams = function(){
			return currNode.params
		}
		var responsePromise = null;
	return {
		setParams: setParams,

		currNode: currNode,

		populateData: populateData,

		addUrlParam: addUrlParam,
		getUrl: getUrl,
		getUrlParams: getUrlParams,
		getParams: getParams,
		getMethod: function(){
			return currNode.method;
		},

		reqRoute: function(reqObj){
<<<<<<< HEAD
			console.log("reqobj", reqObj)
			responsePromise = $http(reqObj).then(
=======
			
			return $http(reqObj).then(
>>>>>>> 089fc632475ac6a4322d3f81ff9580fe594e665f
			function(response){
				
				return response
			},
			function(response){
				return response
			})
			return responsePromise;
		}
	}
})