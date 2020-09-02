var zapp = angular.module('account.router', []);

zapp.config( ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
$urlRouterProvider.when('/', '/account/dashboard');
$urlRouterProvider.when('/account/messages', '/account/messages/list');
$urlRouterProvider.when('/account/profile', '/account/profile/edit-profile');
$stateProvider
.state('dash',{
 url: '/dash',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/dashboard-home.html'
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



.state('view-dashboard',{
 url: '/account/dashboard',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/dashboard.html',
    controller: 'dashboardCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('checkout',{
 url: '/account/checkout',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/checkout.html',
    controller: 'checkoutCtrl'
  },
  params:{pageTitle:'Checkout Page'}
 }
 })



.state('notifications',{
 url: '/account/notifications',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/notifications.html',
    controller: 'notificationsCtrl'
  },
  params:{pageTitle:'VIN notifications'}
 }
 })

.state('reports',{
 url: '/account/reports',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/reports.html',
    controller: 'reportCtrl'
  },
  params:{pageTitle:'VIN Reports'}
 }
 })


 .state('report-details', {
  url: '/account/report-details/:url',
      views: {
      'menuContent': {
      templateUrl: 'templates/general/report-details.html',
      controller: 'reportDetailsCtrl'
    }
  }
})

.state('queries',{
 url: '/account/queries',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/queries.html',
    controller: 'queriesCtrl'
  },
  params:{pageTitle:'VIN Queries'}
 }
 })

.state('api',{
 url: '/account/api',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/api.html',
    controller: 'apiCtrl'
  },
  params:{pageTitle:'API Settings'}
 }
 })

 .state('payments',{
  url: '/account/payments',
  views: {
   'menuContent':{
     templateUrl: 'templates/account/payments.html',
     controller: 'payCtrl'
   },
   params:{pageTitle:'Payments'}
  }
  })

  .state('sub-accounts',{
   url: '/account/sub-accounts',
   views: {
    'menuContent':{
      templateUrl: 'templates/account/sub-accounts.html',
      controller: 'accountsCtrl'
    },
    params:{pageTitle:'Sub Accounts'}
   }
   })

.state('messages',{
 url: '/account/messages',
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



$urlRouterProvider.otherwise('/account/dashboard');

}]);
