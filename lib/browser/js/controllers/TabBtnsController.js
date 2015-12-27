app.controller('TabBtnsController', function($scope, HistoryFactory, RequestFactory){

    //Put the state name of the tabs in the array below.
    $scope.tabs = [
        {name:"The first tab", directive:'tab1'},
        {name:"Request History", directive:'history'},
        {name:"The third tab", directive:'tab3'},
        {name:"The fourth tab", directive:'tab4'}
    ];

    $scope.selectedIndex = 0;

    $scope.populatePriorReq = function(item) {
        $scope.selectedIndex = 0;
        RequestFactory.populateData(item);

    };

    $scope.switchTab = function(tab){
        $scope.selectedIndex = tab;
    };

    $scope.$on('nodeClick', function() {
        $scope.switchTab(0);
    });

    $scope.getRes = function() {
        RequestFactory.reqRoute().then(function(reqResponse) {

            $scope.reqResponse = reqResponse;

            // convert response.headers() into normal object
            var headers = JSON.stringify(reqResponse.headers());
            $scope.resHeaders = JSON.parse(headers);

        });
    };

});