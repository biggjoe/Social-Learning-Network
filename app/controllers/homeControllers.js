

var zapp = angular.module('home.controller', [
'angular-loading-bar'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'app.services'
,'app.factories'
,'app.directives'
,'app.filters'
])

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
$rootScope.isLoaded = false;
$rootScope.userData = {isLogged:false}
    $http.post('modules/account/accountApp.php',{action:'getUser'}).then(function(res){
      console.log(res)
      $rootScope.userData = res.data;
      $rootScope.isLoaded = true;
    })
}]);//run



zapp.controller("homeCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  'cartApp',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse,
  cartApp,
  modal){


}]);//homeCtrl

