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
$wrapperClass = 'body-wrappers';
include 'header.php';

 
 ?>
<div class="home-body-class" ng-cloak>


<div class="page-header profile-page plain-bg-pattern">
<div class="body-container" ng-cloak layout="row" layout-align="start start">

<div class=" text-center"> 
<div class="profiler">
<span class="profile-large" style="background: url({{user_public_details.avatar || 'images/avatar.jpg'}});"></span>
<div class="user-bio-info pt10 bolder"><a href="profile/{{user_public_details.username}}">@{{user_public_details.username}}</a></div>
<div class="pxy10">
<user-follow-btn item="user_public_details"></user-follow-btn>
</div>

</div><!--profiler-->
</div><!--col-->

<div flex class="py10 px20">
<h1 class="mb10 mt0 pt0 pb0">{{user_public_details.firstname+' '+user_public_details.surname}}</h1>
<div ng-bind-html="user_public_details.bio"></div></div><!--co-->

</div><!--wrap-->

</div>


 <div class="body-container" ui-view="menuContent" keep-scroll-pos>



</div><!--wrap-->




</div>

<?php 
include 'footer.php';
?>