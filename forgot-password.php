<?php
if (!isset($_SESSION)) {session_start();}
$doAngular = 'loginAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="login.controller" ng-controller="forgotCtrl" ';
$ptitle = ' Forgot Password ';
$pgt = "'".$ptitle."'";
$site_name = 'VinRun';
$bodyClass = ' ';
$header_class= ' sticky-pane z-highest '; 
include 'header.php';
?>

<div class="abs-center block-responsive-only px20">
<div class="text-center"><a href="./">
<span class="index-logo" >
  <img src="images/icon.png">
</span></a>
</div>
<div class="mt20 txt-md bolder color-primary text-center">FORGOT PASSWORD</div>

<div class=" inline-block  logger-base">


<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>



<form name="loginForm">
<div class="px30 py30">	


<div class="up_slider" ng-show="reqDone" ng-bind-html="login_message"></div>

<div ng-hide="hideForm">


              <div class="relative mb15 block">
                <input type="text" class="input-bordered input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Email Address" ng-model="data.email" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-user-circle" ></span>
              </div>






              <div class="mt10 block relative">
              <button ng-disabled="loginForm.$error.required.length>0 || isLoading" ng-click="doReset(data)" class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2" type="submit"><i ng-if="isLoading" class=" txt-black  fas fa-circle-notch fa-spin"></i> {{isLoading ? '&nbsp;Working...':'Recover Password'}}

      </button>
         
          </div>



            </div><!--hideForm-->


</div>
</form>




</div><!--logger-base-->
</div><!--abs-center-->


<?php 
include 'footer-dashboard.php';
?>