var zapp = angular.module('feed.directives', []);



zapp.directive('feedItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div><!--
is_answer:; {{item.is_answer}}<br>
is_question:; {{item.is_question}}<br>
is_comment:; {{item.is_comment}}<br>
{{item | json}}-->
<post-header></post-header>
<post-body></post-body>
<question-reaction-pane item="item" ng-if="item.is_question" type="topic"></question-reaction-pane>
<answer-reaction-pane item="item"  ng-if="item.is_answer" type="topic"></answer-reaction-pane>
<comment-reaction-pane item="item"  ng-if="item.is_comment" type="topic"></comment-reaction-pane>
<article-reaction-pane item="item" 
ng-if="item.is_blog" || item.is_academic" || item.is_journal">
</article-reaction-pane>
</div>`,
scope:{item:'=', location:'@'},
controller:['$scope','$rootScope', '$filter', 
function($scope, $rootScope, $filter){
$scope.item.location = (angular.isDefined($scope.location)) ? $scope.location:false;
//console.log($scope.item)
$scope.isLoaded = false;
$scope.item.new_comment =  $scope.item.new_answer = '';
$scope.item.isLoading = $scope.item.is_fetching_more = false;
$scope.item.upvoted = $scope.item.downvoted = false;
$scope.qAns = $scope.cCom = false;

$scope.item.init_comment =  $filter('trimWords')($scope.item.comment,50,$scope.item);  
$scope.togShow = function() {
$scope.item.init_comment = $scope.item.comment;
$scope.item.expand_text = false;
}//

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
$scope.item.action = 'save_'+type;
let ivotes = ["upvote","downvote"];
if(ivotes.includes(type)){
$scope.item[type] = $scope.item[type]+1;
}
$http.post(app_url,$scope.item).then((res)=>{
console.log(res);
if(type === 'comment'){
$scope.item.com_num = $scope.item.com_num+1;
$scope.item.comment_list.push(res.data.data);
}
});
}//saveCommAns

var listAnswer = (item)=>{
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
votePost = (mode)=>{
console.log('commentListingStarted');
$scope.item = item;
$scope.item.action = 'vote_post';
$scope.item[mode] = $scope.item[mode]+1;
$scope.item.is_fetching_more = true;
console.log($scope.item);
$http.post(app_url,item).then((res)=>{
console.log(res);
$scope.item.is_fetching_more = false;
})
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
<md-list-item  class="md-1-line align-start">
<span class="md-avatar" style="background: url({{item.avatar}});"></span>
<div class="md-list-item-text pt15 pb10 my0">

<div style="margin: 0; line-height: 1.2;" class="">
<span ng-if="item.is_blog"> 
<a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> created a blog article
</span>
<span ng-if="item.is_comment"> 
<a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> commented
</span>
<span ng-if="item.is_question"> 
<a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> asked a question
</span>
<span ng-if="item.is_answer">
<a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> answered {{item.location !== 'topic' ? 'a question':''}}  </span>
</div><!--title-->
<span class="txt-sm" flex> <i class="fa fa-clock"></i>&nbsp;{{item.create_date*1000 |  getTime}}</span>
</div>
<span class="md-secondary px10" ng-include="'templates/options/post-options.html'"> 
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

<div class="pt10 px20" ng-if="(item.is_answer ||  item.is_question) && item.location !== 'topic'">
 <a ng-href="feed/topic/{{item.url}}"> 
<h3 style="margin: 0 0 10px 0; line-height: 1.2;" 
class="bolder main-font">{{item.title | trusted}}</h3></a>
</div><!--post-title-->

<div class="pt10 px20" ng-if="item.is_blog || item.is_journal ||  item.is_academic">
 <a ng-href="article/{{item.url}}"> 
<h3 style="margin: 0 0 10px 0; line-height: 1.2;" 
class="bolder main-font">{{item.title | trusted}}</h3></a>
</div><!--article-title-->

<div class="py10 px20" ng-if="item.is_answer || item.is_comment">
<div ng-bind-html="item.init_comment"></div>
<a ng-if="item.expand_text" ng-click="togShow()"> Show All&nbsp;<i class="fas fa-chevron-down"></i> </a>
</div><!--post-comment-->

<div class="py10 px20" ng-if="item.is_blog"  
ng-bind-html="(item.content  | trimWords:'50':'...') | trusted">
</div><!--article-comment-->


<div ng-if="item.is_comment" class="inner_answer block">
<a class="block " href="feed/topic/{{item.parent_url}}">

<div layout="row" layout-align="start center">
<span class="mr10 profile-avatar-sm" 
style="background: url({{item.parent_avatar}})"></span>
<div>
<span class="">
<span class="bolder">{{item.parent_author_name}}</span> answered
</span>
<div class=" txt-sm"><i class="fas fa-clock"></i>&nbsp;{{item.parent_create_date*1000 |  getTime}}</div>
</div>
</div><!--header-->

<div class="block txt-black" href="feed/topic/{{item.parent_url}}" 
ng-bind-html="(item.parent_comment  | trimWords:'50':'...') | trusted"></div>
</a>
</div><!--inner-answer-->


<div ng-if="item.is_inner_comment" class="inner_answer block">

<div class="" layout="row" layout-align="start center">
<span class="mr10 profile-avatar-sm" 
style="background: url({{item.avatar}})"></span>
<div>
<span><span class="bolder">{{item.author_name}}</span> commented</span>
<div class=" txt-sm"><i class="fa fa-clock"></i>&nbsp;{{item.create_date*1000 |  getTime}}
</div>
</div>
</div><!--header-->

<div class="block txt-black" 
ng-bind-html="(item.comment  | trimWords:'50':'...') | trusted"></div>

</div><!--inner-comment-->

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
<span flex>
<a ng-click="togView('answer')" class="btn {{item.ans_num > 0 ? 'btn-primary':'btn-clear'}}
   btn-sm btn-rounded bolder"> <i class="fas fa-edit"></i>&nbsp;Answer &nbsp;<em>{{item.ans_num | number}}</em></a> 
</span>
<span>
<a class="btn btn-clear btn-sm btn-rounded bolder"> <i class="fas fa-question-circle"></i>&nbsp;A2A </a>
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
<div class="inner_comment" ng-repeat="itc in item.comment_list">
<feed-item item="itc"></feed-item>
</div>

<div class="pb20 px20 article-meta" layout="row" 
layout-align="start center">

<span flex>
  <a ng-click="togView('comment')" class="btn {{item.com_num > 0 ? 'btn-primary':'btn-clear'}} btn-sm btn-rounded bolder"> 
  <i class="fas fa-comments"></i>&nbsp;{{cCom ? 'Hide':'Comment'}} &nbsp;<em>{{item.com_num | number}}</em></a> 
</span>

<div class="px10">
  <span><button ng-click="sItem('upvote')" ng-disabled="item.downvoted"
  class="btn {{item.upvote > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i> </button>  {{item.upvote}}</span> &nbsp;
  <span><button ng-click="sItem('downvote')" ng-disabled="item.upvoted" 
  class="btn status-cancelled {{item.downvote > 0 ? 'btn-danger':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-arrow-down"></i> </button> {{item.downvote}}</span>
</div>

</div>
<answer-comment-pane></answer-comment-pane>

</div>
`
};

}]);//commentReactionPane

zapp.directive('commentReactionPane', ['$http', function ($http) {
return {
restrict: 'EA',
replace: true,
template: `

<div class="pb20 px20 article-meta" layout="row">

<span flex></span>

<div class="px10">
  <span><button ng-click="sItem('upvote')" ng-disabled="item.downvoted"
  class="btn {{item.upvote > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i> </button>  {{item.upvote}}</span> &nbsp;
  <span><button ng-click="sItem('downvote')" ng-disabled="item.upvoted" 
  class="btn status-cancelled {{item.downvote > 0 ? 'btn-danger':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-arrow-down"></i> </button> {{item.downvote}}</span>
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
<a ng-click="togView('article_comment')" class="btn {{item.com_num > 0 ? 'btn-primary':'btn-clear'}}
   btn-sm btn-rounded bolder"> <i class="fas fa-edit"></i>&nbsp;Comment &nbsp;<em>{{item.com_num | number}}</em></a> 
</span>
<span>
<div class="px10">
  <span><button ng-click="sItem('rate_article')" ng-disabled="item.rated"
  class="btn {{item.average_rating > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-star"></i> </button>  {{item.average_rating}}</span> &nbsp;
  <span><button ng-click="sItem('save_article')" ng-disabled="item.saved" 
  class="btn {{item.total_savings > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-save"></i> </button> {{item.total_savings}}</span> &nbsp;
  <span><button ng-click="sItem('like_article')" ng-disabled="item.liked" 
  class="btn {{item.total_likes > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-heart"></i> </button> {{item.total_likes}}</span> &nbsp;
  <span ng-if="item.mode !== 'blog'"><button ng-click="sItem('purchase_article')" ng-disabled="item.purchased" 
  class="btn {{item.total_purchases > 0 ? 'btn-primary':'btn-clear'}} btn-square-sm radius-50">
  <i class="fas fa-shopping-cart"></i> </button> {{item.total_purchases}}</span>
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
<div contenteditable="{{true}}" ng-model="item.new_comment" class="quick-comment"></div>

<button class="btn btn-quick-com btn-primary"
ng-disabled="item.new_comment =='' || item.isLoding"
ng-click="sItem('comment')"> <i class="fas fa-comment"></i> Save</button>
</div>
</div><!--cCom-->
`
};

}]);//answerCommentPane

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



