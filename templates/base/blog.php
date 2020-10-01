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
$ptitle = ' Blog';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrappers';
include 'header.php';

 
 ?>
<div class="home-body-class">


<div class="page-header plain-bg-pattern">
<div class="wrap">
<h1 class="mb20 mt0 pt0 pb0">{{article_details.title}}</h1>
<div class="txt-sm"> <i class="fas fa-user"></i>&nbsp; <a href="{{article_details.author_url}}">{{article_details.author_name}}</a> &nbsp;|&nbsp; <i class="fas fa-clock"></i>&nbsp; {{article_details.create_date*1000 | getTime}}
&nbsp;|&nbsp;
<i class="fas fa-comments"></i>&nbsp; <a href ng-click="movx('all_comments')" class="">{{article_details.total_comments}}<span class="sm-hide"> Comments</span>
  </a> 
</div>
</div><!--wrap-->
</div>



 <div class="wrap">




<div class="article-main-pane">

<div class="content-pane" ui-view="menuContent" keep-scroll-pos></div>


<div class="right-pane  relative">
<div class="sticky">
<div class="px20">
<div class="border-bottom pb10">
<h3 class="mb5">About the author</h3>
<div layout="row" layout-align="start start">
<div class="profiler">
	<span class="profile-avatar" style="background: url({{article_details.author_avatar}});"></span>

</div><!--profiler-->

<div class="pl10" flex>
<div class=" boldest"><a href="{{article_details.author_url}}">{{article_details.author_name}}</a></div>
<div ng-bind-html="article_details.author_bio"></div>
</div>

</div><!--row-->
</div>
</div>

<div class="px10">
	<div class="bolder px10 pt10">Also From <a href="{{article_details.author_url}}">{{article_details.author_name}}</a></div>
<ul class="norm_list">
	<li ng-repeat="itx in article_details.more_from_author">
		<a class="bolder" href="article/{{itx.url}}">{{itx.title}}</a>
	</li>
</ul>
</div>


</div><!--sticky-->
  
</div><!--right-pane-->

</div><!--main-pane-->


</div><!--wrap-->




</div>

<?php 
include 'footer.php';
?>