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
			scope.request.url = RequestFactory.getUrl();
			scope.request.method = RequestFactory.getMethod();
			scope.request.params = RequestFactory.getParams() || "";
			scope.request.urlParams = RequestFactory.getUrlParams() || "";
			scope.getUrl = RequestFactory.getUrl
			scope.getMethod = RequestFactory.getMethod

			scope.sendReq = function(){
				console.log("scope.request", scope.request);
				// console.log("RequestFactory", RequestFactory)
				// console.log("urlparams", RequestFactory.currNode.urlParams[0])

				var url = RequestFactory.getUrl();
				if (url.indexOf('?') !== -1) {	// If URL params exist
					url = url.slice(0, url.indexOf('?'))	// store base url
				}
				scope.request.url = url;
				scope.request.method = RequestFactory.getMethod();

				scope.request.params = RequestFactory.getParams();
				scope.request.urlParams = RequestFactory.getUrlParams();
				if(scope.dataType === 'form'){
					scope.request.data = {}
					scope.formData.forEach(function(item){
						scope.request.data[item.key] = item.val
					})
				} else {
					scope.request.data = scope.rawData;
				}

				HistoryFactory.addToHistory(scope.request);
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