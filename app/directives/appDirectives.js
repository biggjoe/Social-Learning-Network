var zapp = angular.module('app.directives', [])

var senData = function(data,$scope,run){
var skope = data.scope;
$scope[skope]['message'] = 'Working....';
$scope[skope]['isLoading'] = true;
if(data.callback_before){ $scope[data.callback_before](data)}
run.sendData(data).then(function(result){
    console.log(result)
$scope[skope]['message'] = result.message;
$scope[skope]['isLoading'] = result.isLoading;
$scope[skope]['hideForm'] = result.sent;
if(data.callback_after){ $scope[data.callback_after](result,data)}
});
}//


zapp.directive('loadHolder', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/load-holder.html`,
scope:{layers:'=',toshow:'=',tohide:'='},
controller:function($scope,$rootScope){
$scope.isLoaded = false;
$rootScope.$watch('isLoaded',(value)=>{
$scope.isLoaded = value;
});
//
$scope.$watch('toshow',(value)=>{
$scope.isToShow = (value !== undefined) ? value:null;
});
$scope.$watch('tohide',(value)=>{
$scope.isToHide = (value !== undefined) ? value:null;
});
}
};
});

zapp.directive('commentHolder', function () {
return {
restrict: 'EA',
templateUrl: `templates/directives/comment-holder.html`,
};
});

zapp.directive('homeAccounts', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/home-accounts.html`
};
});


zapp.directive('quickLogin', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/quick-login.html`,
controller:['$scope', '$http', 'parse', '$timeout', '$window', 
function($scope, $http, parse, $timeout, $window){
$scope.ldata = {};
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doLogin = function(data){
data.action = 'userLogin';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
var vUrl = 'modules/account/accountApp.php';
$http.post(vUrl,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
let dir = $window.parent.location.href;
$window.location.replace(dir);  
}, 1500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}
}]//controller
};
});




zapp.directive('itemAvatar', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<span class="profiler">
<span class="profile-{{size}}" style="background: url({{img}});"></span>
</span>`,
scope:{img:'=', size:'@'},
controller:['$scope', function($scope){
$scope.size = ($scope.size) ? $scope.size:'avatar';
}]//controller
}//return

}]);//itemHeader


zapp.directive('stickyHeader', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="sticky border-bottom bg-white plain-bg-pattern">
<div class="py10 px10 z-higher" layout="row" layout-align="start center">

<a ng-if="canGoBack == true" class="stik-back-btn" ng-click="goBack()"> <i class="fas fa-arrow-left"></i> </a>
<span class="bolder" flex><i class="fas {{page_icon}}"></i>&nbsp; {{page_title}}</span>

<span>
<button ng-click="toggAdd()" 
class="{{start_add_article ? 'md-warn':'md-primary'}} md-raised px15 mx0 my0 md-button md-ink-ripple">
<i class="fas {{start_add_article ? 'fa-chevron-up':'fa-edit'}}"></i>&nbsp; 
<span ng-if="start_add_article">CLOSE</span>
<span ng-if="!start_add_article">ASK<span class="sm-hide"> QUESTION</span></span>
</button>
</span>
</div><!--sticky-header-->
<div class="article_pad down_slider border-top" ng-show="start_add_article">
<div class="px10 py10" >


<textarea class="form-control asker-input" 
rows="1" ng-model="q.question" placeholder="Enter question here..."></textarea>

<div layout="row" class="bordered border-radius-4 mt10">
<md-input-container flex class="my0" 
ng-show="(q.question && q.question !=='') || q.department_id">
<md-select class="no-bottom-line" 
 ng-model="q.department_id" 
 ng-disabled="q.department_id && q.department_id != 0 && item.is_department_feed">
<md-option ng-value="0" ng-selected="q.department_id == 0">Select Department</md-option>
<md-option ng-repeat="itd in department_list" ng-value="itd.id">{{itd.name}}</md-option>
</md-select>
</md-input-container>
</div>

<div class="pt10" ng-show="q.department_id != 0 && q.question && q.question !==''" 
layout="row" layout-align="start center">
<span flex>
<button ng-click="askQ(q)" 
class="md-primary md-raised px15 mx0 my0 md-button">
<i class="fas fa-save"></i>&nbsp; SEND QUESTION</button>
</span>

<span>
<label>
<input type="checkbox"
 ng-true-value="0" ng-false-value="1" ng-model="q.is_public">&nbsp;
Make Private</label>
</span>

</div>
</div>

</div>

<!--department-details-->
<div class="border-top pxy5" ng-if="item.is_department_feed">
<div class="pb0 article-meta txt-gray" layout="row" 
layout-align="start center">
<span flex>
  <button class="md-raised btn btn-clear px10"> 
  <i class="fas fa-edit"></i>&nbsp;<span class="bolder sm-hide">Topics&nbsp;</span>{{item.topics_num}}</button>

 <button ng-click="sItem('follow_topic')" 
  class=" md-raised btn btn-clear px10">
  <span class="bolder"><i class="fas fa-rss"></i>&nbsp;Follow </span>{{item.department_follows}} </button> 

</span>

<div class="">
<span><button 
  class="btn {{topic_details.answer_num ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-comment"></i> </button> {{topic_details.answer_num | number}}
</span>
<span><button 
  class="btn {{topic_details.total_shares ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-share-alt"></i> </button> {{topic_details.total_shares | number}}
</span>
</div>
</div>
</div><!--department-details-->

</div><!--sticky-header-->`,
scope:{title:'@', icon:'@', item:'=?bind', goback:'=', list:'@'},
controller:['$scope','toast', function($scope,toast){
$scope.item = ( angular.isDefined($scope.item) ) ? $scope.item:{department_id:0};
$scope.q = {department_id:$scope.item.department_id,is_public:1};
var app_url = 'modules/feed/feedApp.php';
var app_url2 = 'modules/general/generalApp.php';
var lister = false;
$scope.$watch('$parent.isFetched', function(val){
console.log('lister', lister);
if(val === true){
let list = $scope.list;
lister = $scope.$parent[list];
//console.log('lister', lister)
}
});
$scope.page_icon = ($scope.icon) ? $scope.icon : 'fa-list';
$scope.page_title = ($scope.title) ? $scope.title : '-';
$scope.canGoBack = ($scope.goback) ? $scope.goback : false;
$scope.start_add_article = false;
$scope.toggAdd = function(){
$scope.start_add_article = !$scope.start_add_article;
if($scope.department_list.length == 0){$scope.fetch_departments();}
}

$scope.department_list = [];
$scope.is_fetching = $scope.is_fetched = false;
$scope.fetch_departments = function(){
$scope.is_fetching = true;
$scope.is_fetched = false;
$http.post(app_url2,{action:'list_user_departments'}).then(function(res){
console.log(res)
$scope.is_fetching = false;
if(res.data.departments.length > 0){$scope.is_fetched = true;}
$scope.department_list = res.data.departments;
});
}//fetch_departments



$scope.askQ = function(data){
  data.action = 'saveQuestion';
console.log(data);
$scope.isLoading = true;
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
rs.message = `<div class="`+rs.class+`">`+rs.mess+`</div>`;
$scope.isLoading = false;
if(lister !== false){lister.unshift(rs.data)}
toast.show({title:'Info',message:rs.message});
})
$scope.start_add_article = false;
}//saveQuestion

$scope.goBack = function() {
  window.history.back();
}
}]//controller
};

}]);//askPanel



zapp.directive('articleMeta', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<div class="pb10 article-meta txt-gray" layout="row" 
layout-align="start center">
<span flex>
<span ng-if="item.mode !== 'blog'">
<start-buy-btn ng-if="item.for_sale == 1" item="item" 
btn_class="md-primary md-button md-raised btn-outline-primary px20" 
label="Buy This"></start-buy-btn> {{item.total_sales}}
</span>
</span>
<span>
<div class="px10 txt-sm">
<share-item item="item" counter="item.total_shares" showcount="true"></share-item>
  <span><span ng-if="item.mode !== 'blog'"><button ng-disabled="item.files.length === 0"
  class="btn {{item.files.length > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-paperclip"></i><md-tooltip>Files</md-tooltip> </button> {{item.files.length}}</span> &nbsp;</span>
  <span><button ng-click="sItem('rate_article')" ng-disabled="item.rated"
  class="btn {{item.total_ratings > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-star"></i> <md-tooltip>Rating</md-tooltip></button>  {{item.total_ratings}}</span> &nbsp;
  <span><button ng-click="sItem('save_article')" ng-disabled="item.saved" 
  class="btn {{item.total_saves > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-save"></i> <md-tooltip>Saves</md-tooltip></button> {{item.total_saves}}</span> &nbsp;
  <span><button ng-click="sItem('like_article')" ng-disabled="item.liked" 
  class="btn {{item.total_likes > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i> <md-tooltip>Likes</md-tooltip></button> {{item.total_likes}}</span> &nbsp;
  
</div>
</span>

</div><!--meta-->

</div>`,
scope:{item:'='}
};

}]);//articleMeta




zapp.directive('departmentItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<md-list-item  class="md-1-line">
<span class="md-icon-avatar has-awesome"> <i class="fas fa-bank"></i> </span>
<div class="md-list-item-text" layout="column" flex>
<h3 style="margin: 0; line-height: 1.2;">{{item.name}}</h3>
</div>
<span class="md-secondary py10"> 
<department-follow-btn item="item"></department-follow-btn>
</span>
<md-divider></md-divider>
 </md-list-item>
</div>`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', '$filter', 
function($scope, $rootScope, $filter){
$scope.action_text = (angular.isDefined($scope.mode) && $scope.mode==='following') ? ' was followed ':
(angular.isDefined($scope.mode) && $scope.mode==='followers') ? ' follows ':'';
//console.log($scope.item)
$scope.isLoaded = false;

}]//controller
}
}]);//departmentItem






zapp.directive('followItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<md-list-item  class="md-1-line align-start">
<span class="md-avatar" style="background: url({{item.other_avatar}});"></span>
<div class="md-list-item-text pt15 pb10 my0">

<div style="margin: 0; line-height: 1.2;" class="">
<a class="bolder" href="{{item.other_url}}">{{item.other_name}}</a> {{action_text}}
</div>
<span class="txt-sm" flex> <i class="fa fa-clock"></i>&nbsp;{{item.fdate*1000 |  getTime}}</span>
</div>
<span class="md-secondary"> 
<user-follow-btn item="item"></user-follow-btn>
</span>
<md-divider></md-divider>
 </md-list-item>
</div>`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', 'toast', 
function($scope, $rootScope, toast){
$scope.action_text = (angular.isDefined($scope.mode) && $scope.mode==='following') ? ' was followed ':
(angular.isDefined($scope.mode) && $scope.mode==='followers') ? ' follows ':'';

}]//controller
}
}]);//followItem




zapp.directive('friendSuggest', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/friend_suggest.html`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', 'toast', 'run',
function($scope, $rootScope, toast, run){
var app_url = 'modules/general/generalApp.php';
$scope.is_done_load = false;
$http.post(app_url,{action:'list_friend_suggest'}).then(function(res){
console.log(res);
let rs = res.data;
$scope.friend_suggest_list = [];
angular.forEach(rs,function(obj,key){
obj.lesser = run.strip_tags(obj.bio);
obj.lesser = run.limit_words(obj.lesser,12);
$scope.friend_suggest_list[key] = obj;
$scope.is_done_load = false;
});
});//https
}]//controller
}
}]);//friendSuggest





zapp.directive('userFollowBtn', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<button ng-click="sItem(item.is_followed)" 
class="uppercase px10 txt-xsm bold {{item.is_followed ? 'btn-danger':'btn-primary'}} btn btn-rounded  btn-sm">
<span><i class="fas {{item.icon}}"></i><span ng-show="hidetext !== true">&nbsp;{{item.is_followed ? 'Unfollow':'Follow'}}</span></span>
<md-tooltip>{{item.is_followed ? 'Unfollow':'Follow'}}</md-tooltip>
</button>
`,
scope:{item:'=', mode:'@', hidetext:'='},
controller:['$scope','$rootScope', 'toast', 
function($scope, $rootScope, toast){
$rootScope.$watch('userData.isLogged', function(value){
$scope.item.is_logged = value;
})
$scope.item.is_loading = false;
$scope.item.icon = ($scope.item.is_followed==true) ? 'fa-user-minus':
($scope.item.is_followed==false) ? 'fa-rss':'';
var cur_icon = $scope.item.icon;
$scope.isLoaded = false;
var app_url = 'modules/feed/feedApp.php';
$scope.sItem = (type) => {
if($scope.item.is_logged == false){return;}
if(type===false){
$scope.item.action = 'save_follow_user';
}else if(type===true){
$scope.item.action = 'save_unfollow_user';
}
$scope.item.is_loading = true;
$scope.item.icon = 'fa-spin fa-circle-notch';
$http.post(app_url,$scope.item).then((res)=>{
$scope.item.is_loading = false;
console.log(res);
let rs = res.data;
if(type === false && rs.status == '1' && rs['mode']=='follow'){
$scope.item.is_followed = true;
$scope.item.icon = 'fa-user-minus';
}else if(type === true && rs.status == '1' && rs['mode']=='unfollow'){
$scope.item.is_followed = false;
$scope.item.icon = 'fa-rss';
}else if(rs.status == '100'){
$scope.item.icon = cur_icon; 
toast.show({title:'Error',message:'You cannot follow yourself'}) 
}
},function(error){
$scope.item.is_loading = false;  
});
}//saveCommAns


}]//controller
}
}]);//userfollowBtn


zapp.directive('departmentFollowBtn', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<button ng-click="sItem(item.is_followed)" ng-show="item.can_follow"
class="uppercase px10 txt-xsm bold {{item.is_followed ? 'btn-danger':'btn-primary'}} btn btn-rounded  btn-sm">
<span><i class="fas {{item.icon}}"></i>&nbsp; 
{{item.is_followed ? 'Unfollow':'Follow'}}</span></button>
`,
scope:{item:'=', mode:'@'},
controller:['$scope','$rootScope', 'toast', 
function($scope, $rootScope, toast){
$scope.item.can_follow = (angular.isDefined($scope.item.is_followed)) ? true:false;

$scope.item.is_loading = false;
$scope.item.icon = ($scope.item.is_followed==true) ? 'fa-user-minus':
($scope.item.is_followed==false) ? 'fa-rss':'';
var cur_icon = $scope.item.icon;
$scope.isLoaded = false;
var app_url = 'modules/feed/feedApp.php';
$scope.sItem = (type) => {
//console.log(type)
let ivotes = ["upvote","downvote"];
if(type===false){
$scope.item.action = 'save_follow_department';
}
if(type===true){
$scope.item.action = 'save_unfollow_department';
}
console.log($scope.item);
$scope.item.is_loading = true;
$scope.item.icon = 'fa-spin fa-circle-notch';
$http.post(app_url,$scope.item).then((res)=>{
$scope.item.is_loading = false;
console.log(res);
let rs = res.data;
if(type === false && rs.status == '1' && rs['mode']=='follow'){
$scope.item.is_followed = true;
$scope.item.icon = 'fa-user-minus';
}else if(type === true && rs.status == '1' && rs['mode']=='unfollow'){
$scope.item.is_followed = false;
$scope.item.icon = 'fa-rss';
}else if(rs.status == '100'){
$scope.item.icon = cur_icon; 
toast.show({title:'Error',message:'You cannot follow yourself'}) 
}
},function(error){
$scope.item.is_loading = false;  
});
}//saveCommAns


}]//controller
}
}]);//departmentfollowBtn





zapp.directive('shareItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `<span><a class=" {{iclass}}" ng-click="launchShare(item)"> 
<i class="fas fa-share-alt"></i><span class="txt-xsm txt-gray" 
ng-if="showcount">&nbsp;&nbsp;{{counter}}</span></a></span>`,
scope: {item:'=',iclass:'=',counter:'=',showcount:'='},
controllerAs:'ctrl',
controller: function ($scope,$rootScope,fbService, modal,
  run, $timeout) {
//var self = this;
$scope.closeThisDialog = function(){modal.hide();}
$scope.isLogged = false;
$rootScope.$watch('userData.isLogged',function(value){
$scope.isLogged = value; 
});

var baseUrl = window.location.origin;
var getPageUrl = (item)=>{
if(item.share_page  == 'topic'){
var url =  baseUrl+'/topic/'+item.url;
}else if(item.share_page  == 'article'){
item.share_page  == 'article'
var url = baseUrl+'/article/'+item.url;
}
console.log(url)
return url;
}

$scope.launchShare = function(item,ev){
item.description = (item.description) ? item.description : 
'.....';
item.description = run.strip_tags(item.description);
item.description = run.limit_words(item.description);
let artUrl = getPageUrl(item);
$scope.modalItem = $scope.modalData = {
id:item.id,
title:item.title, 
share_type:item.share_page,
description:item.description,
contentUrl: artUrl
};

$scope.shareList = run.shareVars(artUrl, item);
/*$mdDialog.show({
controller: function () {return self;},
controllerAs: 'ctrl',
targetEvent:ev,
templateUrl:'templates/dialog/shareArticle.html'
})
*/
modal.show({
page:'templates/dialogs/share_item.html',
data:$scope.modalItem
},$scope);

}//launchShare


$scope.saveShare = function(load){
  console.log('LOAD :: ',load)
load.action = 'saveShare', 
load.mode = load.mode,
load.id = load.id,
load.description = load.description,
load.title = load.title;
load.appLink = 'modules/general/generalApp.php';
load.scope_type = 'ctrl';
load.scope_frame = $scope;
load.callback_after = 'callback_after';
load.callback_before = 'callback_before';
load.scope = 'modalItem';
senData(load,$scope,run);
}

$scope.callback_after = function(result,data){
var rmess = (result.message) ? result.message :
(result.mess) ? result.mess : null;
$scope.shareList[data.index]['message'] = rmess;
$scope.shareList[data.index]['loading'] = false;
}

$scope.callback_before = function(data){
$scope.shareList[data.index]['message'] = 'Working...';
$scope.shareList[data.index]['loading'] = true;
}


$scope.fbShare = function(data){
  console.log(data)
let load = {};
load.method = 'feed',
load.product_name = 'Sensei '+data.share_type+' share',
load.share_url = data.url,
load.share_image = baseUrl+'/images/logo.png',
load.caption = data.title,
load.description = data.description
load.action = 'saveShare', 
load.mode = data.mode, 
load.id = data.id,
load.index = data.index,
load.title = data.title;
load.appLink = 'modules/general/generalApp.php';
fbService.shareCallback(load).then(function(res){
console.log(res)
if(res.is_resolved && 
Array.isArray(res.response) && 
(res.response.length == 0)){
$scope.saveShare(load);
}else{
$scope.shareList[data.index]['message'] = 'Content not shared on facebook';
$scope.shareList[data.index]['loading'] = false;  
}

})

}

var launchPage = function(url){
window.location.assign(url)
}


window.twttr = fbService.twitterLoader();
//Once twttr is ready, bind a callback function to the tweet event
$scope.tweetItem = function(data){
//console.log(data)
launchPage(data.tweet_url);
let load = {};
load.action = 'saveShare', 
load.mode = data.mode, 
load.id = data.id,
load.index = data.index,
load.title = data.title;
twttr.ready(function(twttr) {
twttr.events.bind('tweet', function(res){
if (res) {
console.log("Tweet Callback :: ", res, 'Load :: ', load);
$scope.saveShare(load);
}  

});

});

}//



$scope.linkedinShare = function(data){
data.action = 'saveShare';
$http.post('modules/general/generalApp.php',data).then(function(res){
$scope.saveShare(data.action);  
})

}


$scope.shareToFeed = function(data){
let load = {};
load.action = 'saveShare', 
load.mode = data.mode, 
load.id = data.id,
load.index = data.index,
load.title = data.title;
load.content_type = data.share_type;
  console.log(load)
$scope.saveShare(load);
}//shareToFeed



}//controller


}

}]);//shareItem





zapp.directive('showPayment', function () {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/payment-details.html`,
scope:{modaldata:'=',icon:'@',sticky:'='},
controller:function($scope,$http,modal,toast,$rootScope){
$scope.isLoaded = false;
console.log($scope.modaldata)
$scope.$watch('modaldata',(value)=>{
$scope.vinItem = value
});//watch
$scope.doTranx = function(data){
data.page = 'modules/admin/adminApp.php';
console.log(data);
$scope.modaldata.isLoading = true;
$http.post(data.page,data).then(function(res){
console.log(res);
var rs = res.data;
rs.message = `<div class="`+rs.class+`">`+rs.mess+`</div>`;
$scope.modaldata.isLoading = false;
modal.close();
toast.show({title:'Notification',message:rs.message})
})
}

}//controller
};
});




zapp.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "^?ngModel",
    link: function(scope, element, attrs, ngModel) {
      if (ngModel !== null) {
      function read() {
        ngModel.$setViewValue(element.html());
      }
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };
      element.bind("blur keyup change", function() {
        scope.$apply(read);
});
}
}
};

});


zapp.directive('contenteditableFirst', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model
      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };
      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
     read(); // initialize
      // Write data to the model
      function read() {
       var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {html = '';}
        ngModel.$setViewValue(html);
           }
    }
  };
}])



zapp.directive('startBuyBtn', function () {
    return {
      restrict: 'EMA',
      template: `<button ng-if="isLoaded" 
      ng-disabled="modalItem.isLoading" class="{{btnClass}}"
      ng-click="doPayNow()"><i class="fas {{bticon}}"></i>&nbsp;
      <span ng-bind-html="btnText"></span></button>`,
      scope: {
        item : '=', 
        btn_class : '@',
        icon : '@',
        label : '@' 
      },
controllerAs:'vm',
controller: function ($scope, $rootScope, $http, $window, $mdDialog, 
 modal, doPay, $timeout, $mdDialog) {
var self = this;
$scope.btnClass = 
( angular.isDefined($scope.btn_class) && $scope.btn_class !=='') 
? $scope.btn_class : `md-warn md-raised px20 mx0 my0 py5 md-button`;
$scope.modalItem = 
{isLoading:false, isPaying:false};
$rootScope.$watch('isFetched',function(value){
if(value === true){
$scope.isLoaded = true;
$scope.canBuy = ($scope.item.has_bought) ? false:true;
$scope.btnText = ($scope.label === '' || !$scope.label) ?  ' BUY ':$scope.label;
$scope.canJoin = true;
$scope.bticon = ($scope.icon === '' && $scope.icon !='') ?  $scope.icon: ' fa-shopping-cart ';

;
}  
});//watch


$scope.doPayNow = function(){
$scope.modalItem.isLoading = true;
$scope.bticon = ' fa-spin fa-circle-notch ';  
var actNow = ($scope.canBuy) ? showModal() : nullModal()
};


$scope.closeThisDialog = ()=>{modal.close();}
var nullModal = function(){
$scope.modalItem.isLoading = true;
alert('Already Bought!');
$scope.bticon = 'fa-exclamation-triangle status-cancelled';  
}
var showModal = function () {
$scope.item.transactionName = $scope.modalItem.transactionName = 'Article Purchase ['+$scope.item.title+']';
$scope.modalItem.article_id = $scope.item.aid;
let paramx = {
action:'getPayDetails',
article_data:{
  article_id:$scope.item.aid,
  price:$scope.item.price,
  transactionName: $scope.item.transactionName,
  title:$scope.item.title
}
};

$http.post('modules/payment/paymentApp.php',paramx).then(function(res){
  console.log(res)
$scope.modalItem.isLoading = false;
$scope.modalItem.isPaying = false;
$scope.modalItem.page_title = 'Article Purchase';
$scope.bticon = ' fa-shopping-cart ';
var old = $scope.modalItem, newer = res.data;
var iLoad = {...old,...newer};
console.log('iload ::: ',iLoad)
$scope.modalItem = iLoad;
modal.show({
data:iLoad,
page:'templates/dialogs/start_payment.html',
},$scope);//$mdDialog.show
});//$http
}//showModal
$scope.is_sent = false;
$scope.did_well = false;





}//controller

}//return

});


zapp.directive('fundBtn', function () {
    return {
      restrict: 'EMA',
      template: `
      <button ng-if="isLoaded" 
      ng-disabled="modalItem.isLoading" class="{{btnClass}}"
      ng-click="payNow()"><i class="fas {{bticon}}"></i>&nbsp;
      <span ng-bind-html="btnText"></span></button>`,
      scope: {
        item : '=', 
        btn_class : '@',
        icon : '@',
        label : '@' 
      },
controllerAs:'vm',
controller: function ($scope, $rootScope, $http, $window, $mdDialog, 
 modal, doPay, $timeout, $mdDialog) {
var self = this;
$scope.btnClass = 
( angular.isDefined($scope.btn_class) && $scope.btn_class !=='') 
? $scope.btn_class : `md-warn md-raised px20 mx0 my0 py5 md-button`;
$scope.modalItem = 
{isLoading:false, isPaying:false};
$rootScope.$watch('isFetched',function(value){
if(value === true){
$scope.isLoaded = true;
$scope.btnText = ($scope.label === '' || !$scope.label) ?  ' FUND WALLET ':$scope.label;
$scope.canJoin = true;
$scope.bticon = ($scope.icon === '' && $scope.icon !='') ?  $scope.icon: ' fa-folder-open ';

;
}  
});//watch


$scope.payNow = function(){
$scope.modalItem.isLoading = true;
$scope.modalItem.is_parsed = false;
$scope.bticon = ' fa-spin fa-circle-notch ';  
modal.show({
data:{},
page:'templates/dialogs/start_fund_page.html',
},$scope);//$mdDialog.show
};


$scope.closeThisDialog = ()=>{modal.close();}

$scope.parsePay = function () {
$scope.modalItem.transactionName = 'Fund Wallet';
let paramx = {
action:'getFundDetails',data:$scope.modalItem};
$http.post('modules/payment/paymentApp.php',paramx).then(function(res){
  console.log(res.data);
let rs = res.data;
$scope.modalItem.isLoading = false;
$scope.modalItem.isParsing = false;
$scope.modalItem.page_title = 'Wallet Funding';
$scope.bticon = ' fa-shopping-cart ';
let old = $scope.modalItem;
console.log('old ::: ',old)
let newer = res.data;
console.log('newer ::: ',newer)
let iLoad = {...old, ...newer};
console.log('joined ::: ',iLoad)
$scope.modalItem = iLoad;

console.log('$scope.modalItem ::: ',iLoad)
})//showModal

}//parseModal

$scope.payload = {};
$scope.start_pay = function(){
$scope.hasPaid = true;
$scope.modalItem.pay_mode = 'bank';
$scope.modalItem.pay_vendor = 'bank';
$scope.modalItem.callback = '...';
$scope.modalItem.date = new Date();
$scope.ld = $scope.modalItem;
}

$scope.isLoading = false;
$scope.submitPay = function(data){
data.action = 'submitPayment';
data.date = (new Date(data.date).getTime())/1000;
var iload = {...$scope.modalItem, ...data} ;
console.log(iload);
$scope.isLoading = true;
$http.post('modules/payment/paymentApp.php',iload).then(function(res){
$scope.isLoading = false;
var rs = res.data;
console.log(rs);
if(rs.uid > 0){
 $scope.imessage = `<div class="px10 py10" layout="row" layout-align="start center"> 
 <span class="txt-lg px20"><i class="fas fa-check-circle status-active"></i></span> 
 <span class="txt-md" flex>Your Payment notification has been received.
  You will be notified when it is approved
</span>
  </div>`;
  $scope.hideForm = true;
}else{
 $scope.imessage = `<div class="px10 py10" layout="row" layout-align="start center">
 <span class="txt-lg px20"><i class="fas fa-exclamation-triangle status-cancelled"></i> </span>
<span class="txt-md" flex>
Your Payment notification failed to be submitted at this time.
  Try again later</span></div>`;
    $scope.hideForm = false;
}  

});
}




}//controller

}//return

});//


zapp.factory('minix', ['$http', function ($http) {
return { hey:null }
}]);

zapp.directive('walletPayment', ["minix", function(minix){

return {
restrict: 'EMA',
template: `<a href class="btn {{payClass}}"
ng-click="startPay()"
ng-disabled="wallet_data.isLoading || wallet_data.isPaying">
<i class="fas fa-credit-folder-open" ng-hide="wallet_data.isLoading || modalItem.isPaying"></i> 
<i class="fas  faa-flash animated fa-circle" 
ng-if="wallet_data.isLoading   || wallet_data.isPaying"></i> &nbsp;{{text || 'Pay Now'}} </a>`,
replace: true,
scope: {
payload:'=',
btnclass: '@',
callback: '@',
text: '@'
},
controller: ['$scope', '$rootScope', 'doPay', '$timeout',
function ($scope, $rootScope, doPay, $timeout) {
  console.log('This is wallet BTN')
console.log('wallet Parent $scope ::', $scope.$parent.$parent);
console.log('Payload ::',$scope.payload)
var par_scope = $scope.$parent.$parent;
$scope.payClass = ($scope.btnclass) ?  $scope.btnclass : 'btn btn-primary';

var errorIcon = '<i class="fas fa-exclamation-triangle status-cancelled"></i>&nbsp; ';
var goodIcon = '<i class="fas fa-check-circle status-active"></i>&nbsp; ';
$scope.wallet_data ={};
$scope.startPay = function(){
$scope.wallet_data.isLoading = true;
par_scope.modalItem.isPaying  = true;
$scope.walletPayCallback(par_scope.modalItem,par_scope)
}

$scope.walletPayCallback = function(data,$scope){
console.log(data)
doPay.setScope('modalItem',
    {message:'Processing Payment...',
    isLoading:true,isPaying:true,hide_summary:false},$scope);
doPay.verifyWalletPay(data).then(function(res) {
  console.log(res)
doPay.setScope('modalItem',{message:res.message, response_code:res.response_code, isLoading:false},$scope);
if(res.status === '1'){
doPay.dispatchArticle(data['reference']).then(function(res2){
console.log('dispatchArticle ::',res2)
var tx = {status:res2.status,reference:res2.reference};
doPay.markTranx(res2).then(function(rw){ console.log('markTranx::', rw); });
doPay.setScope('modalItem',{message:res2.message},$scope);
if(res2.status == '1'){
$timeout(function() {
doPay.setScope('modalItem',{message:'Finalizing transaction...',isLoading:false},$scope);
doPay.settleUser(res2.reference).then(function(res3){
console.log('settleUser ::',res3)
doPay.setScope('modalItem',{message:res3.message,isLoading:false},$scope);
$timeout(function() {
//$scope.isCollating   =  true, $scope.isCollated  =   false;
//var winx = carData.dir+'/my-articles';
//$window.location.replace(winx);  
}, 4000);
}, function(){
doPay.setScope('modalItem',{message:'Error settling author.',isLoading:false},$scope);
});//settleUser

}, 2000);//finalizing delay


}else{
doPay.setScope('modalItem',{message:'Error settling author.',isLoading:false},$scope);
 
}

}, function(){
doPay.setScope('modalItem',{message:'Error dispatching Article to your library.',isLoading:false},$scope);
 
});//creditWallet


}//status ==1 so dispatchOrder
else{
doPay.setScope('modalItem',
  {message:res.message,isLoading:false},
  $scope);
}

}, function(error){
console.log(error);
doPay.setScope('modalItem',{message:'Payment Verifiation Error.<br> Please Requery this Payment Transaction',isLoading:false},$scope);
});//verifyPaystack

}//walletPayCallback



$scope.onCloseCallback = function(reference){
dopay.nullifyPay(reference).then(function(reks){
  console.log(reks)
});//nulifyPay
}//onCloseCallBack

}]//controller

}//return

}]);

zapp.directive('payBank',  [
            '$http', '$timeout',  'doPay',
function ($http, $timeout, doPay) {
return {
restrict: `EMA`,
template: `<a href class="text-center {{payClass}}"
ng-click="startBank()"
ng-disabled="pbnk_data.isLoading || pbnk_data.isPaying">
<i class="fas fa-bank" ng-hide="pbnk_data.isLoading || modalItem.isPaying"></i> 
<i class="fas  faa-flash animated fa-circle" 
ng-if="pbnk_data.isLoading   || pbnk_data.isPaying"></i> &nbsp;BANK<span class="sm-hide">&nbsp;DEPOSIT</span> </a>`,
replace: true,
scope: {
payload:'=',
btn_class: '@',
callback: '@',
text: '@'
},
controller: function ($scope, $rootScope, modal, doPay,cartApp) {
console.log($scope)
$scope.pbnk_data = {};
var par_scope = $scope.$parent.$parent;
$scope.payClass = 
( angular.isDefined($scope.btn_class) && $scope.btn_class !=='') 
? $scope.btn_class : `md-primary md-raised px20 mx0 my0 py10 md-button`;

var errorIcon = '<i class="fas fa-exclamation-triangle status-cancelled"></i>&nbsp; ';
var goodIcon = '<i class="fas fa-check-circle status-active"></i>&nbsp; ';
$scope.startPay = function(){
initPay();//allPay
}

$scope.startBank = function(){
$scope.payload.pay_mode = 'bank';
$scope.payload.pay_vendor = 'bank';
$scope.payload.callback = '...';
$scope.payload.date = new Date();
$scope.ld = $scope.payload;
modal.show({
data:$scope.payload,
page:'templates/dialogs/start_payment_bank.html',
},$scope)
}



$scope.isLoading = false;
$scope.submitPay = function(data){
data.action = 'submitPayment';
data.date = (new Date(data.date).getTime())/1000;
var iload = {...$scope.payload,...data} ;
console.log(iload);
$scope.isLoading = true;
$http.post('modules/payApp.php',iload).then(function(res){
$scope.isLoading = false;
var rs = res.data;
console.log(rs);
if(rs.uid > 0){
 $scope.imessage = `<div class="good px10 py10"> <i class="fas fa-check-circle status-active"></i> &nbsp;Your Payment notification has been received.
  You will be notified when it is approved</div>`;
  $scope.hideForm = true;
  cartApp.saveToDb();
}else{
 $scope.imessage = `<div class="error px10 py10"><i class="fas fa-exclamation-triangle status-cancelled"></i> &nbsp;Your Payment notification failed to be submitted at this time.
  Try again later</div>`;
    $scope.hideForm = false;
}  

});
}

  var togNeg = function(newArr,mode){
   for( var x = 0; x < newArr.length; x++){ 
   $scope[x] = mode; 
  }   
  }
$scope.showOpt = function(num){
  let skp = 'opted'+num;
  $scope.opted1 =   $scope.opted2 =   
  $scope.opted3 = false;
  var arr = [1,2,3];
  var newArr = '';
  for( var i = 0; i < arr.length; i++){ 
    if ( arr[i] === num) { 
      newArr = arr.splice(i, num); 
    }
  }

  console.log(newArr)
  if($scope[skp] == true){
    $scope[skp] = false;

  }else if($scope[skp] == false){
    $scope[skp] = true;
  };
  togNeg(newArr,false);
}


}//controller

}//return

}]);

/**/



zapp.directive('walletSection',function(){
return {
 restrict:'EMA',
 templateUrl:`templates/directives/wallet-section.html`,
 replace:true,
 scope:{data:'=',mode:'@'},//scope
 controller: function(run, $scope, $http, $rootScope){
$rootScope.usD = {};
$scope.isLoaded = false;
$rootScope.$watch('isLoaded', function(value){
$scope.isLoaded = value;
if(value == true){
$scope.usD = $scope.data;
$scope.isLoading = false;


}//ifLoaded
})//$watch


 }//controller
}//return
});//wallet-section




zapp.directive('referralSection',function(){
return {
 restrict:'EMA',
 templateUrl:`templates/directives/referral-section.html`,
 replace:true,
 scope:{mode:'@'},//scope
 controller: function(modal,
$mdConstant,
ngClipboard,run, 
   $scope, $http, 
   $rootScope){

  console.log($scope.mode)
$rootScope.usD = {};
$scope.isLoaded = false;
$scope.isFetching=false;
var  appLink=  appLink2='modules/general/generalApp.php';

$rootScope.ref_loaded = false;


var apl = 'modules/general/generalApp.php';


dt['action_name'] = '';
dt['params'] = {action:'get_referral'};
dt['feed_scope'] = 'referral';
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


 }//controller
}//return
});//referral-section





zapp.directive('withdrawBtn', function () {
return {
restrict: 'EMA',
replace: true,
template:`<span>
<span ng-if="usD.withdrawable < 100" class="px10 py5 txt-gray 
border-radius bordered txt-xxsm"> 
<i class="fas fa-exclamation-triangle"></i>&nbsp; INSUFFICIENT</span>
<button   ng-if="usD.withdrawable >= 100"
ng-click="launchWithdraw($event)" 
class="btn btn-sm btn-primary"> 
<i class="fas fa-credit-card"></i> &nbsp;
WITHDRAW <span class="sm-hide">FUNDS</span> 
</button>
</span>`,
      scope: {
        data : '=', 
        btnclass : '@',
        text : '@' 
      },
controllerAs:'vm',
controller: function ($scope, $rootScope, $http,  
modal, toast) {
$rootScope.usD = {};
$scope.isLoaded = false;
$rootScope.$watch('isLoaded', function(value){
$scope.isLoaded = value;
if(value == true){
$scope.usD = $scope.data;
$scope.isLoading = false;

$scope.launchWithdraw = function(){
var options = {data:{}};
options.data.ctrl = 'newDrawCtrl';
options.data.pageTitle = 'Payout Request'; 
options.page = 'templates/dialogs/dialPage.html';
$scope.modalData = options.data;
modal.show(options,$scope);
}
}//ifLoaded
})//$watch



}//controller
}//return

});


zapp.directive('convertRefBtn', function () {
return {
restrict: 'EMA',
replace: true,
template:`<span> 
<span ng-if="ref.approved_not_redeemed <= 0" 
class=""> </span> 

<a href ng-if="ref.approved_not_redeemed >= 1" 
ng-click="convert2Cash()" 
class="btn-xxsm btn py5 px10
 btn-outline-primary shadow-none uppercase txt-xxsm bold">
Convert<span class="sm-hide"> To Funds</span> <i class="fas fa-arrow-right"></i>
</a> <span>`,
      scope: {
        data : '=', 
        btnclass : '@',
        text : '@' 
      },
controllerAs:'vm',
controller: function ($scope, $rootScope, $http,  
modal, toast) {
$rootScope.ref = {};
$scope.isLoaded = false;
$rootScope.$watch('ref_loaded', function(value){
$scope.isLoaded = value;
if(value == true){
$scope.ref = $scope.data;
console.log($scope.data)
$scope.isLoading = false;
$scope.convert2Cash = function(){
var iln = 'modules/account/accountApp.php';
$http.post(iln,{action:'getRefData'}).then(function(res){
console.log(res)
var rs = res.data;
var options = {data:rs};
options.data.ctrl = 'convertRefPointCtrl';
options.data.pageTitle = 'Convert Referral Points'; 
options.page = 'templates/dialogs/dialPage.html';
$scope.modalData = options.data;
modal.show(options,$scope);
});//post
}
}//ifLoaded
})//$watch



}//controller
}//return

});//convertRefBtn


zapp.directive('pressEnter', function () {

    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {

            if(event.which === 13 && !event.shiftKey) {

                scope.$apply(function (){

                    scope.$eval(attrs.pressEnter);

                });



                event.preventDefault();

            }

        });

    };

});


zapp.directive('sendStuff', ['run', function(run) {
    return {
        restrict: 'A',
        scope: {myAttribute: '='},
        template: '',
link: function (scope, element, attrs, ngModel) {
element.bind("click", function(event) {
var curClass = attrs.class;
var strx = attrs.class.split(' '); 
strx[2] = "btn-danger";
var newClass = attrs.class = strx.join(' ');
console.log(attrs.class);
//attrs.$set(iclass, '007');
//
//console.log(scope.$eval(attrs.actid))
element.css("border", "1px solid red");
var action_string = attrs.actid;
var acw = action_string.split('-'); 
var action_word = acw[1];
sendAct(acw[1],acw[0])
if(action_word ==='unfollow'){
var nvl = attrs.actid = acw[0]+'-follow';
var htmx = 'Unfollow';
}else if(action_word ==='follow'){
var nvl = attrs.actid = acw[0]+'-unfollow';
var htmx = 'Follow';
}
attrs.$set("actid", nvl);
attrs.$set("disabled", true);
element.html(htmx);
element.$addClass(newClass);
//element.$updateClass(newClass, curClass)
//element[0].attributes.class.nodeValue = newClass;
//element[0].attributes.actid.nodeValue = nvl;
return;
});
var sendAct = (action,data)=>{
console.log(action,data)
}

console.log()

attrs.$observe('sendState', function(value){
        if(value){
          console.log(value);

        }
      });


var obj = scope.$eval(attrs.sendState);
      //can also fallback as a string
      var string = scope.$eval(attrs.actid);
obj.uid = 1007;
      console.log(obj);
      console.log(string);

//  
}
}
}]);

zapp.directive('fileMd', ['$parse', function ($parse) {

  return {

      restrict: 'A'

    , link: function (scope, element, attrs) {

    var model = $parse(attrs.fileMd);

    var modelSetter = model.assign;

    var onChangeFunc = scope.$eval(attrs.customOnChange);

    console.log(scope.isUploading);

    element.bind('change', function () {

      var files = [];

        angular.forEach(element[0].files,function(file){

               files.push(file);

               //console.log(file)

      })

      scope.$apply(function () {

          modelSetter(scope, files);

         onChangeFunc;

         scope.isUploading = false;

         

      

       });

      });

    }

  };

  }]);
zapp.directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);

