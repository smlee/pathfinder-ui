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
			console.log("Ran populateData")
			currNode.urlParams = []
			currNode.method = node.method
			currNode.url = node.name
			setParams()

		}
		var getUrl = function(){
				// console.log("scopr request url", scope.request.url)
				var urlFinal = currNode.url.split("/").map(function(item){
					// console.log("scope.currNode.params", scope.currNode.params)
					if(item[0] === ":"){
						var val = currNode.params[item.slice(1)]
						// console.log("val", val)
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
				// console.count('# of times run: ')
				// console.log("getUrl", urlFinal)
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
			console.log("currNode.urlParams", currNode.urlParams)
		}
		var getUrlParams = function(){
			console.log("currNode.urlParams", currNode.urlParams)
			return currNode.urlParams
		}
		var getParams = function(){
			return currNode.params
		}
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
			console.log("reqobj", reqObj)
			return $http(reqObj).then(
			function(response){
				return response
			},
			function(response){
				return response
			})
		}
	}
})