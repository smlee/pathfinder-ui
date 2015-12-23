app.directive('reqForm', function(RequestFactory, HistoryFactory){

    return {
        restrict: 'E',
        templateUrl: "js/directives/reqForm.html",
        scope: true,
        link: function(scope, elem, attr) {

            scope.getHeaders = RequestFactory.getHeaders;
            scope.removeHeader = RequestFactory.removeHeader;
            scope.addHeader = RequestFactory.addHeader;
            scope.addUrlParam = RequestFactory.addUrlParam;
            scope.getParams = RequestFactory.getParams;
            scope.getUrlParams = RequestFactory.getUrlParams;
            scope.getUrl = RequestFactory.getUrl;
            scope.getMethod = RequestFactory.getMethod;
            scope.data = RequestFactory.getData();
            scope.dataType = 'form';

            scope.removeUrlParam = function(idx){
                RequestFactory.removeUrlParam(idx);
            };

            scope.removeFormItem = function(idx){
                scope.data.formData.splice(idx, 1);
            };

            scope.setDataType = function(str){
                scope.dataType = str;
            };

            scope.addFormDataItem = function(){
                scope.data.formData.push({key: "", val: ""});
                
            };

            scope.sendReq = function(){
                // set POST/PUT data
                if(scope.dataType === 'form'){
                    RequestFactory.setPostPutData(scope.data.formData);
                } else {
                    RequestFactory.setPostPutData(scope.data.rawData);
                }

                //adds the composite url to the node to be saved to history (in localstorage)
                var node = RequestFactory.getCurrNode();
                node.historicalUrl = RequestFactory.getUrl();
                HistoryFactory.addToHistory(node);

                // Send request
                RequestFactory.reqRoute();

                scope.switchTab(2);
            };

        }
    };
});