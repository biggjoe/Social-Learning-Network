<?php
if (!isset($_SESSION)) {session_start();} 
$doAngular = 'ipageAngular';
$angularApp = ' ng-app="page.controller" ';
$ptitle = ' Home Page ';
$show_navigation = true;
$bodyClass = ' '; 
include 'header.php';
?>




<div class="page-header bg-page-header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1>{{pageTitle}}</h1>
          </div>
          <div >
          </div>
        </div>
      </div>
</div><!-- Page Header end -->

<div class="container">

<div layout-xs="column" layout-gt-xs="row" layout-align="start stretch">
<div  flex-gt-xs="25" flex-xs="100" class="block paner" >
<div class="page-side-pane {{navm}}">  
<a class="nav-menu" ng-click="showMenu()"><i class="fas {{isNavOpen ? 'fa-close':'fa-navicon'}}"> &nbsp; </i></a>
    

<div class="md-nav">
    <ul class="page-topics" ng-cloak>
        <li  ng-repeat="item  in dashCats">
        <a href="{{item.url}}"> 
          <i class="fas {{item.icon}}"></i> <span>{{item.title}}
            </span> </a></li>
      </ul> 

</div>

</div>
</div><!--col-->





<div  class=" paner2" flex-gt-xs="75" flex-xs="100">
  <?php
if($_GET['url'] == 'faq'){ ?>
<div ng-controller="faqCtrl" class="px10 pt20 pb30">
  <div class="bolder txt-h4 mb10">Frequently Asked Questions</div>



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
<?php } elseif($_GET['url'] == 'sample'){ ?>
<div ng-controller="sampleCtrl" class="px10 pt20 pb30">

      <a id="ex"></a>
<div class="text-center">
	<ul class="sample_switch">
		<li ng-repeat="item in sample_types">
			<a href="./sample#{{item.name}}" name="ex"><i class="fas fa-file-pdf"></i>&nbsp; {{item.name}}</a>
		</li>
	</ul>
</div>


<div class="slider text-center">

<div class="slides">

<div class="sliderx"  ng-repeat="itam in sample_types" id="{{itam.name}}">
 <a ng-click="zoomSample(itam)" class="avatar-container" style="background-image: url({{itam.img}});">
   
   
 </a>
<h3>{{itam.intro}}</h3>
</div><!--sliderx-->






</div><!--slides-->


<div class="anchor-links">
  <a href="#{{itam.name}}" ng-repeat="itxm in sampleCtrl">{{$index+1}}</a>
</div>

</div><!--slider-->
</div><!--sampleCtrl-->
<?php } ?> 

<div ng-controller="pagesCtrl">
     
<?php if($_GET['url'] == 'terms'){ ?>
<div ng-init="getThisPage(2)">
<div class="bolder txt-h4 mb10"ng-bind-html="page.name"></div>
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 

     
<?php if($_GET['url'] == 'how-it-works'){ ?>
<div ng-init="getThisPage(4)">
<div class="bolder txt-h4 mb10"ng-bind-html="page.name"></div>
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 
     
<?php if($_GET['url'] == 'contact-us'){ ?>
<div ng-init="getThisPage(3)">
<div class="bolder txt-h4 mb10"ng-bind-html="page.name"></div>
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 

     
<?php if($_GET['url'] == 'about-us'){ ?>
<div ng-init="getThisPage(1)">
<div class="bolder txt-h4 mb10"ng-bind-html="page.name"></div>
<div class="card-body" ng-bind-html="page.content"></div>
</div>
<?php } ?> 

</div>



</div><!--col-70-->


</div><!--row-->
</div><!--container-->


<?php 
include 'footer.php';
?>