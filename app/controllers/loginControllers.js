
var zapp = angular.module('login.controller', [
  'angular-loading-bar'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'app.factories'
,'app.filters'
]);

zapp.run([
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window){
}]);//run

zapp.controller("loginCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse){
$scope.ldata = {};
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doLogin = function(data){
data.action = 'userLogin';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
var vUrl = 'modules/account/accountApp.php';
$http.post(vUrl,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
$window.location.replace('./account');  
}, 1500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}

$scope.modalData = [];




}]);//loginCtrl


zapp.controller("regCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse){
$scope.ldata = {};
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doReg = function(data){
data.action = 'userRegister';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
var vUrl = 'modules/account/accountApp.php';
$http.post(vUrl,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
$window.location.replace('./account');  
}, 5500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}

$scope.modalData = [];




}]);//regCtrl


zapp.controller("forgotCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse){
$scope.ldata = {};
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doReset = function(data){
data.action = 'userPasswordReset';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
var vUrl = 'modules/account/accountApp.php';
$http.post(vUrl,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
$window.location.replace('./account');  
}, 1500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}

$scope.modalData = [];




}]);//loginCtrl