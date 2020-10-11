<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
require_once('../../modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();

if(!isset($_SESSION['senseiAdmin'])){ 
header('location: ../admin-login'); 
} 
/**/
$doAngular = 'adminAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="admin.controller"  auto-scroll';
$ptitle = ' Admin Dashboard ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrapper';
include 'header.php';

 
 ?>
<div class="pane-container" ng-cloak>





<div class="side-pane plain-bg-pattern">
<ul class="naviga">
<div class="pxy10 block sticky bg-white">
<input class="form-control input-sm txt-sm" type="search" ng-model="search.category" placeholder="Search Menu">
</div>
  <li  ng-repeat="item in cats =  (nav_cats | filter:search.category)">
      <a class="block" href="admin/{{item.url}}">
      	<span layout="row" layout-align="start center">
       <span><i class="fas {{item.icon}}"></i> </span> <span class="pl5" flex>{{item.title}}
       </span>
       <span class="txt-xsm" ng-if="item.url == 'notifications'">({{userData.notifNum}})<md-tooltip>{{userData.notifNum}}</md-tooltip></span>
   </span></a>
    </li>
  </ul>
</div><!--side-pane-->

<div class="main-pane">

<div class="ui-pane" ui-view="menuContent" keep-scroll-pos></div>


<div class="info-pane">
  
<div class="abs-center">ADVERT SPACE</div>
  
</div><!--info-pane-->

</div><!--main-pane-->

</div><!--pane-container-->


<?php 
include 'footer-dashboard.php';
?>