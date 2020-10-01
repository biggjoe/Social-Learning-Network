var zapp = angular.module('admin.router', []);

zapp.config( ['$stateProvider', '$locationProvider', '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
//$locationProvider.html5Mode(true);
$locationProvider.html5Mode({ enabled: true, requireBase: false, rewriteLinks: false });
$urlRouterProvider.when('/', '/admin/dashboard');
$urlRouterProvider.when('/admin/messages', '/admin/messages/list');
$urlRouterProvider.when('/admin/profile', '/admin/profile/edit-profile');

$stateProvider
.state('dash',{
 url: '/dash',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/dashboard.html'
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
 url: '/admin/dashboard',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/dashboard.html',
    controller: 'dashboardCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('articles',{
 url: '/admin/articles',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/articles.html',
    controller: 'articlesCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('answers',{
 url: '/admin/answers',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/answers.html',
    controller: 'answersCtrl'
  },
  params:{pageTitle:'Answers'}
 }
 })

.state('questions',{
 url: '/admin/questions',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/questions.html',
    controller: 'questionsCtrl'
  },
  params:{pageTitle:'Questions'}
 }
 })



 .state('comments', {
  url: '/admin/comments',
      views: {
      'menuContent': {
      templateUrl: 'templates/admin/comments.html',
      controller: 'commentsCtrl'
    }
  }
})



.state('a2a',{
 url: '/admin/a2a',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/a2a.html',
    controller: 'a2aCtrl'
  },
  params:{pageTitle:'A2A'}
 }
 })




.state('institutions',{
 url: '/admin/institutions',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/institutions.html',
    controller: 'institutionsCtrl'
  },
  params:{pageTitle:'A2A'}
 }
 })



.state('transactions',{
 url: '/admin/transactions',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/transactions.html',
    controller: 'transactionsCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })
.state('notifications',{
 url: '/admin/notifications',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/notifications.html',
    controller: 'notificationsCtrl'
  },
  params:{pageTitle:'VIN notifications'}
 }
 })



 .state('payments',{
  url: '/admin/payments',
  views: {
   'menuContent':{
     templateUrl: 'templates/admin/payments.html',
     controller: 'payCtrl'
   },
   params:{pageTitle:'Payments'}
  }
  })

  .state('users',{
   url: '/admin/users',
   views: {
    'menuContent':{
      templateUrl: 'templates/admin/users.html',
      controller: 'usersCtrl'
    },
    params:{pageTitle:'Users'}
   }
   })


.state('messages',{
 url: '/admin/messages',
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



.state('settings',{
 url: '/admin/settings',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/settings.html',
    controller: 'settingsCtrl'
  },
  params:{pageTitle:'Site Settings'}
 }
 })



.state('profile',{
 url: '/admin/profile',
 views: {
  'menuContent':{
    templateUrl: 'templates/general/profile.html'
  },
  params:{pageTitle:'Messages'}
 }
 })


.state('profile.edit',{
 url: '/edit-profile',
 views: {
  'idasher':{
    templateUrl: 'templates/general/profile-edit.html',
    controller: 'profileCtrl'
  },
  params:{pageTitle:'Edit Profile'}
 }
 })

.state('profile.password',{
 url: '/edit-password',
 views: {
  'idasher':{
    templateUrl: 'templates/general/password-edit.html',
    controller: 'profileCtrl'
  },
  params:{pageTitle:'Password Edit'}
 }
 })


$urlRouterProvider.otherwise('/admin/dashboard');

}]);
