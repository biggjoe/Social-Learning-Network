var zapp = angular.module('feed.directives', []);



zapp.directive('feedItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="faders" ng-show="true">
<!--<div>location:; {{location}}</div>-->
<div ng-if="!item.is_comment">
<post-header></post-header>
<post-body></post-body>
<question-reaction-pane item="item" ng-if="item.is_question" type="topic"></question-reaction-pane>
<answer-reaction-pane item="item"  ng-if="item.is_answer" type="topic"></answer-reaction-pane>
<article-reaction-pane item="item" 
ng-if="item.is_blog || 
item.is_journal ||  
item.is_academic || 
item.is_shared_blog || 
item.is_shared_journal ||  
item.is_shared_academic">
</article-reaction-pane>
</div><!--if_!comment-->
<div ng-if="item.is_comment">
<comment-item></comment-item>
</div>
</div>`,
scope:{item:'=', location:'@'},
controller:['$scope','$rootScope', '$filter', '$timeout', 'run', 
function($scope, $rootScope, $filter, $timeout, run){
//console.log($scope)
$scope.strip_tags = function(text) {return run.strip_tags(text);}; 
$scope.limitWords = function(text,num) {return run.limit_words(text,num)};         

$scope.isLoaded = false;
$scope.$watch('item', function(value){
if(value){
//console.log(value);
  $scope.isLoaded = true;
$scope.item.location = (angular.isDefined($scope.location)) ? $scope.location:false;
$scope.item.new_comment =  $scope.item.new_answer = '';
$scope.item.isLoading = $scope.item.is_fetching_more = false;
$scope.qAns = $scope.cCom = false;
let wordFull  = String($scope.item.comment).replace(/<[^>]+>/gm, '');
let wordArr  = wordFull.split(' ');
let wordNum  = wordArr.length;
$scope.item.show_expand_text = (wordNum > 50) ? true:false;
$scope.item.count_text = wordNum;
$scope.item.init_comment =  (wordNum > 50) ? 
$filter('trimWords')($scope.item.comment,50,$scope.item) : $scope.item.comment;  
$scope.togShow = function() {
$scope.item.init_comment = $scope.item.comment;
$scope.item.expand_text = false;
$scope.item.show_expand_text = false;
}//
}

});//watch

var react_arrays = [
{name:'answer',func:'listAnswer'},
{name:'comment',func:'listComment'},
{name:'upvote',func:'votePost'},
{name:'downvote',func:'votePost'},
{name:'rate_article',func:'rateArticle'},
{name:'save_article',func:'saveArticle'},
{name:'purchase_article',func:'purchaseArticle'},
{name:'like_article',func:'likeArticle'}
];




$scope.togView = (scope)=>{
console.log(scope , $scope.item);
var shouldList = 
(scope ==='answer' && ($scope.item.answer_list.length < 1 && $scope.item.ans_num>0)) ? listAnswer($scope.item) :
(scope ==='comment' && ($scope.item.comment_list.length < 1 && $scope.item.com_num>0)) ? listComment($scope.item) : null;
var iscope = (scope === 'comment') ? 'cCom' : 
(scope === 'answer') ?  'qAns' : null;
$scope[iscope] = !$scope[iscope];
}//togView
/**/


var app_url = 'modules/feed/feedApp.php';
var list_name = $scope.list_name;
$rootScope.$watch(list_name,(value)=>{
});//watch

$scope.sItem = (type) => {
  console.log(type)
$scope.item.action = 'save_'+type;
let ivotes = ["upvote","downvote"];
//let irates = ["upvote","downvote"];
if(ivotes.includes(type)){
saveVote(type);
}
if(type=='comment'){
saveComment(type);
}
if(type=='save_article'){
$scope.item.total_saves = $scope.item.total_saves+1;
}
if(type=='like_article'){
$scope.item.total_likes = $scope.item.total_likes+1;
}
/*
console.log($scope.item);
$http.post(app_url,$scope.item).then((res)=>{
console.log(res);
if(type === 'comment'){
$scope.item.com_num = $scope.item.com_num+1;
$scope.item.comment_list.push(res.data.data);
}
});
*/
}//saveCommAns

var saveVote = (mode)=>{
console.log('voting');
let item = {id:$scope.item.id};
let doned = mode+'d';
if(mode === 'upvote'){
var alta = 'downvote';
var altad = 'downvoted';
}else if(mode === 'downvote'){
var alta = 'upvote';
var altad = 'upvoted';  
}
console.log(doned, $scope.item[doned]);
if($scope.item[doned]){//user has voted on this category
return;
}else{
item.action = 'save_'+mode;
$scope.item.is_loading = true;
console.log(item);
$http.post(app_url,item).then((res)=>{
console.log(res);
let rs = res.data;
if(rs.state == '1'){
$scope.item[mode] = $scope.item[mode]+1;
$scope.item[doned] = true;
if($scope.item[altad]){ 
  $scope.item[altad] = false; 
  $scope.item[alta] = $scope.item[alta]-1; 
}
$scope.item.is_loading = false;
}
});
}//user hasnt voted
},
listAnswer = (item)=>{
$scope.item = item;
console.log('answerListingStarted');
$scope.item.action = 'list_more_question_answers';
$scope.item.is_fetching_more = true;
console.log($scope.item);
$http.post(app_url,item).then((res)=>{
console.log(res);
$scope.item.answer_list = res.data.answers;
$scope.item.is_fetching_more = false;
});
},
listComment = (item)=>{
console.log('commentListingStarted');
$scope.item = item;
$scope.item.action = 'list_more_answer_comments';
$scope.item.is_fetching_more = true;
console.log($scope.item);
$http.post(app_url,item).then((res)=>{
console.log(res);
$scope.item.comment_list = res.data.answers;
$scope.item.is_fetching_more = false;
})
},
saveComment = (mode)=>{
console.log('mode');
$scope.item.action = 'save_comment';
console.log($scope.item);
$scope.item.is_loading = true;
$http.post(app_url,$scope.item).then((res)=>{
console.log(res);
var rs = res.data;
$scope.item.is_loading = false;
$timeout(function() {
if(rs.status == '1'){
$scope.item.new_comment = '';
$scope.item.comment_list.unshift(rs.data);
$scope.item.com_num = $scope.item.com_num+1;
if($scope.cCom){$scope.cCom = false;}
}
}, 100);
});
}


}]//controller
}
}]);//askPanel


zapp.directive('postHeader', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<div class="py10 bg-grayed border-bottom txt-sm px20" 
ng-if="
item.is_shared_blog || 
item.is_shared_academic ||
item.is_shared_journal
"> <i class="fas fa-share-alt"></i>&nbsp; <a class="bolder" href="{{item.sharer_url}}">{{item.sharer_name}}</a>
 shared {{item.mode === 'blog' ? ' a blog ':' an article '}} </div>
<div class="py10 bg-grayed border-bottom txt-sm px20" 
ng-if="item.is_shared_topic"> 
<i class="fas fa-share-alt"></i>&nbsp; <a class="bolder" href="{{item.sharer_url}}">{{item.sharer_name}}</a>
 shared a topic </div>
<md-list-item  class="md-1-line align-start">

<span class="md-avatar no-topper" style="background: url({{item.avatar}});"></span>
<div class="md-list-item-text pt5 pb10 my0">
<div style="margin: 0; line-height: 1.2;" class="">
<span ng-if="item.is_blog || item.is_shared_blog"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> created a blog article
</span>
<span ng-if="item.is_academic || item.is_shared_academic"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> created an article
</span>
<span ng-if="item.is_question"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> asked a question</span>
<span ng-if="item.is_answer"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> answered {{item.location !== 'topic' ? 'a question':''}}</span>
</div><!--title-->
<span class="txt-sm" flex> 
<i class="fa fa-clock"></i>&nbsp;{{item.create_date*1000 |  getTime}}</span>

</div>
<span class="md-secondary px10">
<span ng-include="'templates/options/post-options.html'"></span> 
</span>
<md-divider></md-divider>
 </md-list-item>
 </div>`,
controller:['$scope','$rootScope', function($scope,$rootScope){

}]//controller
};

}]);




zapp.directive('postBody', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="py0 px0">
<div ng-if="item.is_answer || item.is_question" class="pt5 px20 txt-sm" 
flex><i class="fas fa-bank"></i>&nbsp;<a href="{{item.department_dir}}">{{item.department_name}}</a></div>
<div class="pt5 px20" 
ng-if="(item.is_answer ||  item.is_question) && location !== 'topic-feed'">
 <a ng-href="topic/{{item.url}}"> 
<h3 style="margin: 0 0 10px 0; line-height: 1.2;" 
class="bolder main-font">{{item.title | trusted}}</h3></a>
</div><!--post-title-->

<div class="pt10 px20" ng-if="
item.is_blog || 
item.is_journal || 
item.is_academic || 
item.is_shared_journal ||  
item.is_shared_blog ||  
item.is_shared_academic">
 <a ng-href="article/{{item.url}}"> 
<h3 style="margin: 0 0 10px 0; line-height: 1.2;" 
class="bolder main-font">{{item.title | trusted}}</h3></a>
</div><!--article-title-->

<div class="py10 px20" ng-if="item.is_answer">
<div ng-bind-html="item.init_comment"></div>
<a ng-if="item.show_expand_text" ng-click="togShow()"> Show All&nbsp;<i class="fas fa-chevron-down"></i> </a>
</div><!--post-comment-->

<div class="py10 px20" 
ng-if="item.is_blog 
|| item.is_journal ||  
item.is_academic || 
item.is_shared_journal || 
item.is_shared_blog ||  
item.is_shared_academic
"  
ng-bind-html="(item.content  | trimWords:'50':'...') | trusted">
</div><!--article-comment-->




</div><!--post-body-->`

};

}]);//askPanel

zapp.directive('questionReactionPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<div class="inner_comment" ng-repeat="itm in item.answer_list">
<feed-item item="itm"></feed-item>
</div>



<div class="pb20 px20 article-meta txt-gray" layout="row" 
layout-align="start center">
<div flex>
<span class="txt-sm"> <i class="fas fa-edit"></i>&nbsp;
{{item.ans_num}}<span class="sm-hide"> answer{{item.ans_num > 1 ? 's':''}}</span></span>
</span> &nbsp;|&nbsp; 
<span ng-if="location !== 'topic-feed'" class="txt-sm bolder"><a href="topic/{{item.url}}">Answer</a> </span>
</div>
<span>
<div class="px10">
  <span>
  <a2a-btn qid="item.question_id" 
iclass="btn-rounded btn btn-sm btn-outline-primary"></a2a-btn>
</span> &nbsp;
  <span><button ng-click="sItem('follow_topic')" 
  class="btn {{item.follows > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-rss"></i><md-tooltip>Topic Follows</md-tooltip> </button> {{item.follows}}</span>
  &nbsp; <share-item item="item" counter="item.total_shares" showcount="true"></share-item>
 
</div>
</span>

</div>
<question-comment-pane></question-comment-pane>
<div>
<!--meta-->`
};

}]);//questionReactionPane

zapp.directive('answerReactionPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<answer-comment-pane></answer-comment-pane>

<div class="pb20 px20 article-meta" layout="row" 
layout-align="start center">

<div flex>
<span class="txt-sm"> <i class="fas fa-comments"></i>&nbsp;
{{item.com_num}}<span class="sm-hide"> comment{{item.com_num > 1 ? 's':''}}</span></span>
</span> &nbsp;|&nbsp;
<span class="txt-sm bolder"> <a ng-click="togView('comment')">Comment</a> </span>
</div>


<div class="px10">
  <span><button ng-click="sItem('upvote')" ng-disabled="item.upvoted"
  class="btn {{item.upvote > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i><md-tooltip>Likes</md-tooltip> </button>  {{item.upvote}}</span> &nbsp;
  <span><button ng-click="sItem('downvote')" ng-disabled="item.downvoted" 
  class="btn status-cancelled {{item.downvote > 0 ? 'btn-danger':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-thumbs-down"></i><md-tooltip>Downvotes</md-tooltip> </button> {{item.downvote}}</span> 
</div>

</div>


<div class="inner_comment"  ng-if="location == 'topic-feed'" 
ng-repeat="itc in item.comment_list track by $index">
<feed-item item="itc" location="topic-feed"></feed-item>
</div>




</div>
`
};

}]);//commentReactionPane

zapp.directive('commentReactionPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `

<div class="pb0 px0 article-meta" layout="row" layout-align="start center">

<span class="txt-sm  txt-gray" flex> <i class="fa fa-clock"></i>&nbsp;{{item.create_date*1000 |  getTime}}</span>

<div class="px10">
  <span><button ng-click="sItem('upvote')" ng-disabled="item.downvoted"
  class="btn {{item.upvote > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i><md-tooltip>Likes</md-tooltip> </button>  {{item.upvote}}</span> &nbsp;
  <span><button ng-click="sItem('downvote')" ng-disabled="item.upvoted" 
  class="btn status-cancelled {{item.downvote > 0 ? 'btn-danger':'btn-clear'}} btn-square-sm radius-50">
  <md-tooltip>Downvotes</md-tooltip><i class="fas fa-arrow-down"></i> </button> {{item.downvote}}</span>
 </div>
</div><!--meta-div-->
`
};

}]);//commentReactionPane



zapp.directive('articleReactionPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<div class="pb20 px20 article-meta txt-gray" layout="row" 
layout-align="start center">
<span flex>
<a ng-click="togView('article_comment')" class="btn {{item.total_comments > 0 ? 'btn-primary':'btn-clear'}}
   btn-sm btn-rounded bolder"><md-tooltip>Comments</md-tooltip> <i class="fas fa-edit"></i>&nbsp;Comment &nbsp;<em>{{item.total_comments | number}}</em></a> 
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
  <span ng-if="item.mode !== 'blog'"><button ng-click="sItem('purchase_article')" ng-disabled="item.purchased" 
  class="btn {{item.total_purchases > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-shopping-cart"></i> <md-tooltip>Sales</md-tooltip></button> {{item.total_sales}}</span>

</div>
</span>

</div><!--meta-->

</div>`
};

}]);//articleReactionPane


zapp.directive('questionCommentPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div>
<div class="py10 px10" ng-if="item.is_fetching_more">
<span><md-progress-linear></md-progress-linear></span>
<span class="" flex>Fetching more items....</span>
</div>

<div class="px20 py20 down_slider" ng-show="qAns">
<ng-wig ng-model="item.new_answer" class="mb5"></ng-wig>
<div class="pt5">
<button class="btn btn-sm btn-primary"
ng-disabled="item.new_answer =='' || item.isLoding"
ng-click="sItem('answer')"> <i class="fas fa-edit"></i> Save</button>
</div>
</div><!--qAns-->

</div>`
};

}]);//answerCommentPane




zapp.directive('answerCommentPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="px20 py20 bg-grayed down_slider relative" ng-show="cCom">
<div class="relative">
<div contenteditable="{{true || !item.is_loading}}" ng-model="item.new_comment" class="quick-comment"></div>

<button class="btn btn-quick-com btn-primary"
ng-disabled="item.new_comment =='' || item.isLoding"
ng-click="sItem('comment')"> 
<i class="fas {{item.is_loading ? 'fa-spin fa-cog':'fa-comment'}}"></i> 
{{item.is_loading ? 'Saving...':'Save'}}</button>
</div>
</div><!--cCom-->
`
};

}]);//answerCommentPane




zapp.directive('commentItem', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="px0">

<div ng-click="drop_text === true ? null : drop_text = true" 
class="{{drop_text ? '' : 'cursored'}} px10 pt10 pb5" layout="row" 
layout-align="start {{drop_text ? 'start':'center'}}">
<span class="profiler">
<span class="profile-avatar" 
style="background: url({{item.avatar}});"></span>
</span>

<div flex class="pl10">
<a class="bolder relative" href="{{item.author_url}}">
{{item.author_name}}</a>
</span>
<span ng-if="!drop_text" class="txt-sm  txt-gray" flex> commented at <i class="fa fa-clock"></i>&nbsp;{{item.create_date*1000 |  getTime}}</span>

<div ng-show="drop_text">
<div class="pt5 mb0">
<div class="inline-block" ng-bind-html="item.init_comment"></div>
<a ng-if="item.show_expand_text" ng-click="togShow()"> Show All&nbsp;<i class="fas fa-chevron-down"></i> </a>
</div>
<comment-reaction-pane></comment-reaction-pane>


<div class="pb10 px20" ng-if="item.location !== 'topic-feed'">
<div class="inner_comment px10 py10">
<a class="block" href="topic/{{item.parent_url}}#ms{{item.parent_answer_id}}">
<div layout="row" layout-align="start start">
<span class="profile-avatar" 
style="background: url({{item.parent_avatar || 'images/avatar.jpg'}});"></span>
</span>
<div class="pl10" flex>
<span class="boldest" ng-bind-html="item.parent_author_name"></span>
<span class="txt-sm  txt-gray" flex> answered at <i class="fa fa-clock"></i>&nbsp;{{item.parent_create_date*1000 |  getTime}}</span>

<div class="pt5 mb0">
<span class="txt-nm bolder pb10" ng-bind-html="item.title"></span>
<div>{{(limitWords(strip_tags(item.parent_comment | trusted),30))}}</div>
</div>
</div><!--col-->
</div>
</a>
</div>

</div><!--if_not_topic_page-->



</div>
</div><!--col-->

<span class="px20" ng-hide="drop_text"><a ng-click="drop_text = true"><i class="fas fa-chevron-down"></i></a></span>

</div><!--row-->


 </div>`,
controller:['$scope','$rootScope', function($scope,$rootScope){

}]//controller
};

}]);




zapp.directive('postPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `

`,
scope:{listname:'@',type:'@', item:'='},
controller:['$scope','$rootScope', function($scope,$rootScope){




$scope.sVote = (type) => {
console.log('Upvoted :: ',$scope.item.upvoted,
	'Downvoted :: ',$scope.item.upvoted)
$scope.item.action = 'send_'+type;
$scope.item[type] = $scope.item[type]+1;
let alt_btn = (type ==='upvote') ? 'downvoted' : 
(type ==='downvote') ? 'upvoted':null;
$scope.item[alt_btn] = true;
console.log($scope.item[alt_btn])
$http.post(app_url,$scope.item).then((res)=>{
console.log(res)
});
}//ansQ



}]
};

}]);






zapp.directive('a2aBtn', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<span>
<a href ng-click="lpn()" class="{{btnClass}}"> 
<i class="fas fa-question-circle"></i><span class="sm-hide">&nbsp; A2A</span>&nbsp;{{count}}<md-tooltip>Ask to Answer</md-tooltip></a>
</div><!--a2a-->`,
scope:{qid:'=', iclass:'@',count:'@'},
controller:['$scope','toast', 'modal', function($scope,toast, modal){
  var app_url = 'modules/feed/feedApp.php';
  var app_url2 = 'modules/general/generalApp.php';
$scope.btnClass = ($scope.iclass) ? $scope.iclass : ' btn btn-primary ';
$scope.start_add_article = false;

$scope.lpn = function(){
  console.log($scope.qid)
if($scope.mentor_list.length == 0){$scope.fetch_mentors();}
var opts = {
  data: {qid:$scope.qid},
  page:'templates/dialogs/a2a.html',
}
modal.show(opts,$scope)
}

$scope.mentor_list = [];
$scope.is_fetching = $scope.is_fetched = false;
$scope.fetch_mentors = function(){
$scope.is_fetching = true;
$scope.is_fetched = false;
var fda = {question_id:$scope.qid}
$http.post(app_url2,{action:'list_user_mentors',fetch_data:fda}).then(function(res){
console.log(res)
$scope.is_fetching = false;
if(res.data.mentors.length > 0){$scope.is_fetched = true;}
$scope.mentor_list = res.data.mentors;
});
}//fetch_departments



$scope.sax = function(data){
  data.action = 'saveA2a';
  data.question_id = $scope.qid;
//console.log(data);
$scope.isLoading = true;
$http.post(app_url,data).then(function(res){
console.log(res);
var rs = res.data;
rs.message = `<div class="`+rs.class+`">`+rs.mess+`</div>`;
$scope.isLoading = false;
if(rs.status == '1'){
let ind = rs.index;
$scope.mentor_list[ind].has_asked = true;
}
if(rs.status == '0'){
toast.show({title:'Info',message:rs.message})
}
})
}//saveQuestion

$scope.goBack = function() {
  window.history.back();
}
}]//controller
};

}]);//a2a
