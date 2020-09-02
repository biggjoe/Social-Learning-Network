<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
require_once('modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();
if(!isset($_SESSION['senseiMentor']) && isset($_SESSION['senseiUser'])  ){ header('location: ../account'); 
}elseif (!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor'])) {
header('location: ./'); 
} 
$doAngular = 'mentorAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="mentor.controller" ';
$ptitle = ' Mentor Dashboard ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrapper';
include 'header.php';

 
 ?>
<div class="pane-container">

<div class="side-pane">
  <ul class="naviga">
    <li class="logo-side">
    <a href=""><img src="images/icon.png"></a>
    </li><li>
      <a href="mentor/feed">
       <i class="fas fa-stream"></i>&nbsp;Activity Feed
       <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="mentor/articles">
      <i class="fa fa-file-pdf"></i>&nbsp;Articles
      <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="mentor/questions">
        <i class="fas fa-question-circle"></i>&nbsp;Questions
        <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="mentor/answers">
        <i class="fas fa-comment"></i>&nbsp;Answers
        <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="mentor/messages">
        <i class="fas fa-envelope"></i>&nbsp;Messages<md-tooltip></md-tooltip></a>
    </li><li>
      <a href="mentor/account-settings">
        <i class="fas fa-cogs"></i>&nbsp;Account Settings
        <md-tooltip></md-tooltip></a>
    </li>
  </ul>
</div><!--side-pane-->

<div class="main-pane">

<div class="ui-pane" ui-view="menuContent"></div>


<div class="info-pane">
  
  ---------------------------------
</div><!--info-pane-->

</div><!--main-pane-->

</div><!--pane-container-->


<?php 
include 'footer-dashboard.php';
?>