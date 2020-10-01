var zapp = angular.module('admin.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'admin.router'
,'app.services'
,'app.factories'
,'admin.directives'
,'app.directives'
,'feed.directives'
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
  'modal',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal){

$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
//console.log(toState,fromState)
});
$rootScope.module = 'admin';
/**/
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData().then(function(res){
  console.log(res)
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
//console.log('acc_controx ::: ',$rootScope.userData)
})


$rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}


$rootScope.nav_cats = 
[
{title:'Dashboard',url:'dahsboard',icon:'fa-bars'},
{title:'Articles',url:'articles',icon:'fa-file-pdf'},
{title:'Questions',url:'questions',icon:'fa-question-circle'},
{title:'Answers',url:'answers',icon:'fa-comment'},
{title:'Comments',url:'comments',icon:'fa-comments'},
{title:'A2a',url:'a2a',icon:'fa-question'},
{title:'Institutions',url:'institutions',icon:'fa-bank'},
{title:'Payments',url:'payments',icon:'fa-credit-card'},
{title:'Users',url:'users',icon:'fa-users'},
{title:'Settings',url:'settings',icon:'fa-cogs'},
];

}]);//run





zapp.controller("dashboardCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){

}]);


zapp.controller("articlesCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){
$scope.modalData = [];
$scope.launchArticles = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}
var app_url = 'modules/account/accountApp.php';
var app_url2 = 'modules/general/generalApp.php';

dt['action_name'] = '';
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;
$scope.created_articles = $scope.purchased_articles = [];
$scope.loadMore = function(mode,offset=false,limit=false){
dt['mode'] = mode;
dt['params'] = {action:'get_articles',type:dt['mode']};
dt['feed_scope'] = mode+'_articles';
let skpx = dt['feed_scope'];
$scope[dt['feed_offset']] = (angular.isDefined(offset) && offset!==false) ? offset:0;
$scope[dt['feed_rows']] = ( angular.isDefined(limit) && limit!==false) ? limit:12;
console.log($scope[skpx])
$scope[skpx] = ($scope[skpx].length > 0) ? $scope[skpx]: [];
run.getloadMore(dt,$scope);
}
//$scope.loadMore('created');
 
$scope.start_add_article = false;
$scope.toggAdd = function(){
$scope.start_add_article = !$scope.start_add_article;
}

$scope.removeIndex =  function(item,list){
list.splice(list.indexOf(item),1);
};


var getRandomIntfunction = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
$scope.isLoading = false;
$scope.clientData = {};$scope.banner = [];
$scope.sendFile = function(clientData,banner){
//console.log(banner)
var app_link = 'modules/general/generalApp.php';
$scope.clientData.fileTag  = '';
$scope.isLoading = true;
toast.show({message:'Saving Files...',title:'Article Upload'});
//console.log(clientData)
clientData.action = 'uploadArticle';
var tm = new Date();
clientData.articleRef = 'aRef-'+getRandomIntfunction(11111, 99999)+'-'+tm.getTime();
/*
   angular.forEach($scope.banner,function(file){
     fd.append('banner[]',file);
   });
*/
var para = {transformRequest: angular.identity,
headers: {'Content-Type': undefined}
};
var payLoad = fd = testa = [];
for (var i = 0;  i < banner.length; i++) {
clientData.fileRef = 'fRef-'+getRandomIntfunction(11111, 99999)+'-'+tm.getTime();
clientData.fileTag = banner[i].tag;
fd = new FormData();
fd.append('banner', banner[i]);
fd.append('data', JSON.stringify(clientData));
testa.push(fd);
payLoad.push($http.post(app_link, fd, para));
}



$q.all(payLoad).then(function(results) {
  console.log(results);
//return;
$scope.modalData.isLoading = false;
$scope.modalData.message = 'All Files Saved Successfully!';
$scope.banner = [];
$scope.clientData = {};
$scope.isLoading = $scope.isUploading = false;
});

/*
multiCalls.endPoint(payLoad);
//fd.append('banner', $scope.banner);
//fd.append('signature', $scope.signature);
//
console.log(fd);
$http.post(appLink, fd, para).then(function (res) {
console.log(res)
});
*/
}//sendFile



$scope.Math = Math;


$scope.sendBlog = function(data){
data.action = 'sendBlog';
$http.post(app_url2,data).then(function(res){
console.log(res);
let rs = res.data;
if(rs.status == '1'){
$scope.articles.unshift(rs.data)
$scope.start_add_article = false;
}
})
}//sendBlog


}]);//articlesCtrl



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
var app_url = 'modules/general/generalApp.php';

dt['params'] = {action:'get_notifications'};
dt['feed_scope'] = 'notifications';
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


$scope.launchPreview = function(obj){
toast.show({message:obj.detail,title:'Notification'})
if(obj.status == 0){
$http.post(app_url,
    {action:'mark_notificaion',
  id:obj.id,
  index:obj.index
}).then(function(res){
console.log(res);
if(res.data.state == '1'){
var indz = res.data.index;
$scope.notifications[indz].status = '1';
$rootScope.userData.notifNum = $rootScope.userData.notifNum - 1;
}
})
}
}

}]);//notificationsCtrlCtrl


zapp.controller("transactionsCtrl", 
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
var app_url = 'modules/general/generalApp.php';


//run.getList(glk,$scope);   


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



$scope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
const ru = toState.name.split('.');
let navTab = ru[1];
$rootScope.navTab = navTab;
let actb = 'get_user_wallet_'+navTab;
let scp = 'user_wallet_'+navTab;

dt['params'] = {action:actb};
dt['feed_scope'] = scp;
$scope[dt['feed_scope']] = [];
$scope.loadMore = function(){
run.getloadMore(dt,$scope);
}
$scope.loadMore();
/*
let params = {action:actb};
console.log(params)
$http.post(app_url,params).then(function(res){
  console.log(res)
$scope[scp] = res.data[scp];
})
*/
});
$rootScope.wallet_tabs = [
{name:'Summary',url:'summary',icon:'fa-stream'},
{name:'Sales',url:'sales',icon:'fa-money'},
{name:'Purchases',url:'purchases',icon:'fa-shopping-cart'},
{name:' Referral ',url:'referral',icon:'fa-users'},
{name:'Settlements',url:'settlements',icon:'fa-gift'}
];


$scope.modalData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'paymentCtrl',pageTitle:'Payment Details'};
options.data = {...item,...data};
$scope.modalData = options.data;
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


$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

}]);//payCtrl



zapp.controller("answersCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){



const app_url = 'modules/admin/adminApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_admin_answers'};
dt['feed_scope'] = 'admin_answers';
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






}]);//answers




zapp.controller("questionsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){


const app_url = 'modules/admin/adminApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_admin_questions'};
dt['feed_scope'] = 'admin_questions';
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


}]);//questions




zapp.controller("commentsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){


const app_url = 'modules/admin/adminApp.php';

dt['action_name'] = '';
dt['params'] = {action:'get_admin_comments'};
dt['feed_scope'] = 'admin_comments';
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


}]);//comments


zapp.controller("messagesCtrl", 
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

    console.log('messagesCtrl')
var apl = 'modules/general/generalApp.php';


dt['action_name'] = '';
dt['params'] = {action:'get_messages'};
dt['feed_scope'] = 'messages';
$scope[dt['feed_scope']] = [];
dt['url'] = apl;
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


$scope.showResult = false;
$scope.is_searching = false;
$scope.is_fetching = false;
$scope.searchRec = function(text) {
console.log(text);
$scope.res_list = [];
if(text !== '' && text !== undefined && text !== ''){
$scope.is_searching = true;
$scope.is_fetching = true;
$scope.not_text = 'searching "'+text+'"';
$http.post(apl,{action:'searchReceipient',text:text}).then(function(res){
console.log(res.data);
$scope.is_fetching = false;
if(res.data.result && res.data.result.length > 0){
$scope.showResult = true;

$scope.not_text = 'Found match for "'+text+'"';
$scope.res_list = res.data.result;
}else{
$scope.showResult = false;
$scope.is_searching = false;  
}
}) 
}else{
$scope.not_text = 'please type something';
} 
}

$scope.setRece = function(item){
$scope.a.receiver = item;
$scope.a.userValid = true;
$scope.res_list = [];
$scope.showResult = false; 
$scope.is_searching = false; 
}


$scope.isValidating = $scope.userValidated = false;
$scope.userValidate =   function(data){
$scope.isValidating = true; $scope.userValidated = false;
$scope.disableAid = true;
data.userValid = false;
data.imess = null;
var pl = {action:'userValidation',receiver:data.receiver};
$http.post(apl,pl).then(function(rd){
$scope.isValidating = false;
$scope.userValidated = true;
console.log(rd); var res = rd.data;
if(res.isFound && res.email !==''){
data.userValid = true;
data.receiver = res.email;
}else{
data.imess =  '---'; 
//data.receiver =  '---'; 
data.userValid = false;   
}
$scope.disableAid = false;  
});//$http
}//validateAccount

$scope.isLoading = false;
$scope.sendAction = function(data){
$scope.isLoading = true;
$http.post(apl,data).then(function(rex){
  console.log(rex);
  $scope.isLoading = false;
});
}//sendAct

}]);


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




zapp.controller("institutionsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){

}]);//institutions


zapp.controller("usersCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){
var app_url ='modules/admin/adminApp.php'; 
  
dt['action_name'] = 'get_users';
dt['params'] = {action:'get_users'};
dt['feed_scope'] = 'users';
$scope[dt['feed_scope']] = [];
dt['url'] = app_url;
dt['loading'] = 'isFetching';
dt['disable_btn']  = 'disable_btn';
$scope[dt['btn_text']] = '_____';
$scope[dt['btn_icon']] = 'fa-ellipsis-v';
$scope[dt['feed_end']] = false; 
$scope[dt['feed_page']] = 10;
$scope[dt['feed_offset']] = 0;
$scope[dt['feed_rows']] = 100;
$scope[dt['loading']] = false;
$scope[dt['disable_btn']] = true;

$scope.loadMore = function(fp){
$scope[dt['feed_rows']] = (fp && fp !=='') ? fp:$scope[dt['feed_rows']];
console.log(dt)
run.getloadMore(dt,$scope);
}


$scope.loadMore();




$scope.modalData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/dial_page.html';
var data = {ctrl:'subAccountCtrl',pageTitle:'Account Details'};
options.data = {...item,...data};
$scope.modalData = options.data;
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



$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}


$scope.editField = function(data){
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
toast.show({message:rs.mess, title:'User Account'});
if(data.action === 'loginAs'){
  if(rs.state == '1'){
    $timeout(function() {
    window.location.replace(rs.nextUrl);
  }, 3000);
  }
}
})
}

$scope.search_started = $scope.is_searching = false;
$scope.search_done = false;
$scope.doSearch = function(item){
var data = {action:'user_search',term:item};
$scope.searched_users = [];
$scope.search_started = true;
$scope.is_searching = true;
$scope.search_done = false;
$http.post(app_url,data).then(function(res){
console.log(res);
$scope.is_searching = false;
$scope.search_done = true;
var rs = res.data;
$scope.searched_users = rs.searched_users;
  if(rs.state == '1'){
    $timeout(function() {
    ///window.location.replace(rs.nextUrl);
  }, 3000);
}
})
}

$scope.launchUserDel = function(id) {
if (confirm('Are you sure you want to Remove this User?')) {
return $scope.editField({action:'delUser',id:id});
}
 return false;
}

$scope.launchUserBlock = function(id,type) {
if(type == '-1'){
var qxb = 'Are you sure you want to Block this User?';
}else{
var qxb = 'Are you sure you want to UnBlock this User?';
}
if (confirm(qxb)) {
return $scope.editField({action:'blockUser',id:id,type:type});
}
return false;
}


$scope.launchAdm = function(id,type) {
if(type=='user'){
var qx = 'Are you sure you want to make this person a normal user?';
}else{
var qx = 'Are you sure you want to make this person a site admin?';
}
if (confirm(qx)) {
return $scope.editField({action:'makeAdmin',id:id,type:type});
}
return false;
}

$scope.launchUlog = function(id) {
if (confirm('Are you sure you want to Login As this User?')) {
return $scope.editField({action:'loginAs',id:id});
}
return false;
}



$scope.launchUserEdit = function(item) {
options.page = 'templates/admin/dialogs/user-edit.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};



$scope.launchAcc = function(type,id) {
options.page = 'templates/admin/dialogs/acc-tranx.php';
options.data = {type:type,id:id}
$scope.modalData = options.data;
modal.show(options,$scope)
};

}]);//users




zapp.controller("a2aCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){

}]);//a2a



zapp.controller("payCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){
var app_url = 'modules/admin/adminApp.php';

//run.getList(glk,$scope);   
dt['action_name'] = 'get_payments';
dt['params'] = {action:'get_payments'};
dt['feed_scope'] = 'payments';
$scope[dt['feed_scope']] = [];
dt['url'] = 'modules/admin/adminApp.php'
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


$scope.modalData = {};
var options = {};
$scope.launchView = function(item){
  console.log('-',item)
options.page = 'templates/directives/admin_dial_page.html';
var data = {ctrl:'paymentCtrl',pageTitle:'Payment Details'};
options.data = {...item,...data};
$scope.modalData = options.data;
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


$scope.modalData = [];
$scope.launchQuery = function(){
modal.show({page:'templates/dialogs/quick_query_search.html',data:$scope.modalData},$scope)
}

}]);//payments



zapp.controller("settingsCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'run',
  'modal',
  'toast',
  '$q',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q){

$scope.ipages = [
{id:0,title:'Site', url:'site'},
{id:1,title:'Faq', url:'faq'},
{id:2,title:'Pages', url:'pages'}
];

$scope.dropFaq = function(picker){
console.log(picker);
console.log(angular.element(picker.currentTarget.children[1]));
if(picker.currentTarget.children[1].style.display == 'block'){
picker.currentTarget.children[1].style.display = 'none';
}else{
picker.currentTarget.children[1].style.display = 'block';  
}

};

$scope.site_settings = $scope.isFetched = false;
var app_url = 'modules/admin/adminApp.php';
var glk = {
  scope:'site_settings',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
run.getList(glk,$scope);
var plk = {
  scope:'pages',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
run.getList(plk,$scope);
var flk = {
  scope:'faq',
  loading:'isLoading',
  loaded:'isFetched',
  url:app_url
}
run.getList(flk,$scope);
//$scope.site_loaded = false;
$scope.settings = [];
var options = {};
$scope.$watch('site_settings',function(value){
//console.log(value)
//console.log(typeof(value))
if(value && typeof(value) === 'object'){
angular.forEach($scope.site_settings,function(value,key){
let obj = {};
obj['label'] = key;
obj['value'] = value;
$scope.settings.push(obj);
})
//$scope.site_loaded = false;
//console.log($scope.settings)
}
})


$scope.launchPad = function(mode,curval,field,name,index) {
let pg = (mode=='edit') ? 'edit-site.php' :  (mode=='upload') ? 'upload-stuff.php':'';
options.page = 'templates/admin/dialogs/'+pg;
options.data = {index:index,mode:mode,val:curval,field:field,name:name}
$scope.modalData = options.data;
modal.show(options,$scope)
};


$scope.launchPageEdit = function(item) {
options.page = 'templates/admin/dialogs/edit-page.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};

$scope.launchFaq = function(item) {
options.page = 'templates/admin/dialogs/add-faq.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};

$scope.launchFaqEdit = function(item) {
options.page = 'templates/admin/dialogs/edit-faq.php';
options.data = item
$scope.modalData = options.data;
modal.show(options,$scope)
};


$scope.editField = function(data){
  console.log(data);
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
if(rs.state == '1' && (data.action ==='editSite')){
console.log($scope.modalData);
let indx = $scope.modalData.index;
$scope.settings[indx].value = data.label;
modal.close();
}
toast.show({message:rs.mess,title:'Admin Settings'})
})
}


}]);//settings
