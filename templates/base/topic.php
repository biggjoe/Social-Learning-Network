<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
require_once('../../modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();
/*
if(!isset($_SESSION['senseiMentor']) && isset($_SESSION['senseiUser'])  ){ header('location: ../account'); 
}elseif (!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor'])) {
header('location: ./'); 
} 
*/
$doAngular = 'feedAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="feed.controller"  auto-scroll';
$ptitle = ' Q&A Feed ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrapper';
include 'header.php';

 
 ?>
<div class="pane-container" ng-cloak>





<div class="side-pane">
  <ul class="naviga">
<div class="pxy10 block sticky bg-white">
<input class="form-control input-sm txt-sm" type="search" ng-model="search.category" placeholder="Search Departments">
</div>

 <li  ng-repeat="item in  cats =  (nav_departments | filter:search.category)">
 <a class="block" href="feed/department/{{item.url}}">
      	<span layout="row" layout-align="start center">
       <span><i class="fas fa-stream"></i> </span> <span class="pl5" flex>{{item.name}}
       </span>
       <span class="txt-xsm" ng-if="item.topics_num">({{item.topics_num}})<md-tooltip>{{item.topics_num}} activities</md-tooltip></span>
   </span></a>
    </li>
  </ul>
</div><!--side-pane-->

<div class="main-pane">

<div class="ui-pane" ui-view="menuContent" keep-scroll-pos></div>


<div class="info-pane">
  
  
</div><!--info-pane-->

</div><!--main-pane-->

</div><!--pane-container-->


<?php 
include 'footer-dashboard.php';
?>