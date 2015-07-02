app.directive('reqForm', function(){
	return {
		restrict: 'E',
		templateUrl: "js/directives/reqForm.html",
		link: function(scope){
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
				
				console.log("getUrl", urlFinal)
				return urlFinal
			}
			
			scope.request = {};
			scope.request.method = scope.currNode.method
			scope.request.url = scope.getUrl()


		    // console.log("ParamsObj", scope.currNode.params)

			

			// scope.request.url = 
			scope.sendReq = function(){
				RequestFactory.reqRoute(scope.request).then(function(respDetails){
					console.log("respDetails", respDetails)
				}) 
			}

		}
	}
})