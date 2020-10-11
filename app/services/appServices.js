var zapp = angular.module('app.services', ['app.factories']);

zapp.service('fileUpload', ['$http', function ($http) {          
return { 
uploadFileToUrl: function(fd, uploadUrl){
return $http.post(uploadUrl, fd, 
{transformRequest: angular.identity,headers: {'Content-Type': undefined}
});
}
}
}]);


