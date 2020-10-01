<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
require_once('../../modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();
 
$doAngular = 'profileAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="profile.controller" ';
$ptitle = ' User Profile ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-normal';
include 'header.php';

 
 ?>
<div class="pane-container">
<div class="side-pane">

	<div class="cover-area">
	<div class="py10 text-center"> 
<div class="profiler">
	<span class="profile-large" style="background: url({{user_public_details.avatar}});"></span>

<div class="pxy10">
<user-follow-btn item="user_public_details"></user-follow-btn>
</div>
<div class="user-bio-info">@{{user_public_details.username}}</div>
</div><!--profiler-->



</div><!--row-->

<div class="px20 py10" ng-bind-html="user_public_details.bio | trusted"></div>
</div><!--cover-area-->

<ul class="profile-tabs">
	<li ng-repeat="item in public_tabs">
		<a ng-click="setTab(item.url)" href="profile/{{username}}/{{item.url}}" ng-class=" navTab === item.url ? 'active':'' "> <i class="fas {{item.icon}}"></i>&nbsp; {{item.name}}</a>
	</li>
</ul>
</div><!--side-pane-->

<div style="
border-left:1px solid #ddd;
border-right:1px solid #ddd;" 
class="ui-pane" ui-view="menuContent"></div>


<div class="right-pane">

<div class="absx-center">AD SPACE</div>

</div><!--info-pane-->


</div><!--pane-container-->


<?php 
include 'footer-dashboard.php';
?>