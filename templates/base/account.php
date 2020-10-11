<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
//exit();
require_once('../../modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();
if(isset($_SESSION['senseiMentor']) OR isset($_SESSION['senseiUser'])  ){ //header('location: ./feed'); 
}elseif (!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor'])) {
header('location: ../'); 
} 
$doAngular = 'accountAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="account.controller" ';
$ptitle = ' Account Dashboard ';
$bodyClass = '';
$show_navigation = true;
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrapper';
include 'header.php';

 
 ?>
<div class="pane-container" ng-cloak>

<div class="side-pane">

  <ul class="naviga">
  <div class="px10 py10 mb10 border-bottom" layout="row" layout-align="start center">
<div class="profiler relative">
  <span class="profile-avatar" style="background: url({{userData.avatar}});">
    <a href ng-click="launchPic()" class="fas fa-camera abs-center txt-md"></a>
  </span>
</div>

<div flex class="pl5 bold">
 <div> {{userData.firstname+ ' ' +userData.surname}}</div>
  <span class="txt-em"><a href="profile/{{userData.username}}">@{{userData.username}}</a></span>
</div>

</div>
    <li class="logo-side">
    <a href=""><img src="images/icon.png"></a>
    </li><li>
      <a href="account/feed">
       <i class="fas fa-stream"></i>&nbsp; Activity Feed
       <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/articles">
      <i class="fa fa-file-pdf"></i>&nbsp; Articles
      <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/questions">
        <i class="fas fa-question-circle"></i>&nbsp; Questions
        <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/answers">
        <i class="fas fa-comment"></i>&nbsp; Answers
        <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/messages">
        <i class="fas fa-envelope"></i>&nbsp; Messages<md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/notifications">
        <i class="fas fa-bell"></i>&nbsp; Notifications<sup class="badge-counter" ng-if="userData.notifNum > 0">{{userData.notifNum}}</sup>
        <md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/wallet">
        <i class="fas fa-folder-open"></i>&nbsp; Wallet<md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/referral">
        <i class="fas fa-people-arrows"></i>&nbsp; Referral<md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/withdrawals">
        <i class="fas fa-money"></i>&nbsp; Withdrawals<md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/transactions">
        <i class="fas fa-list"></i>&nbsp; Transactions<md-tooltip></md-tooltip></a>
    </li><li>
      <a href="account/account-settings">
        <i class="fas fa-cogs"></i>&nbsp; Account
        <md-tooltip></md-tooltip></a>
    </li>
  </ul>
</div><!--side-pane-->

<div class="main-pane">

<div class="ui-pane" ui-view="menuContent"></div>


<div class="info-pane">
<div class="abs-center">ADVERT SPACE</div>
</div><!--info-pane-->

</div><!--main-pane-->

</div><!--pane-container-->


<?php 
include 'footer-dashboard.php';
?>