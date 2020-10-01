var zapp = angular.module('profile.router', []);

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
$urlRouterProvider.when('/profile/messages', '/profile/messages/list');
$urlRouterProvider.when('/profile/:username', '/profile/:username/details');
$stateProvider
.state('dash',{
 url: '/dash',
 views: {
  'menuContent':{
    templateUrl: 'templates/profile/dashboard-home.html'
  }
 }
 })


.state('profile',{
 url: '/profile/:username',
 views: {
  'menuContent':{
    templateUrl: 'templates/public/profile.html'
  },
  params:{pageTitle:'Dashboard'}
 }
 })



.state('profile.details',{
 url: '/details',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/details.html',
    controller: 'detailsCtrl'
  },
  params:{pageTitle:'Details Page'}
 }
 })



.state('profile.articles',{
 url: '/articles',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/articles.html',
    controller: 'articlesCtrl'
  },
  params:{pageTitle:'Articles Page'}
 }
 })




.state('profile.questions',{
 url: '/questions',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/questions.html',
    controller: 'questionsCtrl'
  },
  params:{pageTitle:'User Questions'}
 }
 })


.state('profile.answers',{
 url: '/answers',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/answers.html',
    controller: 'answersCtrl'
  },
  params:{pageTitle:'User Answers'}
 }
 })

.state('profile.departments',{
 url: '/departments',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/departments.html',
    controller: 'departmentsCtrl'
  },
  params:{pageTitle:'Stats Page'}
 }
 })


.state('profile.followers',{
 url: '/followers',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/followers.html',
    controller: 'followersCtrl'
  },
  params:{pageTitle:'Followers Page'}
 }
 })


.state('profile.following',{
 url: '/following',
 views: {
  'idasher':{
    templateUrl: 'templates/public/profile/following.html',
    controller: 'followingCtrl'
  },
  params:{pageTitle:'Following Page'}
 }
 })

//let newUrl = '/profile/'+$rootScope.username;
let newUrl = '/profile';

$urlRouterProvider.otherwise(newUrl);

}]);
