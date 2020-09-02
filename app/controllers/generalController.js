
var zapp = angular.module('general.controller', [
  'ngAudio',
  'pusher-angular'
  ]);

zapp.run([
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run){

    $rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}

}]);



zapp.controller("feedCtrl", 
[
'$scope',
'$rootScope', 
'$timeout',
'$window',
'$http',
'$state',
'run',
'toast',
function(
$scope,
$rootScope, 
$timeout,
$window,
$http,
$state,
run,
toast) {

var app_url = 'modules/general/generalApp.php';
dt['params'] = {action:'get_activity_feed'};
dt['feed_scope'] = 'activity_feed';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/generalApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();



}]);//feedCtrl



zapp.controller("answersCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.modalData = [];
var app_url = 'modules/general/generalApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_user_answers'};
dt['feed_scope'] = 'user_answers';
$scope[dt['feed_scope']] = [];
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
 


}]);//answersCtrl




zapp.controller("questionsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.modalData = [];
var app_url = 'modules/general/generalApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_user_questions'};
dt['feed_scope'] = 'user_questions';
$scope[dt['feed_scope']] = [];
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
 


}]);//questionsCtrl




zapp.controller("messagesThreadCtrl", 
[
'$scope',
'$rootScope', 
'$mdDialog',
'$timeout',
'$window',
'$http',
'$state',
'$stateParams',
'run',
'toast',
'$document',
'ngAudio',
'$pusher',
function(
$scope,
$rootScope, 
$mdDialog,
$timeout,
$window,
$http,
$state,
$stateParams,
run,
toast,
$document,
ngAudio,
$pusher) {
$scope.pid = $stateParams.mId;
var app_url = 'modules/general/generalApp.php';
//
var sound = ngAudio.load("audio/button-1.mp3"); // returns NgAudioObject
var playSound = function() {
sound.play();
};

$scope.movx = function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  });
}

$scope.isPushing = false;
$scope.isPushed = true;
var pushComm = function(data){
  console.log(data);
$scope.isPushing = true;
$http.post(app_url,{action:'get_chat_push',mid:data.mid}).then(function(res){
console.log('Pusher Triggered: ',res);
playSound();
let rda = res.data;
rda.other_party = ($rootScope.userData == rda.sender) ?
rda.sender : ($rootScope.userData == rda.receiver) ? rda.receiver : rda.sender;
$scope.message_thread.push(rda);
let idv = data.mid;
let anchor = 'mess'+idv;
$timeout(function() {
$scope.movx(anchor);
$scope.isLd[$scope.last_mess_index]['isLoading'] = false;
}, 100);

$scope.isPushing = false;
$scope.isPushed = true;
},function(error){
$scope.isPushing = false;
$scope.isPushed = true;  
});
}

var client = new Pusher('94b15ec0f11a47b7d711', {
      cluster: 'eu',
      forceTLS: true
    });
var pusher = $pusher(client);
const my_channel_name = 'chat-push-channel-'+$scope.pid;
const my_event_name = 'chat-push-event-'+$scope.pid;
var my_channel = pusher.subscribe(my_channel_name);
my_channel.bind(my_event_name,pushComm);
console.log(my_channel)
var socketId = null;

pusher.connection.bind('connected', function() {
  //socketId = pusher.connection.socket_id;
$scope.socketId = pusher.connection.baseConnection.socket_id;
});//pusherConn
/**/


dt['feed_scope'] = 'message_thread';
dt['params'] = {action:'get_message_thread',pid:$stateParams.mId};
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;
//
$scope.loadMore = function(){
$scope[dt['feed_scope']] = [];
console.log('DT ::::: ',dt)
run.getloadMore(dt,$scope);
}

$scope.loadMore();

$scope.winHeight = function() {
return document.documentElement.clientHeight - 205;  
}

$scope.list = {subject:''};
var is_admin = ($rootScope.module == 'admin') ? true:false;
$scope.a = {
  action: 'newMessage',
  pid: $scope.pid,
  is_admin:is_admin,
  subject: ''
}
$scope.$watch('message_thread',function(value){
console.log(value);
if(value.length > 0){
$scope.a.subject = 'Re: '+value[0].subject;
}
});

$scope.isLd = [];
$scope.isSending = false;
$scope.sendNew = function(data){
$scope.isSending = true;
$scope.isPushing = true;
$scope.isPushed = false;
data.socketId = $scope.socketId;
console.log(data)
$http.post(app_url,data).then(function(res){
console.log(res);
let rs = res.data;
let rda = rs.return_data;
let idv = rs.return_data.id;
let anchor = 'mess'+idv;
//
let cur_mess_index = $scope.message_thread.length;
$scope.last_mess_index = cur_mess_index;
if(rs.state == '1'){
rda.other_party = ($rootScope.userData == rda.sender) ?
rda.receiver : ($rootScope.userData == rda.receiver) ? rda.sender: rda.receiver;
$scope.message_thread.push(rda);
$timeout(function() {
$scope.isLd[cur_mess_index]['isLoading'] = true;
$scope.movx(anchor)
}, 100);
$scope.a.message = '';
}
//toast.show({message:rs.mess,title:'Compose Message'});
$scope.isSending = false;
});//$http

}


}]);



zapp.controller("messagesCtrl", 
[
'$scope',
'$rootScope', 
'$mdDialog',
'$timeout',
'$window',
'$http',
'$state',
'$stateParams',
'run',
'toast',
'modal',
'$document',
function(
$scope,
$rootScope, 
$mdDialog,
$timeout,
$window,
$http,
$state,
$stateParams,
run,
toast,
modal,
$document) {
var app_url = 'modules/general/generalApp.php';
dt['params'] = {action:'get_messages'};
dt['feed_scope'] = 'messages';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/generalApp.php'
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 12;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
    

///
var is_admin = ($rootScope.module == 'admin') ? true:false;
$scope.a = {
  action: 'newMessage',
  pid: 0,
  is_admin:is_admin,
  subject: ''
}
$scope.launchNew = function(){
var opts = {page:'templates/dialogs/new_message.html',data:{}}
modal.show(opts,$scope);
}

$scope.isSending = false;
$scope.sendNew = function(data){
  $scope.isSending = true;
$http.post(app_url,data).then(function(res){
console.log(res);
let rs = res.data;
toast.show({message:rs.mess,title:'Compose Message'});
$scope.isSending = false;
},function(err){
$scope.isSending = false;  
})
}
}]);


zapp.controller("accountCtrl", 
[
'$scope',
'$rootScope', 
'$mdDialog',
'$timeout',
'$window',
'$http',
'$state',
'$stateParams',
'run',
'toast',
'ngAudio',
'$document',
'$pusher',
function(
$scope,
$rootScope, 
$mdDialog,
$timeout,
$window,
$http,
$state,
$stateParams,
run,
toast,
ngAudio,
$document,
$pusher) {

var apl = 'modules/general/generalApp.php';

$scope.showResult = false;
$scope.is_searching = false;
$scope.is_fetching = false;

$scope.saveProfile = function(data) {
console.log(data);
$http.post(apl,{action:'saveProfile',data}).then(function(res){
console.log(res)
})  
}




}]);