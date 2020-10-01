var zapp = angular.module('article.router', []);

zapp.config( ['$stateProvider', 
  '$locationProvider', 
  '$urlRouterProvider',
  function(
    $stateProvider, 
    $locationProvider, 
    $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
//$urlRouterProvider.when('/', '/profile/details');
$urlRouterProvider.when('/article', '/article/list');
$stateProvider
.state('article',{
 url: '/article',
 views: {
  'menuContent':{
    templateUrl: 'templates/public/article.html'
  }
 }
 })
/*
.state('blogs',{
 url: '/blogs',
 views: {
  'menuContent':{
    templateUrl: 'templates/base/blog.html'
  }
 }
 })

*/
.state('article.details',{
 url: '/:url',
 views: {
  'idasher':{
    templateUrl: 'templates/public/article/article-details.html',
    controller: 'articleDetailsCtrl'
  },
  params:{pageTitle:'Article'}
 }
 })
.state('articles',{
 url: '/articles',
 views: {
  'menuContent':{
    templateUrl: 'templates/public/article/articles-list.html',
    controller: 'articlesListCtrl'
  },
  params:{pageTitle:'Article'}
 }
 })

.state('article.list',{
 url: '/list',
 views: {
  'idasher':{
    templateUrl: 'templates/public/article/article-list.html',
    controller: 'articleListCtrl'
  },
  params:{pageTitle:'Article'}
 }
 })




//let newUrl = '/profile/'+$rootScope.username;
let newUrl = '/article';

$urlRouterProvider.otherwise(newUrl);

}]);
