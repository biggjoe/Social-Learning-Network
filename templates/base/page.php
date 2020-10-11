<?php
if (!isset($_SESSION)) {session_start();} 
$doAngular = 'ipageAngular';
$angularApp = ' ng-app="page.controller" ';
$ptitle = ' Page ';
$show_navigation = true;
$bodyClass = ' '; 
include 'header.php';
?>


<div class="home-body-class" ng-cloak>


<div class="page-header">
<div class="body-container">
<h1 class="mb20 mt0 pt0 pb0">{{pageTitle}}</h1>
<div class="txt-sm"></div>
</div><!--wrap-->
</div>



 <div class="body-container">




<div class="article-main-pane">

<div class="content-pane">
  


<div class="py10" ng-controller="pagesCtrl">


    <?php
if($_GET['url'] == 'faq'){ ?>
<div ng-controller="faqCtrl" class="px10 pt20 pb30">

<ul class="faq bg-white curv">
<li  id="{{'s'+$index}}" ng-repeat="item in faq" ng-init="tclass = 's'+item.id" ng-click="dropFaq($event)">
<a class="qdiv" layout="row">
<span ng-bind-html="item.question"></span> 
<span flex> </span> 
<span><i class="fa fa-chevron-circle-down"></i> </span> 
</a>
<div class="adiv ng-leave ng-enter">
<div class="pad" ng-bind-html="item.answer"> </div>
</div>
</li>

</ul>

</div><!--faqCtrl-->

<?php } ?>
     
<?php if($_GET['url'] == 'terms'){ ?>
<div ng-init="getThisPage(2)">
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 

     
<?php if($_GET['url'] == 'how-it-works'){ ?>
<div ng-init="getThisPage(4)">
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 
     
<?php if($_GET['url'] == 'contact-us'){ ?>
<div ng-init="getThisPage(3)">
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 

     
<?php if($_GET['url'] == 'about-us'){ ?>
<div ng-init="getThisPage(1)">
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 

</div><!--ng-controller-->

</div><!--content-pane-->


<div class="right-pane   {{navm}}">  
<a class="nav-menu" ng-click="showMenu()"><i class="fas {{isNavOpen ? 'fa-close':'fa-navicon'}}"> &nbsp; </i></a>

<div class="md-nav">
    <ul class="page-topics" ng-cloak>
        <li  ng-repeat="item  in dashCats">
        <a href="{{item.url}}"> 
          <i class="fas {{item.icon}}"></i> <span>{{item.title}}
            </span> </a></li>
      </ul> 

</div>
  
</div><!--right-pane-->

</div><!--main-pane-->


</div><!--wrap-->



</div>

<?php 
include 'footer.php';
?>