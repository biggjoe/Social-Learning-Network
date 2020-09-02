<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
require_once('modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();
 
$doAngular = 'profileAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="profile.controller" ';
$ptitle = ' Account Profile ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-normal';
include 'header.php';

 
 ?>
<div class="body-container">
<div class="pane-container">


<div class="ui-pane" ui-view="menuContent"></div>


<div class="info-pane">
  
  ---------------------------------
</div><!--info-pane-->


</div><!--pane-container-->
</div><!--body-container-->

<?php 
include 'footer-dashboard.php';
?>