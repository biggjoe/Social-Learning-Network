<?php
if (!isset($_SESSION)) {session_start();} 

$ptitle = ' Home Page ';
$show_navigation = true;
$bodyClass = ' home-body-class '; 
$doAngular = 'homeAngular';
$angularApp = ' ng-app="home.controller" ng-controller="homeCtrl" ';
include 'header.php';
?>




<?php include 'footer.php'; ?>