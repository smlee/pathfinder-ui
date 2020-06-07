app.factory('RequestFactory', function($http, $rootScope){

    var currNode = {
        url: "",
        method: "",
        params: {},
        urlParams: [],	// array of objects (key-value pairs)
        headersArr: [],
        headers: {},
        data: {
            formData: [{key: "", val: ""}],
            rawData: ""
        }
    };

    var authToken = "";

    var tokenType = "";

    var getHeaders = function() {
        return currNode.headersArr;
    };

    var addHeader = function() {
        currNode.headersArr.push({ key: "", val: "" });
    };

    var removeHeader = function(idx) {
        currNode.headersArr.splice(idx, 1);
    };

    var setHeaders = function(arr) {
        arr.forEach(function(obj) {
            currNode.headers[obj.key] = obj.val;
        });
    };

    var setPostPutData = function(data) {
        // if form data
        if (this.currNode.data.formData && this.currNode.data.formData[0].key) {
            data.forEach(function(obj) {
                this.currNode.data[obj.key] = obj.val;
            });
        // else raw data
        } else {
            this.currNode.data = data;
        }        
    };

    var populateData = function(node){
        $rootScope.$broadcast('nodeClick');
        currNode.method = node.method;
        currNode.url = node.url;
        currNode.params = node.params || {};
        if(Object.keys(currNode.params).length === 0) setParams();
        currNode.urlParams = node.urlParams || [];
        currNode.headersArr = node.headersArr || [];
        currNode.headers = node.headers || {};
        currNode.data = node.data || {
            formData: [{key: "", val: ""}],
            rawData: ""
        };
    };

    var setParams = function(){
        currNode.url.split("/").forEach(function(item){
            if (item[0] === ":"){
                currNode.params[item.slice(1)] = null;
            }
        });
    };

    var getUrl = function(){
        var urlFinal = currNode.url.split("/").map(function(item){
            if (item[0] === ":"){
                var val = currNode.params[item.slice(1)];
            
                if (val === null) {
                    return item;
                } else {
                    return val;
                }

            } else {
                return item;
            }
        }).join("/");

        if (currNode.urlParams.length) {
            var query = [];

            currNode.urlParams.forEach(function(obj){
                if (obj.key.length) {
                    var pair = obj.key + "=" + obj.val;
                    query.push(pair);
                }
            });

            if (query.length) {
                urlFinal += "?" + query.join("&");
            }
        }

        return urlFinal;
    };

    var addUrlParam = function(){
        currNode.urlParams.push({
            key: "",
            val: ""
        });
    };

    var getUrlParams = function(){
        return currNode.urlParams;
    };

    var getParams = function(){
        return currNode.params;
    };

    var removeUrlParam = function(idx){
        currNode.urlParams.splice(idx, 1);
    };

    var responseDetails = {};

	var setContentType = function() {
		addToHeaders("content-type", "multipart/form-data; boundary=----WebKitFormBoundarymNw6y72wsq8p2Bdn");
		currNode.data.formData.key = "submit";
		currNode.data.formData.val = "upload";

    };

    var setAuthToken = function(token, tokenType){
        this.authToken = token;
        this.tokenType = tokenType;
    };

    var setAuthHeader = function(){
        currNode.headers["Authorization"] = this.tokenType+ " " + this.authToken;
    }

    return {
        setParams: setParams,

        getCurrNode: function(){
            return currNode;
        },

        currNode: currNode,

        populateData: populateData,

        addUrlParam: addUrlParam,

        removeUrlParam: removeUrlParam,

        getUrl: getUrl,

        getUrlParams: getUrlParams,

        getParams: getParams,

        getHeaders: getHeaders,

        addHeader: addHeader,

        removeHeader: removeHeader,

        setHeaders: setHeaders,

        setPostPutData: setPostPutData,

        setAuthToken: setAuthToken,

        setAuthHeader: setAuthHeader,

        getResponse: function(){
            return responseDetails;
        },

        getMethod: function(){
            return currNode.method;
        },

        getData: function(){
            var data = currNode.data;
            return data;
        },

        reqRoute: function(){
            this.currNode.url = getUrl(); 
            setHeaders(this.currNode.headersArr);
            if(this.authToken){
                this.setAuthHeader();
            }
            return $http(this.currNode).then(
                function(response){
                    responseDetails = response;
                    return response;
                },
                function(response){
                    responseDetails = response;
                    return response;
                });
        }
    };

});