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

.state('test3',{
 url: '/test3',
 views: {
  'menuContent':{
    templateUrl: 'test3.html',
    controller: 'pageCtrl'
  },
  params:{pageTitle:'Dashboard'}
 }
 })

.state('checkout',{
 url: '/admin/checkout',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/checkout.html',
    controller: 'checkoutCtrl'
  },
  params:{pageTitle:'Checkout Page'}
 }
 })

.state('reports',{
 url: '/admin/reports',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/reports.html',
    controller: 'reportCtrl'
  },
  params:{pageTitle:'VIN Reports'}
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


 .state('report-details', {
  url: '/admin/report-details/:url',
      views: {
      'menuContent': {
      templateUrl: 'templates/general/report-details.html',
      controller: 'reportDetailsCtrl'
    }
  }
})
 .state('error-reports', {
  url: '/admin/error-reports',
      views: {
      'menuContent': {
      templateUrl: 'templates/admin/error-reports.html',
      controller: 'errorreportsCtrl'
    }
  }
})
 .state('error-details', {
  url: '/admin/error-details/:url',
      views: {
      'menuContent': {
      templateUrl: 'templates/admin/error-report-details.html',
      controller: 'errorreportsCtrl'
    }
  }
})

.state('queries',{
 url: '/admin/queries',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/queries.html',
    controller: 'queriesCtrl'
  },
  params:{pageTitle:'VIN Queries'}
 }
 })

.state('api',{
 url: '/admin/settings',
 views: {
  'menuContent':{
    templateUrl: 'templates/admin/settings.html',
    controller: 'settingsCtrl'
  },
  params:{pageTitle:'Site Settings'}
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
