app.directive('reqForm', function(RequestFactory, HistoryFactory){

    return {
        restrict: 'E',
        templateUrl: "js/directives/reqForm.html",
        scope: true,
        link: function(scope, elem, attr){
            var url, 
                fd;

            scope.request = {};

            scope.getHeaders = RequestFactory.getHeaders
            scope.addUrlParam = RequestFactory.addUrlParam
            scope.getParams = RequestFactory.getParams
            scope.getUrlParams = RequestFactory.getUrlParams
            scope.getUrl = RequestFactory.getUrl
            scope.getMethod = RequestFactory.getMethod
            scope.data = RequestFactory.getData()
            scope.dataType = 'form'

            scope.fileFormats = ['Text', 'File'];
            scope.dataFormat = 'File';

            scope.removeUrlParam = function(idx){
                RequestFactory.removeUrlParam(idx);
            }
            scope.removeFormItem = function(idx){
                scope.data.formData.splice(idx, 1)
            }

            scope.setDataType = function(str){
                scope.dataType = str
            }
            scope.addFormDataItem = function(){
                scope.data.formData.push({key: "", val: ""});
                
            }



            scope.addFileForPost = function(file) {

                console.log("file", file);
                console.log("filesize", file.size);
                fd = new FormData();

                // fd.append('size', file.size);

                // Append only AFTER all other fields.
                fd.append('file', file);
                console.log("addedFile", fd.file);
                url = RequestFactory.getUrl();
                console.log("url", url);
            }

            uploadFile = function(files) {
      
                var file = files[0];
        
                // var fr = new FileReader();

                // fr.readAsBinaryString(file);

                // fr.onload = function() {
            
                    // var loadedFile = fr.result;
             
                    // scope.addFileForPost(loadedFile);
           
                     scope.addFileForPost(file);
           
                // };
            }


            scope.sendReq = function(){
                scope.request.method = RequestFactory.getMethod();
                scope.request.url = RequestFactory.getUrl();
                console.log("formData", fd);
                console.log("url", url);
                console.log("scope.dataFormat", scope.dataFormat);
                if (scope.dataFormat === 'File') {  // file data
                    console.log("fd", fd);
                    console.log("url", url)
                    RequestFactory.sendFilePostReq(fd, url);
    
                } else {

                    if(scope.dataType === 'form' && scope.dataFormat === 'Text'){   // text data

                        scope.request.data = {}
                        scope.data.formData.forEach(function(item){
                            scope.request.data[item.key] = item.val
                        })
                        scope.data.rawData = "";
                    } else {
                        scope.request.data = scope.data.rawData;    // raw data
                        scope.data.formData = [{key: "", val: ""}]
                    }
                }

                    //adds the composite url to the node to be saved in localstorage
                    var node = RequestFactory.getCurrNode()
                    node.historicalUrl = RequestFactory.getUrl()
                    HistoryFactory.addToHistory(node);


                    scope.switchTab(2);
                
            }

            //do we need this anyone??
            scope.del = function(){

            }

        }
    }
})