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
    console.log(toState)
});
$rootScope.module = 'account';
/**/
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData().then(function(res){
  console.log(res)
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
//console.log('acc_controx ::: ',$rootScope.userData)
})
let app_url = 'modules/feed/feedApp.php';
$http.post(app_url,{action:'fetch_side_bar_departments'}).then((res)=>{
console.log('nav_depts:: ',res)
$rootScope.nav_departments = res.data.departments;
});


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

let parax = {action:'get_topic_details',url:url};
$http.post(app_url,parax).then(function(res){
  console.log(res)
$scope['topic_details'] = res.data.topic_details;
});

//
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
 
$scope.togView = (scope)=>{
console.log(scope);
var iscope = (scope === 'answer') ? 'ansCom' : 
(scope === 'answerxx') ?  'qAns' : null;
$scope[iscope] = !$scope[iscope];
}

$scope.sItem = (mode)=>{
console.log(mode);
$scope.topic_details.action = 'save_'+mode;
$http.post(app_url,$scope.topic_details).then(function(res){
console.log(res.data);
let rs = res.data;
if(rs.status == '1' && mode ==='answer'){
$scope.topic_details.answer_num = $scope.topic_details.answer_num+1;
$scope.ansCom = false;
$scope.topic_details.new_comment = '';
$scope.topic.unshift(rs.newAnswer);
}//
if(rs.status == '1' && mode ==='follow_topic'){
$scope.topic_details.follows = $scope.topic_details.follows+1;
}//
});
}//saveAnswer


}]);//topicCtrl

zapp.controller("departmentCtrl", 
[
  '$scope',
  '$rootScope',
  '$stateParams',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $stateParams,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.departmentUrl = $stateParams.departmentUrl;
var app_url = 'modules/feed/feedApp.php';
$scope.departmentLoaded = false;
$http.post(app_url,
  {action:'get_department_details',
  departmentUrl:$scope.departmentUrl}).then(function(rx){
console.log(rx);
$scope.department_details = rx.data.department_details;
$scope.departmentLoaded = true;
});


dt['action_name'] = '';
dt['params'] = {action:'get_department_feed',departmentUrl:$scope.departmentUrl};
dt['feed_scope'] = 'department_feed';
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
 

}]);//reportCtrl



