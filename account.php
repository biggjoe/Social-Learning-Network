<?php
if (!isset($_SESSION)) {session_start();} 
//print_r($_SESSION);
require_once('modules/masterClass.php');
$genClass = new GeneralClass;
$usr = $genClass->getUser();
if(!isset($_SESSION['senseiUser']) && isset($_SESSION['senseiMentor'])  ){ header('location: ../mentor'); 
}elseif (!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor'])) {
header('location: ./'); 
} 
$doAngular = 'accountAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="account.controller" ';
$ptitle = ' User Dashboard ';
$bodyClass = ' ';
$header_class= ' sticky-pane z-highest '; 
$wrapperClass = 'body-wrapper';
include 'header.php';

 
 ?>
<div class="pane-container">

<div class="side-pane">
  <div class="logo-paner sm-hide"><a href=""><img src="images/icon.png" /></a></div> 
  <ul class="naviga">
    <li class="logo-side">
    <a href=""><img src="images/icon.png"></a>
    </li><li>
      <a ng-click="launchVinSearch()"><md-tooltip>VIN Look Up</md-tooltip><i class="fas fa-search-plus"></i></a>
    </li><li>
      <a href="account/dashboard"><i class="fa fa-columns"></i><md-tooltip>Dashboard</md-tooltip></a>
    </li><li>
      <a href="account/queries"><md-tooltip>VIN Queries</md-tooltip><i class="fas fa-search"></i></a>
    </li><li>
      <a href="account/reports"><md-tooltip>VIN Reports</md-tooltip><i class="fas fa-file-pdf"></i></a>
    </li><li>
      <a href="account/payments"><md-tooltip>Payments</md-tooltip><i class="fas fa-credit-card"></i></a>
    </li><li>
      <a href="account/sub-accounts"><md-tooltip>Sub Accounts</md-tooltip><i class="fas fa-users"></i></a>
    </li><li>
      <a href="account/messages"><md-tooltip>Messages</md-tooltip><i class="fas fa-envelope"></i></a>
    </li><li>
      <a href="account/api"><md-tooltip>API</md-tooltip><i class="fas fa-cogs"></i></a>
    </li>
  </ul>
</div><!--side-pane-->

<div class="main-pane view-motion " ui-view="menuContent">

</div><!--main-pane-->


</div>


<?php 
include 'footer-dashboard.php';
?>