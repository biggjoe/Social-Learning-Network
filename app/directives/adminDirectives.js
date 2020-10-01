var zapp = angular.module('admin.directives', []);
zapp.directive('adminItem', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="faders px10 py20 border-bottom" ng-show="true">
<div layout="row" layout-align="start center">
<item-header></item-header>
<item-body></item-body>
</div>
<div class="px0" layout="row" layout-align="start center">

<span class="txt-xsm" flex> </span>
<div>
<answer-action-pane  ng-if="item.is_answer" type="topic"></answer-action-pane>
<question-action-pane ng-if="item.is_question" type="topic"></question-action-pane>
<!--<comment-action-pane  ng-if="item.is_comment" type="topic"></comment-action-pane>
<article-action-pane ng-if="item.is_blog || item.is_journal ||  item.is_academic">
</article-action-pane>
-->
</div>
</div>
`,
scope:{item:'=', location:'@?'},
controller:['$scope','$rootScope', 'modal', 
function($scope, $rootScope, modal){

$scope.item.showFull = false;

$scope.modalData = {};
var options = {};
$scope.launchPane = function(item,extra){
var item = {...item , ...extra };
let arx = extra.act.split('_');
let tait = (arx[0]+' '+arx[1]).toUpperCase();
console.log(item)
options.page = 'templates/directives/admin_dial_page.html';
var data = {ctrl:item.ctrl,pageTitle:tait};
options.data = {...item,...data};
$scope.modalData = options.data;
modal.show(options,$scope)
}

}]//controller
}
}]);//adminItem


zapp.directive('itemHeader', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="" ng-show="true">
<item-avatar img="item.avatar" size="avatar"></item-avatar>
</div>`

}//return

}]);//itemHeader




zapp.directive('itemBody', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<div class="px20" ng-show="true" flex>

<div style="margin: 0; line-height: 1.2;" class="">
<span ng-if="item.is_blog"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> created a blog article
</span>
<span ng-if="item.is_academic"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> created an article
</span>
<span ng-if="item.is_comment"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> commented
</span><!---->
<span ng-if="item.is_question"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> asked a question</span>
<span ng-if="item.is_answer"><a class="bolder" href="{{item.author_url}}">{{item.author_name}}</a> answered {{item.location !== 'topic' ? 'a question':''}}</span>
</div><!--title-->

<div class="pt5 px0" ng-if="item.is_answer ||  item.is_question">
<a ng-click="item.showFull = !item.showFull"> 
<div style="margin: 0 0 10px 0; line-height: 1.1;" 
class="bold main-font">{{item.title | trusted}}</div>
</a>
</div><!--post-title-->

item.showFull::{{item.showFull}}

<div class="show-full" ng-show="item.showFull">

<div ng-if="item.is_answer || item.is_question" class="pt5 px20 txt-sm" 
flex><i class="fas fa-bank"></i>&nbsp;<a href="{{item.department_dir}}">{{item.department_name}}</a></div>


<div class="pt5 px0">
<a ng-href="topic/{{item.url}}"> 
<h3 style="margin: 0 0 10px 0; line-height: 1.2;" 
class="bolder main-font">{{item.title | trusted}}</h3></a>
</div>

<div class="pt10 px20" ng-if="item.is_blog || item.is_journal ||  item.is_academic">
 <a ng-href="article/{{item.url}}"> 
<h3 style="margin: 0 0 10px 0; line-height: 1.2;" 
class="bolder main-font">{{item.title | trusted}}</h3></a>
</div><!--article-title-->

<div class="py10 px20" ng-if="item.is_answer || item.is_comment">
<div ng-bind-html="item.init_comment"></div>
<a ng-if="item.show_expand_text" ng-click="togShow()"> Show All&nbsp;<i class="fas fa-chevron-down"></i> </a>
</div><!--post-comment-->

<div class="py10 px20" ng-if="item.is_blog|| item.is_journal ||  item.is_academic"  
ng-bind-html="(item.content  | trimWords:'50':'...') | trusted">
</div><!--article-comment-->


<div ng-if="item.is_comment" class="inner_answer">
<a class="block " href="topic/{{item.parent_url}}">

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

<div class="block txt-black" href="topic/{{item.parent_url}}" 
ng-bind-html="(item.parent_comment  | trimWords:'50':'...') | trusted"></div>
</a>
</div><!--inner-answer-->



</div><!--show-full-->
<span class="txt-xsm" flex> 
<i class="fa fa-clock"></i>&nbsp;{{item.create_date*1000 |  getTime}}
</span>

</div><!--item-body-->`,

}//return

}]);//itemBody


zapp.directive('answerActionPane', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<ul class="action-links-vertical">
<li><a ng-click="launchPane(item,{ctrl:'answerCtrl',act:'edit_answer'})">
<i class="fas fa-edit"></i><md-tooltip>Edit</md-tooltip></a></li><li>
<a ng-click="launchPane(item,{ctrl:'answerCtrl',act:'block_answer'})"><i class="fas fa-ban"></i><md-tooltip>Block</md-tooltip></a></li><li>
<a ng-click="launchPane(item,{ctrl:'answerCtrl',act:'archive_answer'})"><i class="fas fa fa-fa-archive"></i><md-tooltip>Archive</md-tooltip></a></li><li>
<a ng-click="launchPane(item,{ctrl:'answerCtrl',act:'delete_answer'})"><i class="fas fa-trash"></i><md-tooltip>Delete</md-tooltip></a></li>
</ul>`
}//return

}]);//answerActionPane


zapp.directive('questionActionPane', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
template: `
<ul class="action-links-vertical">
<li><a ng-click="launchPane(item,{ctrl:'questionCtrl',act:'edit_question'})">
<i class="fas fa-edit"></i><md-tooltip>Edit</md-tooltip></a></li><li>
<a ng-click="launchPane(item,{ctrl:'questionCtrl',act:'block_question'})"><i class="fas fa-ban"></i><md-tooltip>Block</md-tooltip></a></li><li>
<a ng-click="launchPane(item,{ctrl:'questionCtrl',act:'archive_question'})"><i class="fas fa fa-fa-archive"></i><md-tooltip>Archive</md-tooltip></a></li><li>
<a ng-click="launchPane(item,{ctrl:'questionCtrl',act:'delete_question'})"><i class="fas fa-trash"></i><md-tooltip>Delete</md-tooltip></a></li>
</ul>`
}//return

}]);//itemHeader

/**

**/



zapp.directive('showContent', ["$http", function ($http) {
return {
restrict: 'EA',
replace: true,
templateUrl: `templates/directives/admin_content.html`,
scope:{modaldata:'='},
controller:function($scope,modal){
let ivx = $scope.modaldata.act.split('_');
let inax = ivx[0];
let inac = ivx[1].toUpperCase();
$scope.modaldata.do_this_act = 
(inax == 'delete') ?  `<u>Delete</u> this ${inac} ?`:
(inax == 'archive') ? ` <u>Archive</u> this ${inac} ?`:
(inax == 'block') ? ` <u>Temporary Block</u> this ${inac} ?`: undefined;
$scope.sendData = function(data){
	console.log(data)
}
$scope.closeThisDialog = function(data){
	modal.close();
}


}//controller

}//return

}]);//itemHeader