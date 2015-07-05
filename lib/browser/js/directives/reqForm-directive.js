app.directive('reqForm', function(RequestFactory, HistoryFactory){
	return {
		restrict: 'E',
		templateUrl: "js/directives/reqForm.html",
		link: function(scope, elem, attr){
			scope.request = {}
			scope.request.url = RequestFactory.getUrl()
			scope.request.method = RequestFactory.getMethod();
			console.log("request object", scope.request);

			console.log("request.method", scope.request.method)
			scope.getUrl = RequestFactory.getUrl
			scope.getMethod = RequestFactory.getMethod

			scope.sendReq = function(){
				// console.log("RequestFactory", RequestFactory)
				// console.log("urlparams", RequestFactory.currNode.urlParams[0])
				scope.request.url = RequestFactory.getUrl();
				scope.request.method = RequestFactory.getMethod();

				HistoryFactory.addToHistory(scope.request);

				RequestFactory.reqRoute(scope.request).then(function(respDetails){
					console.log("respDetails", respDetails)
				}, function(errResponse){
					console.log("errResponse", errResponse)
				}) 
			}
			
			scope.addUrlParam = RequestFactory.addUrlParam
			scope.getParams = RequestFactory.getParams
			scope.getUrlParams = RequestFactory.getUrlParams

		}
	}
})