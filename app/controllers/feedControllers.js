var zapp = angular.module('feed.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'account.router'
,'app.services'
,'app.factories'
,'app.directives'
,'feed.directives'
,'app.filters'
,'ngWig'
,'general.controller'
]);
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

zapp.run([
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'cartApp',
  'modal',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  cartApp,
  modal){
$rootScope.goBack = function() {
  window.history.back();
}
$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
});
$rootScope.module = 'mentor';
/**/
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData('mentor').then(function(res){
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
//console.log('acc_controx ::: ',$rootScope.userData)
})


$rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}

}]);//run



zapp.controller("listCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.modalData = [];
$scope.launchArticles = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}
var app_url = 'modules/feed/feedApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_feed'};
dt['feed_scope'] = 'feed';
$scope[dt['feed_scope']] = [];
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 20;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
 


}]);//dashboardCtrl

zapp.controller("topicCtrl", 
[
  '$scope',
  '$state',
'$stateParams',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'modal',
  'run',
  'toast',
  function( 
  $scope,
  $state,
$stateParams,
  $rootScope,
  $timeout,
  $http,
  $window,
  modal,
  run,
  toast){

var app_url = 'modules/feed/feedApp.php';
var url = $stateParams.topicUrl;
dt['action_name'] = '';
dt['params'] = {action:'get_topic',url:url};
dt['feed_scope'] = 'topic';
$scope[dt['feed_scope']] = [];
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 20;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
 




}]);//topicCtrl

zapp.controller("departmentCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}


dt['action_name'] = '';
dt['params'] = {action:'get_vin_reports'};
dt['feed_scope'] = 'vin_reports';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/vinApp.php'
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




}]);//reportCtrl



