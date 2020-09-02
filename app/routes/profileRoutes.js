var zapp = angular.module('profile.router', []);

zapp.config( ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
//$urlRouterProvider.when('/', '/profile/details');
$urlRouterProvider.when('/profile/messages', '/profile/messages/list');
$urlRouterProvider.when('/profile/account-settings', '/profile/account-settings/edit-profile');
$stateProvider
.state('dash',{
 url: '/dash',
 views: {
  'menuContent':{
    templateUrl: 'templates/profile/dashboard-home.html'
  }
 }
 })


.state('details',{
 url: '/profile/:username',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/profile/details.html',
    controller: 'detailsCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('articles',{
 url: '/profile/articles',
 views: {
  'menuContent':{
    templateUrl: 'templates/profile/profile/articles.html',
    controller: 'profileArticlesCtrl'
  },
  params:{pageTitle:'Articles Page'}
 }
 })



.state('notifications',{
 url: '/profile/notifications',
 views: {
  'menuContent':{
    templateUrl: 'templates/profile/profile/notifications.html',
    controller: 'notificationsCtrl'
  },
  params:{pageTitle:'VIN notifications'}
 }
 })

.state('questions',{
 url: '/profile/questions',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/profile/questions.html',
    controller: 'profileQuestionsCtrl'
  },
  params:{pageTitle:'User Questions'}
 }
 })


.state('answers',{
 url: '/profile/answers',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/profile/answers.html',
    controller: 'profileAnswersCtrl'
  },
  params:{pageTitle:'User Answers'}
 }
 })




.state('account-settings',{
 url: '/profile/account-settings',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/profile/account-settings.html'
  },
  params:{pageTitle:'Messages'}
 }
 })


.state('account-settings.edit-profile',{
 url: '/edit-profile',
 views: {
  'idasher':{
    templateUrl: 'templates/general/profile/profile-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.edit-notifications',{
 url: '/notifications-settings',
 views: {
  'idasher':{
    templateUrl: 'templates/general/notifications-settings.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.password',{
 url: '/edit-password',
 views: {
  'idasher':{
    templateUrl: 'templates/general/password-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Password Edit'}
 }
 })



$urlRouterProvider.otherwise('/profile');

}]);
