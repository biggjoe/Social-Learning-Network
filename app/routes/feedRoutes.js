var zapp = angular.module('account.router', []);

zapp.config( ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
$urlRouterProvider.when('/', '/feed/list');
$urlRouterProvider.when('/feed', '/feed/list');
$stateProvider
.state('dash',{
 url: '/dash',
 views: {
  'menuContent':{
    templateUrl: 'templates/mentor/dashboard-home.html'
  }
 }
 })
.state('logout',{
 url: '/logout',
 views: {
  'menuContent':{
    controller: 'logoutCtrl'
  }
 }
 })



.state('feed',{
 url: '/feed',
 views: {
  'menuContent':{
    templateUrl: 'templates/feed/feed-home.html'
  },
  params:{pageTitle:'Feed Home'}
 }
 })

.state('feed.list',{
 url: '/list',
 views: {
  'idasher':{
    templateUrl: 'templates/feed/list.html',
    controller: 'listCtrl'
  },
  params:{pageTitle:'Feed List'}
 }
 })

.state('topic',{
 url: '/topic',
 views: {
  'menuContent':{
    templateUrl: 'templates/feed/topic.html'
  },
  params:{pageTitle:'Feed Topic'}
 }
 })
.state('topic.details',{
 url: '/:topicUrl',
 views: {
  'idasher':{
    templateUrl: 'templates/feed/topic-details.html',
    controller: 'topicCtrl'
  },
  params:{pageTitle:'Feed Topic Details'}
 }
 })


.state('feed.department',{
 url: '/department/:departmentUrl',
 views: {
  'idasher':{
    templateUrl: 'templates/feed/department.html',
    controller: 'departmentCtrl'
  },
  params:{pageTitle:'Feed Department'}
 }
 })



$urlRouterProvider.otherwise('/feed/list');

}]);
