

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

var dt = {btn:{}}
dt.btn_text = 'btn_text';
dt.btn_icon = 'btn_icon';
dt.feed_end = 'false'; 
dt.feed_scope = '';
dt.feed_page = 'feed_page';
dt.feed_offset = 'feed_offset';
dt.feed_rows = 'feed_rows';
dt.loading = 'isLoading';
dt.action_name = 'action_name';

zapp.controller("homeCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
$scope.modalData = [];
$scope.launchArticles = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}
var app_url = 'modules/general/generalApp.php';

dt['params'] = {action:'get_home_articles'};
dt['feed_scope'] = 'home_articles';
$scope[dt['feed_scope']] = [];
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
 
}]);//homeCtrl

