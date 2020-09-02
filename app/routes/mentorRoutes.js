var zapp = angular.module('mentor.router', []);

zapp.config( ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
$urlRouterProvider.when('/', '/mentor/feed');
$urlRouterProvider.when('/mentor/messages', '/mentor/messages/list');
$urlRouterProvider.when('/mentor/account-settings', '/mentor/account-settings/edit-profile');
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



.state('view-feed',{
 url: '/mentor/feed',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/feed.html',
    controller: 'feedCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('articles',{
 url: '/mentor/articles',
 views: {
  'menuContent':{
    templateUrl: 'templates/mentor/articles.html',
    controller: 'articlesCtrl'
  },
  params:{pageTitle:'Checkout Page'}
 }
 })



.state('notifications',{
 url: '/mentor/notifications',
 views: {
  'menuContent':{
    templateUrl: 'templates/mentor/notifications.html',
    controller: 'notificationsCtrl'
  },
  params:{pageTitle:'VIN notifications'}
 }
 })

.state('user-questions',{
 url: '/mentor/questions',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/user-questions.html',
    controller: 'questionsCtrl'
  },
  params:{pageTitle:'User Questions'}
 }
 })


.state('user-answers',{
 url: '/mentor/answers',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/user-answers.html',
    controller: 'answersCtrl'
  },
  params:{pageTitle:'User Answers'}
 }
 })


 .state('report-details', {
  url: '/mentor/report-details/:url',
      views: {
      'menuContent': {
      templateUrl: 'templates/general/report-details.html',
      controller: 'reportDetailsCtrl'
    }
  }
})

.state('queries',{
 url: '/mentor/queries',
 views: {
  'menuContent':{
    templateUrl: 'templates/mentor/queries.html',
    controller: 'queriesCtrl'
  },
  params:{pageTitle:'VIN Queries'}
 }
 })

.state('api',{
 url: '/mentor/api',
 views: {
  'menuContent':{
    templateUrl: 'templates/mentor/api.html',
    controller: 'apiCtrl'
  },
  params:{pageTitle:'API Settings'}
 }
 })

 .state('payments',{
  url: '/mentor/payments',
  views: {
   'menuContent':{
     templateUrl: 'templates/mentor/payments.html',
     controller: 'payCtrl'
   },
   params:{pageTitle:'Payments'}
  }
  })

  .state('sub-accounts',{
   url: '/mentor/sub-accounts',
   views: {
    'menuContent':{
      templateUrl: 'templates/mentor/sub-accounts.html',
      controller: 'accountsCtrl'
    },
    params:{pageTitle:'Sub Accounts'}
   }
   })

.state('messages',{
 url: '/mentor/messages',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/messages.html'
  },
  params:{pageTitle:'Messages'}
 }
 })


.state('messages.list',{
 url: '/list',
 views: {
  'idasher':{
    templateUrl: 'templates/general/messages-list.html',
    controller: 'messagesCtrl'
  },
  params:{pageTitle:'List Messages'}
 }
 })

.state('messages.read',{
 url: '/read/:mId',
 views: {
  'idasher':{
    templateUrl: 'templates/general/messages-read.html',
    controller: 'messagesThreadCtrl'
  },
  params:{pageTitle:'Upload Articles'}
 }
 })


.state('account-settings',{
 url: '/mentor/account-settings',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/account-settings.html'
  },
  params:{pageTitle:'Messages'}
 }
 })


.state('account-settings.edit-profile',{
 url: '/edit-profile',
 views: {
  'idasher':{
    templateUrl: 'templates/general/profile-edit.html',
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



$urlRouterProvider.otherwise('/mentor/feed');

}]);
