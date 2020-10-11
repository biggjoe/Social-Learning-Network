var zapp = angular.module('article.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'app.services'
,'app.factories'
,'article.router'
,'app.directives'
,'app.filters'
,'paystack'
,'ngWig'
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
  '$document',
  'modal',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  $document,
  modal){
$window.fbAsyncInit = function() {
    FB.init({ 
      appId: '375040369837254',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.4'
    });
};

$rootScope.goBack = function() {
  window.history.back();
}
$rootScope.article_details = {for_sale:0};
$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
  console.log(toState)
  if(toState.name === 'article.details'){
const ru = toState.name.split('.');
$rootScope.navTab = ru[1];
const app_url = 'modules/general/generalApp.php';
$rootScope.url = toParams.url;
$rootScope.isFetched =false;
let params = {action:'get_this_article',url:$rootScope.url};
$http.post(app_url,params).then(function(res){
  console.log(res);
  $rootScope.isFetched = true;
$rootScope.article_details = res.data.article_details;
$rootScope.article_details.guest_commenter = 
($rootScope.userData.isLogged) ? false:true;
$rootScope.article_details.share_page = 'article';
$rootScope.article_details.description = res.data.content;
})
$rootScope.details_page = true;
}//if articles.details
else{
$rootScope.details_page = false;  
}
});
//console.log('$stateParamss ::: ',$stateParams)
$rootScope.module = 'account';
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData('mentor').then(function(res){
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
})

$rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}

$rootScope.movx = function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
}

}]);//run



zapp.controller("articleDetailsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  '$filter',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  $filter,
  toast){

var app_url = 'modules/general/generalApp.php';
$scope.saveComm = function(data){
console.log(data.newComment);
data.action = 'save_artilce_comment';
$http.post(app_url,data).then(function(res){
console.log(res);
let rs = res.data;
if(rs.status === '1'){
data.newComment = '';
$scope.do_comm = false;
$scope.article_details.all_comments.unshift(rs.last_comment);
}
})
 }
$scope.lf = function(data){
let fsz = $filter('showSize')(data.size);  

let disp = `
<div class="bordered border-radius-8 overflow-hidden">
<table class="table mb0">
<tr>
<td>Filename</td>
<td class="text-right">${data.filename}</td>
</tr>
<tr>
<td>Filesize</td>
<td class="text-right">${fsz}</td>
</tr>
<tr>
<td>Extension</td>
<td class="text-right">${data.mime}</td>
</tr>
</table>
</div>
`;
toast.show({message:disp,title:'File Details'});
}

}]);//articleCtrl


zapp.controller("articlesListCtrl", 
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

dt['params'] = {action:'get_page_articles'};
dt['feed_scope'] = 'page_articles';
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
