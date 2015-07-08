app.directive('reqForm', function(RequestFactory, HistoryFactory){
	return {
		restrict: 'E',
		templateUrl: "js/directives/reqForm.html",
		link: function(scope, elem, attr){
			scope.rawData = ""; //probs need to hook this up to currNode.data later to make historical data populate
			scope.formData = [{key: "", val: ""}];
			scope.dataType = "form"

			scope.setDataType = function(str){
				scope.dataType = str
			}
			scope.request = {};
			
			
			// scope.request.params = RequestFactory.getParams() || "";
			// scope.request.urlParams = RequestFactory.getUrlParams() || "";
			scope.getUrl = RequestFactory.getUrl
			scope.getMethod = RequestFactory.getMethod

			scope.sendReq = function(){
				scope.request.method = RequestFactory.getMethod();
				scope.request.url = RequestFactory.getUrl();

				if(scope.dataType === 'form'){
					scope.request.data = {}
					scope.formData.forEach(function(item){
						scope.request.data[item.key] = item.val
					})
				} else {
					scope.request.data = scope.rawData;
				}
				
				//adds the composite url to the node to be saved in localstorage
				var node = RequestFactory.getCurrNode()
				node.historicalUrl = RequestFactory.getUrl()				
				HistoryFactory.addToHistory(node);

				console.log("scope.request", scope.request)

				RequestFactory.reqRoute(scope.request).then(function(respDetails){
					console.log("respDetails", respDetails)
					// RequestFactory.responseDetails = respDetails;
				}, function(errResponse){
					// RequestFactory.responseDetails = errResponse;
					console.log("errResponse", errResponse)
				}) 
			}
			
			scope.addUrlParam = RequestFactory.addUrlParam
			scope.getParams = RequestFactory.getParams
			scope.getUrlParams = RequestFactory.getUrlParams
			scope.del = function(){
				console.log("delete pressed")
			}

			scope.getHeaders = RequestFactory.getHeaders 


		}
	}
})