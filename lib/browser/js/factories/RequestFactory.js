app.factory('RequestFactory', function($http){
		var currNode = {
			url: "",
			method: "",
			params: {}, 
			urlParams: [],	// array of objects (key-value pairs)
			headers: {},
			data: {
				formData: [{key: "", val: ""}],
				rawData: ""
			}
		}

		var addToHeaders = function(key, value) {
			currNode.headers[key] = value; 
			console.log("currentRequest headers", currNode.headers);
		}

		var getData = function() {
			return currNode.data;
		}

		var getHeaders = function() {
			return currNode.headers;
		}

		var setContentType = function() {
			console.log('set content type');
			// addToHeaders("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
			addToHeaders("content-type", "multipart/form-data; boundary=----WebKitFormBoundarymNw6y72wsq8p2Bdn");
			currNode.data.formData.key = "submit";
			currNode.data.formData.val = "upload"
			console.log("currNode", currNode);
		}


		var populateData = function(node){
			currNode = {
				url: "",
				method: "",
				params: {}, 
				urlParams: [],
				headers: {},
				data: {
					formData: [{key: "", val: ""}],
					rawData: ""
				}
			}
			currNode.method = node.method;
			currNode.url = node.url;

			currNode.params = node.params || {}
			if(Object.keys(currNode.params).length == 0) setParams();
			currNode.urlParams = node.urlParams || []

		}
 		var setParams = function(){
			currNode.url.split("/").forEach(function(item){
				if(item[0] === ":"){
					currNode.params[item.slice(1)] = null;
				}
			})
		}
		var getUrl = function(){
				var urlFinal = currNode.url.split("/").map(function(item){
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

		var responseDetails = {}

	return {
		setParams: setParams,

		getCurrNode: function(){
			return currNode;
		},
		currNode: currNode,
		populateData: populateData,

		addUrlParam: addUrlParam,
		getUrl: getUrl,
		getUrlParams: getUrlParams,
		getParams: getParams,

		getHeaders: getHeaders,
		addToHeaders: addToHeaders,
		setContentType: setContentType,
		getData: getData,

		getResponse: function(){
			return responseDetails
		},

		getMethod: function(){
			return currNode.method;
		},
		getData: function(){
			return currNode.data;
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