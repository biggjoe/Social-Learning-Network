var zapp = angular.module('profile.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'profile.router'
,'app.services'
,'app.factories'
,'app.directives'
,'app.filters'
,'ngWig'
,'general.controller'
]);
var dt = {btn:{}}
dt.btn_text = 'btn_text';
dt.btn_icon = 'btn_icon';
dt.feed_end = 'false'; 
dt.feed_scope = '';
dt.feed_page = 'feed_page';
dt.feed_offset = 'feed_offset';
dt.feed_rows = 'feed_rows';
dt.loading = 'isLoading';
dt.action_name = 'action_name';

zapp.run([
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'cartApp',
  'modal',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  cartApp,
  modal){

$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
console.log(toState,fromState)
});
$rootScope.module = 'mentor';
/**/
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData('mentor').then(function(res){
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
//console.log('acc_controx ::: ',$rootScope.userData)
})


$rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}

}]);//run




zapp.controller("detailsCtrl", 
[
  '$scope',
  '$rootScope',
  '$state',
'$stateParams',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  function( 
  $scope,
  $rootScope,
  $state,
$stateParams,
  $timeout,
  $http,
  $window,
  run,
  modal){
$scope.profileData = [];

var app_url = 'modules/general/generalApp.php';
$scope.username = $stateParams.username;

dt['action_name'] = '';
dt['params'] = {action:'get_user_profile_details',username:$scope.username};
dt['feed_scope'] = 'user_profile_details';
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
//$scope.loadMore();


$scope.request_types = [
{action:'user_public_details'},
{action:'user_public_questions'},
{action:'user_public_answers'},
{action:'user_public_articles'},
{action:'user_public_followers'},
{action:'user_public_following'},
{action:'user_public_feed'}
];
$scope.profileData = []; 
for (var i = $scope.request_types.length - 1; i >= 0; i--) {
$scope.profileData[i]  =  $scope.request_types[i]
}


$scope.getDetails = function(username){
$http.post(app_url, {action:'checkPublicUser',username:username})
.then(function(rez) {
console.log(rez.data);

if(rez.data.response === true){//userExists

$scope.isL = true; 
$scope.request_load = $scope.responded = [];
var payLoad = [];
var tm = new Date();
var payLoad = fd = testa = [];
for (var i = 0;  i < $scope.request_types.length; i++) {
    $scope.profileData[i].is_requesting = true;
    $scope.profileData[i].request_done = false;
    $scope.profileData[i].item = $scope.request_types[i]['action'];
    $scope.profileData[i].response_returned = false;
    $scope.profileData[i].message = 'Fetching '+$scope.request_types[i]['action'];
    $scope.profileData[i].data = {};
$scope.payloadData = {};
$scope.payloadData.index = i;
$scope.payloadData.action = 'get_'+$scope.request_types[i]['action'];
$scope.payloadData.username = username;
$scope.payloadData.type = $scope.request_types[i]['action'];
//console.log($scope.payloadData)
payLoad.push($http.post(app_url, $scope.payloadData)
  .then(function(res) {
console.log('res :: ',res.data); 
//return;
 $scope.responded.push(true);
 let rs = res.data;
 let rsindex = res.data.index;
rs.request_done = true;
rs.is_requesting = false;
$scope.profileData[rsindex] = rs;
//console.log($scope.request_types[rsindex]['action'], ':: ',rs);
if($scope.responded.length === $scope.request_types.length){
console.log('responses completed!!',$scope.profileData); 
const  [details, questions, answers, articles, followers, following, feed] = $scope.profileData;
$scope.accountData = {details:details.response, 
  questions:questions.response, answers:answers.response,
   articles:articles.response, followers:followers.response, 
   following:following.response, feed:feed.response};
console.log($scope.accountData)
$scope.isL = false; 
}
})//pushPayload
)//pushCloses

}//for loop


}else{//userDoesNotExist
console.log('User Does not exist')
  $scope.isL = false;
}//userDoesNotExist Ends
}, function(){
$scope.isL = false;
console.log('Error Validating username')
});//checkPublickUser  
}//sendDetails

$scope.getDetails($scope.username)



}]);//detailsCtrl



zapp.controller("articlesCtrl", 
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
$scope.profileData = [];
$scope.launchArticles = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}
var app_url = 'modules/mentor/mentorApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_articles'};
dt['feed_scope'] = 'articles';
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
 
$scope.start_add_article = false;
$scope.toggAdd = function(){
$scope.start_add_article = !$scope.start_add_article;
}

}]);//dashboardCtrl


zapp.controller("reportDetailsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  '$state',
  '$stateParams',
  'toast',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  $state,
  $stateParams,
  toast,
  modal){

$scope.profileData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}

$scope.goTo = function(url){
var ur  = '/'+url;
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host+ur;
$window.location.assign(baseUrl);
}


$scope.url = $stateParams.url;
var appLink = app_url = 'modules/general/vinApp.php';
$scope.listReport = function(){
para = {action:'listReport', url : $scope.url};
$http.post(appLink,para).then(function(res){
console.log(res); 
$scope.vindata = res.data.vindata.attributes;
$scope.selected_items = res.data.selected_items;
$scope.curData = res.data.data;
console.log(res.data.data);
});
}

$scope.isMailing = false;$scope.sentMess ='';
$scope.mailReport = function(uid){
$scope.isMailing = true;
para = {action:'mailReport', url : uid};
console.log(para)
$http.post(appLink,para).then(function(res){
  console.log(res)
$scope.isMailing = false;
console.log(res); 
$scope.sentMess = '<div class="'+res.data.class+'">'+res.data.mess+'</div>';
//$scope.curCheckout = res.data.status;
toast.show({message:$scope.sentMess,title:'Send Report'})
return;
});
}


$scope.downloadFile = function(obj){
console.log(obj);
$scope.selected_items[obj.index].isLoading = true;
obj.action = 'downloadMissing';
$timeout(function() {
toast.show(
    {message:`Your File is downloading...<br> 
      This will take a few minutes`,title:'Info'})
}, 5000);
console.log(app_url)
$http.post(app_url,obj).then(function(res){
console.log(res);
$scope.selected_items[obj.index].isLoading = false;
toast.close();
let rs = res.data;
toast.show(
    {message:rs.mess,title:'Info'})
if(rs.state == '1'){
$scope.selected_items[obj.index].file_downloaded = true;
}
})
}//download file

$scope.reportMissing = function(obj){
console.log(obj);
$scope.selected_items[obj.index].isLoading = true;
obj.action = 'reportMissing';
$http.post(app_url,obj).then(function(res){
console.log(res);
$scope.selected_items[obj.index].isLoading = false;
let rs = res.data;
toast.show(
    {message:rs.mess,title:'Info'})
})
}//reportMissing



}]);//reportDetailsCtrl

zapp.controller("queriesCtrl", 
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

$scope.profileData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}
$scope.profileData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'queryCtrl',pageTitle:'VIN Query Details'};
options.data = {...item,...data};
$scope.profileData = options.data;
modal.show(options,$scope)
}


var glk = {
  scope:'vin_queries',
  loading:'isLoading',
  loaded:'isFetched',
  url:'modules/general/vinApp.php'
}
//run.getList(glk,$scope);
///

dt['params'] = {action:'get_vin_queries'};
dt['feed_scope'] = 'vin_queries';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/vinApp.php'
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
    

}]);//queriesCtrl



zapp.controller("notificationsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
$scope.profileData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}

var app_url = 'modules/general/vinApp.php';
var glk = {
  scope:'notifications',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
//run.getList(glk,$scope);   


dt['params'] = {action:'get_notifications'};
dt['feed_scope'] = 'notifications';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/vinApp.php'
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


$scope.launchPreview = function(obj){
toast.show({message:obj.detail,title:'Notification'})
if(obj.status == '0'){
$http.post(app_url,
    {action:'mark_notificaion',
  id:obj.id,
  index:obj.index
}).then(function(res){
console.log(res);
if(res.data.state == '1'){
var indz = res.data.index;
$scope.notifications[indz].status = '1'
}
})
}
}

}]);//notificationsCtrlCtrl

zapp.controller("apiCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  modal){

$scope.profileData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}


}]);//apiCtrl

zapp.controller("payCtrl", 
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
    var app_url = 'modules/general/vinApp.php';
    var glk = {
      scope:'payments',
      loading:'isLoading',
      loaded:'isFetched',
      url:app_url
    }
//run.getList(glk,$scope);   
dt['params'] = {action:'get_payments'};
dt['feed_scope'] = 'payments';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/vinApp.php'
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


$scope.profileData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'paymentCtrl',pageTitle:'Payment Details'};
options.data = {...item,...data};
$scope.profileData = options.data;
modal.show(options,$scope)
}

$scope.submitPay = ()=>{
var options = {data:{}}
options.page = 'templates/dialogs/submit_pay.html';
modal.show(options,$scope);
}


$scope.sendPayment = function(data){
data.action = 'submitPayment';
data.date = (new Date(data.date).getTime())/1000;
data.amount = data.dueAmount*100;
data.transactionName = 'Wallet Funding';
console.log(data);
$http.post('modules/payApp.php',data).then(function(res){
var rs = res.data;
console.log(rs);
if(rs.uid > 0){
$scope.payments.unshift(rs.pay_data);
 $scope.imessage = `<div class="good px10 py10"> <i class="fas fa-check-circle status-active"></i> &nbsp;Your Payment notification has been received.
  You will be notified when it is approved</div>`;
  $scope.hideForm = true;
}else{
 $scope.imessage = `<div class="error px10 py10"><i class="fas fa-exclamation-triangle status-cancelled"></i> &nbsp;Your Payment notification failed to be submitted at this time.
  Try again later</div>`;
    $scope.hideForm = false;
}  

});
}


$scope.profileData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}

}]);//payCtrl

zapp.controller("accountsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
    var app_url = 'modules/general/vinApp.php';
    var glk = {
      scope:'sub_accounts',
      loading:'isLoading',
      loaded:'isFetched',
      url:app_url
    }
    //run.getList(glk,$scope);   

   
dt['params'] = {action:'get_sub_accounts'};
dt['feed_scope'] = 'sub_accounts';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/general/vinApp.php'
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




$scope.profileData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'subAccountCtrl',pageTitle:'Account Details'};
options.data = {...item,...data};
$scope.profileData = options.data;
modal.show(options,$scope)
}

$scope.launchSubber = function(item){
options.page = 'templates/dialogs/new_sub_account.html';
var data = {ctrl:'subAccountCtrl',pageTitle:'Account Details'};
options.data = data;
$scope.ldata = options.data;
modal.show(options,$scope)
}



$scope.isFinishedRegister = false;
$scope.createSubAccount = function(rdata){
console.log(rdata);
$scope.isLoading = true;
$scope.reg_notice = '';
rdata.action = 'createSubAccount';
$http.post(app_url,rdata).then(function(res) {
  console.log(res)
var rs = res.data,
rmess = rs.mess,
rclass = rs.class;
var ntc = '<div class="'+rclass+'">'+rmess+'</div><br>';
ntc += "";
rs.password = rdata.password;
$scope.reg_notice = ntc;
$scope.isLoading = false;
  toast.show({message:ntc,title:'New Sub Account'})
if(rs.state==1){
$scope.isFinishedRegister = true;
$scope.sub_accounts = $scope.sub_accounts.unshift(rs.account_data);
}else if(rs.state=='0'){
$scope.isFinishedRegister = false;
}
$scope.isLoading = false; 
}, function(e) {
  console.log(e)
var ntl = '<div class="error">Network Error! Please Try again later.</div>';
toast.show({message:ntl,title:'New Sub Account'})
});

}



$scope.profileData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.profileData},$scope)
}


}]);//accountsCtrl

zapp.controller("profileCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast){
    
$scope.launchMess = function(obj){
obj.action = 'sendMail';
options.page = 'templates/dialogs/compose_message.html';
var data = obj;
options.data = data;
$scope.rp = options.data;
modal.show(options,$scope)
}

$scope.reply = function(ev,pid,mode,data,receiver){
  console.log(receiver)
$scope.launchSend(ev,pid,mode,data,receiver);  
};

$scope.doAct = function(ldata){
  ldata.action = 'editUser';
var applink = 'modules/general/generalApp.php';
console.log(ldata);
$http.post(applink,ldata).then(function(res){
console.log(res);
var rs = res.data;
toast.show({message:rs.mess,title:'Profile Edit'})
})
}//doAct

$scope.resetKey = function(type){
var data = {action:'reset_key',type:type};
var applink = 'modules/general/generalApp.php';
var col = (type=='secret') ? 'match_key':(type=='public') ? 'public_key':'';
console.log(col);
$http.post(applink,data).then(function(res){
console.log(res);
var rs = res.data;
if(rs.state == '1'){
$rootScope.userData[col] = rs[col];
}
toast.show({message:rs.mess,title:'Profile Edit'})
})
}//doAct

$scope.resetPassword = function(ldata){
ldata.action = 'editPassword';
var applink = 'modules/general/generalApp.php';
$http.post(applink,ldata).then(function(res){
console.log(res);
var rs = res.data;
if(rs.state == '1'){
}
toast.show({message:rs.mess,title:'Password Edit'})
})
}//resetPassword



var strength = {
        0: "Worst ☹",
        1: "Bad ☹",
        2: "Weak ☹",
        3: "Good ☺",
        4: "Strong ☻"
}
var meter = document.getElementById('password-strength-meter');
$scope.text  = '';
/*

var passwordasas = document.getElementById('passwordasas');

var text = document.getElementById('password-strength-textx');

passwordasas.addEventListener('input', function()
{
    var val = password.value;
    var result = zxcvbn(val);
    
    // Update the password strength meter
    meter.value = result.score;
   
    // Update the text indicator
    if(val !== "") {
        text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>" + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span"; 
    }
    else {
        text.innerHTML = "";
    }
});
*/

$scope.check_pass = function(val){
  console.log(val)
var result = zxcvbn(val);
meter.value = result.score;
    if(val !== "") {
       $scope.text = `<h3>Strength: ` + `<strong>`+ strength[result.score] + "</strong>" 
       + `</h3><p class='meter-feedback'>` 
       + result.feedback.warning + `</p><p>` 
       + result.feedback.suggestions + `</p>`; 
    }
    else {
        $scope.textL = "";
    }
}


}]);//messagesCtrl



