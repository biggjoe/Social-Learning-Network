var zapp = angular.module('page.controller', [
'angular-loading-bar'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'app.factories'
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
  $window
  ){
console.log('Opagess')
$rootScope.pageTitle = '';
$rootScope.userNotif = '<i class="fa-spin fas fa-circle-notch"></i>';
$rootScope.thisPage  ='tp';
//toState.params
//$rootScope.rootTopic = toState.views.params.pageTitle;
$rootScope.dashCats  =  [
{title:'Report Samples', url:'sample', icon:' fa-file-pdf '},
{title:'FAQ', url:'faq', icon:' fa-question-circle '},
{title:'Contact Us', url:'contact-us', icon:' fa-phone '},
{title:'How it Works', url:'how-it-works', icon:' fa-book '},
{title:'Terms & Conditions', url:'terms', icon:' fa-columns '}

];


$rootScope.isSet = function(tabNum){return $rootScope.tab === tabNum;};
$rootScope['hide_nav_0'] = false;
$rootScope.tisNav = function(index){
  return $rootScope['hide_nav_'+index];
}

$rootScope.toggleDrop = function(item){
for (var i = 0; i < 9; i++) {
$rootScope['hide_nav_'+[i]] = true;
}
var nd = 'hide_nav_'+item;
$rootScope[nd] = false;
}

$rootScope.isNavOpen = false;
$rootScope.navm ='';


$rootScope.showMenu = function(){
for (var i = 0; i < 9; i++) {
$rootScope['hide_nav_'+[i]] = false;
}
if($rootScope.navm === 'forceHide'){
$rootScope.navm = 'forceBlock';
$rootScope.isNavOpen = true;
}
else if($rootScope.navm === 'forceBlock'){
$rootScope.navm = 'forceHide';
$rootScope.isNavOpen = false;
}else if($rootScope.navm === undefined||$rootScope.navm === ''){
$rootScope.navm = 'forceBlock';
$rootScope.isNavOpen = true;
}
};

$rootScope.toggleNaver = function(){
$rootScope.showNaver  = !$rootScope.showNaver;
}



}]);



zapp.controller("faqCtrl", 
[
'$scope',
'$rootScope',
'$timeout',
'$window',
'$http',
function(
$scope,
$rootScope,
$timeout,
$window,
$http) {
$rootScope.pageTitle = 'Frequently Asked Questions';
$http.post('modules/general/generalApp.php',
  {action:'allFaq'}).then(function(res){
console.log(res)
$scope.faq = res.data.faq; 
})


$scope.dropFaq = function(picker){
console.log(picker);
console.log(angular.element(picker.currentTarget.children[1]));
if(picker.currentTarget.children[1].style.display == 'block'){
picker.currentTarget.children[1].style.display = 'none';
}else{
picker.currentTarget.children[1].style.display = 'block';  
}

};



}]);


zapp.controller("sampleCtrl", 
[
'$scope',
'$rootScope',
'$timeout',
'$window',
'$http',
'modal',
function(
$scope,
$rootScope,
$timeout,
$window,
$http,
modal) {
  console.log('Samples')
$rootScope.pageTitle = 'Report Samples';
var options = {};
$scope.sampleData = '';
$scope.zoomSample = function(obj){
$scope.sampleData = '';
obj.width = '100px';
obj.doc_close = true;
options.page = 'templates/dialogs/sample-view.html';
options.data = obj;
$scope.sampleData = obj;
modal.show(options,$scope)
};

$scope.sample_types = [
{name:'Carfax', intro:'Sample Carfax Report',url:'carfax',img:'images/samples/carfax.png'},
{name:'Autocheck', intro:'Sample Autocheck Report',url:'autocheck',img:'images/samples/autocheck.png'},
{name:'Copart', intro:'Sample Copart Report',url:'copart',img:'images/samples/copart.png'},
{name:'Manheim', intro:'Sample Manheim Report',url:'manheim',img:'images/samples/manheim.jpg'},
{name:'iaai', intro:'Sample iaai Report',url:'iaai',img:'images/samples/iaai.png'}
];
$scope.closeThisDialog = function(){
  console.log('modddd')
  modal.close();
}


}]);
zapp.controller("pagesCtrl", 
[
'$scope',
'$rootScope',
'$timeout',
'$window',
'$http',
function(
$scope,
$rootScope,
$timeout,
$window,
$http) {

$scope.getThisPage = function(id){
$http.post('modules/general/generalApp.php',
  {action:'getThisPage',id:id}).then(function(res){
console.log(res)
$scope.page = res.data.page;
$rootScope.pageTitle = res.data.page.name; 
})
}

}]);