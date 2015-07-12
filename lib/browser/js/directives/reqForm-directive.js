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
            scope.dataFormat = 'Text';

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


                fd = new FormData();

                    // It is VERY important that these values are appended
                // BEFORE the file. The server will read these in order
                // and depend on the fact that these are being received first.
                // fd.append('quality', params.quality);
                // fd.append('section', params.section);
                fd.append('size', file.size);

                // Append only AFTER all other fields.
                fd.append('file', file);
                console.log("addedFile", fd);
                url = RequestFactory.getUrl();
                console.log("url", url);
    

                // var xhr = new XMLHttpRequest();
                // xhr.open('POST', '/api/course/' + params.courseId.toString() + '/media/upload', true);
                // xhr.send(fd);
            }

            uploadFile = function(files) {
                console.log("called upload File")
                var file = files[0];
        
                var fr = new FileReader();

                fr.readAsText(file);

                fr.onload = function() {
                    console.log("loaded");
                    // console.log("fr.result", JSON.parse(fr.result));
                    var loadedFile = fr.result;
                    console.log("loadedFile", loadedFile);
                    scope.addFileForPost(loadedFile);
                    // scope.$apply();

                };
            }


            scope.sendReq = function(){
                scope.request.method = RequestFactory.getMethod();
                scope.request.url = RequestFactory.getUrl();
                console.log("formData", fd);
                console.log("url", url);
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