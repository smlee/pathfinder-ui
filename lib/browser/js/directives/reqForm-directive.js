app.directive('reqForm', function(RequestFactory){
	return {
		restrict: 'E',
		templateUrl: "js/directives/reqForm.html",
		link: function(scope, elem, attr){
			scope.getUrl = function(){
				scope.request.url = scope.currNode.url
				// console.log("scopr request url", scope.request.url)
				var urlFinal = scope.request.url.split("/").map(function(item){
					// console.log("scope.currNode.params", scope.currNode.params)
					if(item[0] === ":"){
						var val = scope.currNode.params[item.slice(1)]
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
				if(scope.urlParams.length){
					var query = []
					scope.urlParams.forEach(function(obj){
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
			
			scope.request = {};
			scope.request.method = scope.currNode.method
			// console.count('Other count # of times run: ')
			scope.request.url = scope.getUrl()


		    // console.log("ParamsObj", scope.currNode.params)

			

			// scope.request.url = 
			scope.sendReq = function(){
				console.log("RequestFactory", RequestFactory)
				console.log("urlparams", scope.urlParams[0])
				RequestFactory.reqRoute(scope.request).then(function(respDetails){
					console.log("respDetails", respDetails)
				}) 
			}
			
			scope.addUrlParam = function(){
				scope.urlParams.push({key: "", 
					val: ""})
			}


		}
	}
})