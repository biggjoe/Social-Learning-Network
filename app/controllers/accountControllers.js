var zapp = angular.module('account.controller', [
'angular-loading-bar'
,'ui.router'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'account.router'
,'app.services'
,'app.factories'
,'app.directives'
,'feed.directives'
,'app.filters'
,'ngWig'
,'ngClipboard'
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
  'fileUpload',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  fileUpload){
$window.fbAsyncInit = function() {
    FB.init({ 
      appId: '375040369837254',
      status: true, 
      cookie: true, 
      xfbml: true,
      version: 'v2.4'
    });
};
$rootScope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
//console.log(toState,fromState)
});
$rootScope.module = 'account';
/**/
$rootScope.isLoaded = false;
$rootScope.userData = {isLogged:false,isLoaded:false,notifs:0,messages:0};
run.getUserData().then(function(res){
  console.log(res)
$rootScope.userData = {...$rootScope.userData,...res};
$rootScope.userData.isLoaded = true;
$rootScope.isLoaded = true;
//console.log('acc_controx ::: ',$rootScope.userData)
})


$rootScope.start_add_article = false;
$rootScope.toggAdd = function(){
$rootScope.start_add_article = !$rootScope.start_add_article;
}


$rootScope.launchPic = function(){
let options = {};
options.page = 'templates/dialogs/profile_pic_edit.html';
options.data = {};
options.data.avatar = $rootScope.userData.avatar;
modal.show(options,$rootScope);
}


$rootScope.uploadFile = function(file){
$rootScope.isLoading = true;
var fd = new FormData();
fd.append('file', file);
fd.append('action', 'updateProfilePic');
var uppLink = 'modules/account/accountApp.php';
fileUpload.uploadFileToUrl(fd, uppLink).then(function (res) {
  console.log(res)
$rootScope.isLoading = false;
var state  = res.data.state;
var avatar  = res.data.avatar;
if(state == '1'){
$rootScope.userData.avatar = avatar;
  modal.close();
}

})
/**/
};


}]);//run



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
  '$state',
  '$stateParams',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  run,
  modal,
  toast,
  $q,
  $state,
  $stateParams){
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
var app_link = 'modules/general/generalApp.php';
$scope.clientData = {};$scope.banner = $scope.modalData = [];
$scope.clientData.isLoading = false;
$scope.clientData.isDone = false;
$scope.sendFile = function(clientData,banner){
//$scope.hideUpload = true; 
$scope.banner = banner;
$scope.responded = [];
clientData.fileTag  = '';
clientData.action = 'uploadArticle';
var tm = new Date();
clientData.articleRef = 'aRef-'+getRandomIntfunction(11111, 99999)+'-'+tm.getTime();
var para = {transformRequest: angular.identity,
  headers: {'Content-Type': undefined}
};
var payLoad = fd = testa = [];
for (var i = 0;  i < banner.length; i++) {
  $scope.modalData[i] = {};
  $scope.modalData[i].imessage = 'uploading';
  $scope.modalData[i].isLoading = true;
  $scope.modalData[i].status = false;
  $scope.modalData[i].iclass = '';
  $scope.modalData[i].name = banner[i].tag;
clientData.fileRef = 'fRef-'+getRandomIntfunction(11111, 99999)+'-'+tm.getTime();
clientData.fileTag = banner[i].tag;
clientData.index = i;
clientData.isLoading = true; 
fd = new FormData();
fd.append('banner', banner[i]);
//
fd.append('data', JSON.stringify(clientData));
testa.push(fd);
banner[i] = $scope.modalData[i];
let sappLink = 'modules/general/generalApp.php';
payLoad.push($http.post(app_link, fd, para).then(function(res) {
console.log(res) 
console.log(banner[i]) 
 $scope.responded.push(true);
 let im ={};
 im.imessage = res.data.mess;
 im.status = res.data.status;
 im.index = res.data.index;
 im.name = res.data.name;
 im.iclass = res.data.class;
 im.isLoading = false;
$scope.modalData[im.index] = im;
banner[im.index] = im;
if($scope.responded.length == banner.length){
console.log('responses completed!!', banner);
toast.show({message:'File Upload Complete!'});
clientData.isLoading = false; 
$timeout(function() { 
$state.transitionTo($state.current, $stateParams, { 
reload: true, inherit: false, notify: true});
$scope.banner = banner =[];
clientData.isDone = true;  
toast.close(); 
}, 5000);
}
})
 );
}


}//sendFile//sendFile



$scope.Math = Math;


$scope.sendBlog = function(data){
data.action = 'sendBlog';
$http.post(app_url2,data).then(function(res){
console.log(res);
let rs = res.data;
if(rs.status == '1'){
toast.show({message:'Blog Created Successfully!'});
$scope.created_articles.unshift(rs.data)
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


$scope.viewSet = false;
$scope.modalData = {};
$scope.strip_tags = function(text) {return run.strip_tags(text);}; 
$scope.limitWords = function(text,num) {return run.limit_words(text,num)};         

$scope.exeMark = function(item,list){
var ids = run.stripIds($scope.selected_messages);
$scope.doMark(item,list);
var data = {};
data.action = 'setNotification';
data.setmode = item;
data.scope = 'modalData';
data.appLink = 'modules/general/generalApp.php';
data.data = run.stripIds($scope.selected_messages);
data.callback_after = 'callback_after';
data.callback_before = 'callback_before';
//data.state = $state;
$scope.callback_before = function(){
$scope.lockbtns = true;
}
$scope.callback_after = function(res){
toast.show({message:res.mess,delay:3000});
$rootScope.userNotif =  (item =='unread') ? 
($rootScope.userNotif + ids.length)
: (item == 'read') ? ($rootScope.userNotif - ids.length) : $rootScope.userNotif;
$scope.markSelected(item,$scope.notifications,ids);
$scope.lockbtns = false;
}
//data.reloadState = true;
senData(data,$scope,run);
}

$scope.selected_messages = [];

$scope.setMark = function(item,list){
run.setMark(item,list,$scope);
}

$scope.doMark = function(mode,list){
run.doMark(mode,list,$scope.selected_messages);
}//

$scope.markSelected = function(mode,list,ids){
run.markSelected(mode,list,ids);
}//

$scope.unMarkAll = function(list){
run.unMarkAll(list);
}//

$scope.toggleSelection = function(obj) {
run.toggleSelection(obj,$scope.notifications,$scope.selected_messages)
};

//
$scope.markNot =   function(data){
run.markNotification(data).then( function(rt){
$scope.notifications[data.index].status =
 data.mode;
$rootScope.userNotif = (data.curStatus == 0)  
? $rootScope.userNotif-1:$rootScope.userNotif;
})
}

}]);//notificationsCtrlCtrl



zapp.controller("walletCtrl", 
[
'$scope',
'$rootScope', 
'$mdDialog',
'$timeout',
'$window',
'$http',
'$state',
'$stateParams',
'doPay',
'run',
'modal',
function(
$scope,
$rootScope, 
$mdDialog,
$timeout,
$window,
$http,
$state,
$stateParams,
doPay,
run,
modal) {


var apl = 'modules/general/generalApp.php';


}]);



zapp.controller("withdrawalCtrl", 
[
'$scope',
'$rootScope', 
'$mdDialog',
'$timeout',
'$window',
'$http',
'$state',
'modal',
'run',
'ngClipboard',
function(
$scope,
$rootScope, 
$mdDialog,
$timeout,
$window,
$http,
$state,
modal,
run,
ngClipboard) {


var  appLink='modules/general/generalApp.php';
dt['action_name'] = '';
dt['params'] = {action:'get_payouts'};
dt['feed_scope'] = 'payouts';
$scope[dt['feed_scope']] = [];
dt['url'] = appLink;
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


$scope.copyLink =  ngClipboard.toClipboard;


$scope.launchPreview = function(data){
//data.ctrl = 'withdrawalCtrl'; 
data.pageTitle = 'Payout Request'; 
var options = {};
options.page = 'templates/dialogs/dialPage.html';
//options.ctrl = withdrawalCtrl;
options.data = data;
$scope.modalData = options.data;
modal.show(options,$scope);
}


}]);





zapp.controller("referralCtrl", 
[
'$scope',
'$rootScope',
'$timeout',
'$window',
'$http',
'$state',
'$stateParams',
'run',
'modal',
'$mdDialog',
'$mdConstant',
'ngClipboard',
function(
$scope,
$rootScope,
$timeout,
$window,
$http,
$state,
$stateParams,
run,
modal,
$mdDialog,
$mdConstant,
ngClipboard) {


$rootScope.usD = {};
$scope.isLoaded = false;
$scope.isFetching=false;
var  appLink=  appLink2='modules/general/generalApp.php';

$rootScope.ref_loaded = false;


var apl = 'modules/general/generalApp.php';
$scope.ref_loaded = false;
$http.post(apl,{action:'get_referral'}).then(function(res){
console.log(res);
$scope.referral = res.data.referral;
$scope.ref_loaded = true;
});

$scope.copyLink =  ngClipboard.toClipboard;
$scope.ldata = {};
$scope.launchInvite = function(data){
  console.log(data)
var options = {};
options.width = '';
options.page = 'templates/dialogs/referral_invite.html';
options.data = data;
$scope.listers = data;
modal.show(options,$scope); 
};


$scope.launchRedeem = function(ev,data){
console.log(data)
var options = {};
options.width = '';
options.page = 'templates/dialogs/referral_redeem.html';
options.data = data;
$scope.listers = data;
modal.show(options,$scope);
}

$scope.listers = $scope.earn =  [];;


$scope.addNums = function(data){ 
console.log(data)
data.push({number:''})
}

$scope.removeNum = function(list,obj){
list.splice(list.indexOf(obj),1);
}

$scope.isLoading = false;
$scope.sendInvite = function(data,mode){ 
console.log(data,mode);
$scope.isLoading = true;
$http.post(appLink2,{action:'sendReferralInvite', data:data,mode:mode}).then(function(res){
console.log(res);
$scope.isLoading = false;
var iclass  = (res.data.status == '1') ? 'good':'error';
$scope.isLoading  = false;
$scope.hideForm  = (res.data.status == '1') ? true : false;
$scope.imessage =  '<div class="'+iclass+'">'+res.data.message+'</div>';
if(res.data.status == '1'){
//$timeout(function() {
  //$state.transitionTo($state.current, $stateParams, { 
  //reload: true, inherit: false, notify: true
//});
//$scope.closeThisDialog();  
//}, 2000);
}//if status
});
}

$scope.closeThisDialog = function() {
modal.close();

};

$scope.isEdit = false;
$scope.separator_keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.SPACE, $mdConstant.KEY_CODE.COMMA];
$scope.updateSubject = function($chip,mode){
console.log($chip,mode)
}
$scope.referral = false;

$rootScope.$watch('isLoaded', function(value){
$scope.isLoaded = value;
if(value == true){
$scope.usD = $scope.data;
$scope.isLoading = false;
}//ifLoaded
})//$watch



$scope.copyLink =  ngClipboard.toClipboard;


}]); 







zapp.controller("transactionCtrl", 
[
'$scope',
'$rootScope', 
'$mdDialog',
'$timeout',
'$window',
'$http',
'$state',
'$stateParams',
'modal',
'run',
function(
$scope,
$rootScope, 
$mdDialog,
$timeout,
$window,
$http,
$state,
$stateParams,
modal,
run) {
var  appLink='modules/general/generalApp.php';
dt['action_name'] = '';
dt['params'] = {action:'get_transactions'};
dt['feed_scope'] = 'transactions';
$scope[dt['feed_scope']] = [];
dt['url'] = appLink;
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

$scope.launchPreview = function(data){
console.log(data)
var options = {};
options.page = 'templates/dialogs/dialPage.html';
//options.ctrl = transactionsCtrl;
data.ctrl = 'transactionsCtrl';
data.amount = data.cost; 
data.pdate = data.tdate; 
data.pageTitle = 'Transaction Detail';
options.data = data;
$scope.modalData = data;
modal.show(options,$scope);
}
var transactionsCtrl = ($scope,data) =>{
$scope.modalData = data.data;
$scope.closeThisDialog = ()=>{$mdDialog.hide();}
}

}]);


zapp.controller("accountCtrl", 
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
const app_url = 'modules/account/accountApp.php';
var app_url2 = 'modules/general/generalApp.php';
    
$scope.$on('$stateChangeSuccess',
  function (event, toState, toParams, fromState, fromParams) {
const ru = toState.name.split('.');
let navTab = ru[1];
$rootScope.navTab = navTab;
let actb = 'get_user_'+navTab;
let scp = 'user_'+navTab;
let params = {action:actb};
$http.post(app_url,params).then(function(res){
  console.log(res)
$scope[scp] = res.data[scp];
})
});

$rootScope.profile_tabs = [
{name:'Profile',url:'profile',icon:'fa-user-circle'},
{name:'Education',url:'education',icon:'fa-graduation-cap'},
{name:'Departments',url:'departments',icon:'fa-bank'},
{name:'Following',url:'followings',icon:'fa-rss'},
{name:'Followers',url:'followers',icon:'fa-user-plus'},
{name:'Password',url:'password',icon:'fa-user-lock'}
];

$rootScope.setTab = function(tab){
$rootScope.navTab = tab;
}

$scope.education = [];

$scope.lprn = function(mode){
if($scope.education.length == 0){$scope.fetch_education();}
  if(mode==='education'){
var pgs = 'templates/dialogs/add_education.html';
  }else if(mode==='departments'){
var pgs = 'templates/dialogs/add_departments.html';
  }
var opts = {
  data: {},
  page:pgs,
}
modal.show(opts,$scope)
}//lprn

$scope.education = [];
$scope.is_fetching = $scope.is_fetched = false;
$scope.fetch_education = function(){
$scope.is_fetching = true;
$scope.is_fetched = false;
$http.post(app_url2,{action:'fetch_education'}).then(function(res){
console.log(res)
$scope.is_fetching = false;
if(res.data.schools.length > 0){$scope.is_fetched = true;}
$scope.school_list = res.data.schools;
$scope.faculty_list = res.data.faculties;
$scope.department_list = res.data.departments;
});
}//fetch_education


$scope.sact = function(data){
  console.log(data)
$http.post(app_url,data).then(function(res){
  console.log(res);
let rs = res.data;
if(rs.status =='1'){
  modal.close();
}
if(rs.status =='1' && data.action === 'add_education'){
$scope.user_education.push(rs.data);
}
});
}//sact


$scope.edit_prof = function(mode){
let namex = 'hide_'+mode;
$scope[namex] = !$scope[namex];
}//edit_prof

$scope.save_prof = function(mode){
let val = $rootScope['userData'][mode];
let namex = 'hide_'+mode;
let parax = {action:'edit_user',label:mode,value:val};
$http.post(app_url,parax).then(function(res){
console.log(res);
let rs = res.data;
if(rs.status === '1'){
$scope[namex] = !$scope[namex];
}else{
toast.show({message:rs.mess,title:'Error'})
}
})
}//edit_prof

}]);//accountsCtrl


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



