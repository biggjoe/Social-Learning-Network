var zapp = angular.module('profile.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'profile.router'
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
  '$stateParams',
  '$state',
  '$window',
  'run',
  'modal',
  function( 
  $rootScope,
  $timeout,
  $http,
  $stateParams,
  $state,
  $window,
  run,
  modal){
/**/
$rootScope.user_public_details = {is_loaded : false};
$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
const ru = toState.name.split('.');
$rootScope.navTab = ru[1];
const app_url = 'modules/general/generalApp.php';
$rootScope.username = toParams.username;
let params = {action:'get_user_public_details',username:$rootScope.username};
$http.post(app_url,params).then(function(res){
$rootScope.user_public_details = res.data.user_public_details;
$rootScope.user_public_details.is_loaded = true;
})
});
//console.log('$stateParamss ::: ',$stateParams)
$rootScope.module = 'account';
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData().then(function(res){
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
})


$rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}

$rootScope.public_tabs = [
{name:'Details',url:'details',icon:'fa-user-circle'},
{name:'Questions',url:'questions',icon:'fa-question-circle'},
{name:'Answers',url:'answers',icon:'fa-comments'},
{name:'Articles',url:'articles',icon:'fa-file-pdf'},
{name:'Following',url:'following',icon:'fa-rss'},
{name:'Followers',url:'followers',icon:'fa-user-plus'},
{name:'Departments',url:'departments',icon:'fa-bank'}
];

$rootScope.setTab = function(tab){
$rootScope.navTab = tab;
}
}]);//run






zapp.controller("detailsCtrl", 
[
  '$scope',
  '$rootScope',
  '$state',
'$stateParams',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $state,
$stateParams,
  $timeout,
  $http,
  $window,
  run,
  modal){
var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_education',username:$scope.username};
dt['feed_scope'] = 'user_public_education';
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
 


}]);//detailsCtrl



zapp.controller("articlesCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  '$state',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  $state,
  $stateParams){
var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_articles',username:$scope.username};
dt['feed_scope'] = 'user_public_articles';
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
 

}]);//dashboardCtrl


zapp.controller("questionsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  '$state',
  '$stateParams',
  'toast',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  $state,
  $stateParams,
  toast,
  modal){
var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_questions',username:$scope.username};
dt['feed_scope'] = 'user_public_questions';
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


}]);//questionsCtrl

zapp.controller("answersCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  '$state',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  $state,
  $stateParams){

var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_answers',username:$scope.username};
dt['feed_scope'] = 'user_public_answers';
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
 
}]);//answersCtrl




zapp.controller("followersCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$state',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $state,
  $stateParams){


var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_followers',username:$scope.username};
dt['feed_scope'] = 'user_public_followers';
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
 

}]);//followersCtrl

zapp.controller("followingCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$state',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $state,
  $stateParams){



var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_following',username:$scope.username};
dt['feed_scope'] = 'user_public_following';
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
 


}]);//followingCtrl


zapp.controller("departmentsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$state',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $state,
  $stateParams){

var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;
dt['action_name'] = '';
dt['params'] = {action:'get_user_public_departments',username:$scope.username};
dt['feed_scope'] = 'user_public_departments';
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
 



}]);//statsCtrl
