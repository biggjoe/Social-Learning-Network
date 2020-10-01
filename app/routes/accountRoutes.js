var zapp = angular.module('account.router', []);

zapp.config( ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
$urlRouterProvider.when('/', '/account/feed');
$urlRouterProvider.when('/account/messages', '/account/messages/list');
$urlRouterProvider.when('/account/wallet', '/account/wallet/summary');
$urlRouterProvider.when('/account/account-settings', '/account/account-settings/profile');
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



.state('view-feed',{
 url: '/account/feed',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/feed.html',
    controller: 'feedCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('articles',{
 url: '/account/articles',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/articles.html',
    controller: 'articlesCtrl'
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

.state('user-questions',{
 url: '/account/questions',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/user-questions.html',
    controller: 'questionsCtrl'
  },
  params:{pageTitle:'User Questions'}
 }
 })


.state('user-answers',{
 url: '/account/answers',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/user-answers.html',
    controller: 'answersCtrl'
  },
  params:{pageTitle:'User Answers'}
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

.state('messages',{
 url: '/account/messages',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/messages.html'
  },
  params:{pageTitle:'Messages'}
 }
 })


.state('messages.list',{
 url: '/list',
 views: {
  'idasher':{
    templateUrl: 'templates/account/messages-list.html',
    controller: 'messagesCtrl'
  },
  params:{pageTitle:'List Messages'}
 }
 })

.state('messages.read',{
 url: '/read/:mId',
 views: {
  'idasher':{
    templateUrl: 'templates/account/messages-read.html',
    controller: 'messagesThreadCtrl'
  },
  params:{pageTitle:'Upload Articles'}
 }
 })


.state('wallet',{
 url: '/account/wallet',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/wallet.html'
  },
  params:{pageTitle:'Wallet'}
 }
 })

.state('wallet.summary',{
 url: '/summary',
 views: {
  'idasher':{
    templateUrl: 'templates/account/wallet/summary.html',
    controller: 'walletCtrl'
  },
  params:{pageTitle:'Summary'}
 }
 })

.state('wallet.referral',{
 url: '/referral',
 views: {
  'idasher':{
    templateUrl: 'templates/account/wallet/referral.html',
    controller: 'walletCtrl'
  },
  params:{pageTitle:'referral'}
 }
 })

.state('wallet.sales',{
 url: '/sales',
 views: {
  'idasher':{
    templateUrl: 'templates/account/wallet/sales.html',
    controller: 'walletCtrl'
  },
  params:{pageTitle:'Sales'}
 }
 })
.state('wallet.purchases',{
 url: '/purchases',
 views: {
  'idasher':{
    templateUrl: 'templates/account/wallet/purchases.html',
    controller: 'walletCtrl'
  },
  params:{pageTitle:'Purchases'}
 }
 })
.state('wallet.settlements',{
 url: '/settlements',
 views: {
  'idasher':{
    templateUrl: 'templates/account/wallet/settlements.html',
    controller: 'walletCtrl'
  },
  params:{pageTitle:'Purchases'}
 }
 })


.state('account-settings',{
 url: '/account/account-settings',
 views: {
  'menuContent':{
    templateUrl: 'templates/account/account-settings.html'
  },
  params:{pageTitle:'Messages'}
 }
 })


.state('account-settings.profile',{
 url: '/profile',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/profile-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.education',{
 url: '/education',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/education-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.departments',{
 url: '/departments',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/departments-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.stats',{
 url: '/stats',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/stats-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.followers',{
 url: '/followers',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/followers-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.followings',{
 url: '/followings',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/followings-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })
.state('account-settings.notifications',{
 url: '/notifications',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/notifications-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('account-settings.password',{
 url: '/password',
 views: {
  'idasher':{
    templateUrl: 'templates/account/profile/password-edit.html',
    controller: 'accountCtrl'
  },
  params:{pageTitle:'Password Edit'}
 }
 })



$urlRouterProvider.otherwise('/account/feed');

}]);
