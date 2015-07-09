app.directive('reqForm', function(RequestFactory, HistoryFactory){
	return {
		restrict: 'E',
		templateUrl: "js/directives/reqForm.html",
		scope: true,
		link: function(scope, elem, attr){

			scope.fileFormats = ["Text", "File"];

			scope.setContentType = RequestFactory.setContentType;
		
			scope.request = {};
			
			scope.getHeaders = RequestFactory.getHeaders 
			scope.addUrlParam = RequestFactory.addUrlParam
			scope.getParams = RequestFactory.getParams
			scope.getUrlParams = RequestFactory.getUrlParams
			scope.getUrl = RequestFactory.getUrl
			scope.getMethod = RequestFactory.getMethod
			scope.data = RequestFactory.getData()
			scope.dataType = 'form'

			scope.setDataType = function(str){
				scope.dataType = str
			}
			scope.addFormDataItem = function(){
				scope.data.formData.push({key: "", val: ""});
			}
			scope.sendReq = function(){
				scope.request.method = RequestFactory.getMethod();
				scope.request.url = RequestFactory.getUrl();

				scope.request.headers = RequestFactory.getHeaders();
				console.log("hit send request");

				if(scope.dataType === 'form'){
					console.log("dataFormat", scope.dataFormat);
					if (scope.dataFormat === 'File') {
						angular.element('form').attr('enctype', 'multipart/form-data');
					}
				
					scope.request.data = {}
					scope.data.formData.forEach(function(item){
						scope.request.data[item.key] = item.val
					})
					scope.request.data = "";
				} else {
					scope.request.data = scope.data.rawData;
					scope.data.formData = [{key: "", val: ""}]
				}

				
				console.log("request obj", scope.request);
				//adds the composite url to the node to be saved in localstorage
				var node = RequestFactory.getCurrNode()
				node.historicalUrl = RequestFactory.getUrl()				
				HistoryFactory.addToHistory(node);


				RequestFactory.reqRoute(scope.request).then(function(respDetails){
					console.log("respDetails", respDetails)
				}, function(errResponse){
					console.log("errResponse", errResponse)
				}) 
				scope.switchTab(2);
			}
			
			//do we need this anyone??
			scope.del = function(){
				console.log("delete pressed")
			}



		}
	}
})