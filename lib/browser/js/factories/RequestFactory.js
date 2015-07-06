app.factory('RequestFactory', function($http){
		var currNode = {
			url: "",
			method: "",
			params: {}, 
			urlParams: []	// array of objects (key-value pairs)
		}


		var setParams = function(){
			// currNode.params = {};
			currNode.url.split("/").forEach(function(item){
				if(item[0] === ":"){
					currNode.params[item.slice(1)] = null;
				}
			})
		}
		var populateData = function(node){
			
			currNode = {
				url: "",
				method: "",
				params: {}, 
				urlParams: []	// array of objects (key-value pairs)
			}

			currNode.method = node.method;
			currNode.url = node.url;
			setParams();
			setUrlParams(node.urlParams);

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

		var setUrlParams = function(urlParamsArr) {
			currNode.urlParams = urlParamsArr || [];
		}

		var getParams = function(){
			return currNode.params
		}

		var responseDetails = {}

	return {
		setParams: setParams,

		currNode: currNode,

		populateData: populateData,

		addUrlParam: addUrlParam,
		getUrl: getUrl,
		getUrlParams: getUrlParams,
		getParams: getParams,
		getResponse: function(){
			return responseDetails
		},
		getMethod: function(){
			return currNode.method;
		},

		reqRoute: function(reqObj){

			
			return $http(reqObj).then(

			function(response){
				responseDetails = response
				return response
			},
			function(response){
				responseDetails = response
				return response
			})
		}
	}
})