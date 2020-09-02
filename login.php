<?php
if (!isset($_SESSION)) {session_start();}
$doAngular = 'loginAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="login.controller" ng-controller="loginCtrl" ';
$ptitle = ' Login Page ';
$pgt = "'".$ptitle."'";
$site_name = 'VinRun';
$bodyClass = ' ';
$header_class= ' sticky-pane z-highest '; 
include 'header.php';
?>

<div class="abs-center block-responsive-only px20">
<div class="text-center"><a href="./">
<span class="login-logo" >
  <img src="images/icon.png">
</span></a>
</div>
<div class="mt20 txt-md bolder color-primary text-center">USER LOGIN</div>

<div class=" inline-block  logger-base">


<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>



<form name="loginForm">
<div class="px30 py30">	


<div class="up_slider" ng-show="reqDone" ng-bind-html="login_message"></div>

<div ng-hide="hideForm">


              <div class="relative mb15 block">
                <input type="text" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Email Address" ng-model="data.email" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-user-circle" ></span>
              </div>

              <div class="relative mb5 block">
                <input type="password" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Password" ng-model="data.password" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>





              <div class="py5" layout="row" layout-align="start center">
                
                  <div flex>
                    <label class="agree">
                    <input name="remember" class="shadow-inset-2" type="checkbox" ng-model="data.rememberMe">
                    Remember Me</label>
                  </div>
               

                <div class="text-right"> 
                  <a href="./forgot-password">Forgot<span class="sm-hide"> Password</span>?</a> 
                </div>
              </div>

              <div class="mt10 block relative">
              <button ng-disabled="loginForm.$error.required.length>0 || isLoading" ng-click="doLogin(data)" class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2" type="submit"><i ng-if="isLoading" class=" txt-black  fas fa-circle-notch fa-spin"></i> {{isLoading ? '&nbsp;Working...':'Login'}}

      </button>
         
          </div>
<div class="text-center py20">Not yet registered? <a href="./register">Sign Up here</a> </div>


            </div><!--hideForm-->


</div>
</form>




</div><!--logger-base-->
</div><!--abs-center-->


<?php 
include 'footer-dashboard.php';
?>