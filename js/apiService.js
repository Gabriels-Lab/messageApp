var apiService = {};
(function () {
    function fnCreate(path, body, callback) {
        appFB.database().ref(path).set(body, callback);
    }
    function fnRead(path, successCallback, errorCallback) {
        appFB.database().ref(path).once("value").then(successCallback, errorCallback);
    }
    function fnAutoRead(path, successCallback, errorCallback){
        appFB.database().ref(path).on("value", successCallback, errorCallback);
    }
    function fnUpdate(path, body, callback) {
        appFB.database().ref(path).update(body, callback);
    }
    function fnDelete(path, callback) {
        appFB.database().ref(path).remove(callback);
    }

    apiService.create = fnCreate;
    apiService.read = fnRead;
    apiService.autoRead = fnAutoRead;
    apiService.update = fnUpdate;
    apiService.delete = fnDelete;
})()