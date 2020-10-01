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
$doAngular = 'articleAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="article.controller"  auto-scroll';
$ptitle = ' Article ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrappers';
include 'header.php';

 
 ?>
<div class="home-body-class">


<div class="page-header plain-bg-pattern">
<div class="body-container" ng-if="details_page" ng-cloak>
<h1 class="mb20 mt0 pt0 pb0">{{article_details.title}}</h1>
<div class="txt-sm"> <i class="fas fa-user"></i>&nbsp; <a href="{{article_details.author_url}}">{{article_details.author_name}}</a> &nbsp;|&nbsp; <i class="fas fa-clock"></i>&nbsp; {{article_details.create_date*1000 | getTime}}
&nbsp;|&nbsp;
<i class="fas fa-comments"></i>&nbsp; <a href ng-click="movx('all_comments')" class="">{{article_details.total_comments}}<span class="sm-hide"> Comments</span>
  </a> 
</div>
</div><!--wrap-->

<div class="body-container" ng-if="!details_page" ng-cloak>
<h1 class="mb20 mt0 pt0 pb0 text-center">Recent Articles</h1>

</div><!--wrap-->
</div>



 <div class="body-container" ui-view="menuContent" keep-scroll-pos>




</div><!--wrap-->




</div>

<?php 
include 'footer.php';
?>