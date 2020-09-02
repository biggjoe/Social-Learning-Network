<?php
if (!isset($_SESSION)) {session_start();}
$doAngular = 'loginAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="login.controller" ng-controller="regCtrl" ';
$ptitle = ' Sign up page ';
$pgt = "'".$ptitle."'";
$site_name = 'VinRun';
$bodyClass = ' ';
$header_class= ' sticky-pane z-highest '; 
include 'header.php';
?>

<div class="abs-center block-responsive-only px20">

<div class="text-center">
<a href="./"><span class="index-logo" ><img src="images/icon.png"></span></a>
</div>
<div class="mt20 txt-md bolder color-primary text-center">ACCOUNT SIGN UP</div>

<div class=" inline-block  logger-base"  ng-init="stage = 0 " >


<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>


<div class="px30 py30">
<form name="loginForm">
<div class="up_slider" ng-show="reqDone" ng-bind-html="login_message"></div>
<div ng-hide="hideForm">

<div ng-hide="stage != 0"  class="boxme">
<div class="border-bottom pb10 mb20 bolder txt-h5">Personal Details</div>

<div class="relative mb15 block">
                <input type="text" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Firstname" ng-model="ldata.firstname" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-user-circle" ></span>
              </div>

              <div class="relative mb15 block">
                <input type="text" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Surname" ng-model="ldata.surname" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>

              <div class="relative mb15 block">
                <input type="text" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Phone Number" ng-model="ldata.phone" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>

<button
 ng-disabled="!ldata.firstname || !ldata.surname || !ldata.phone" 
  ng-click="stage = 1" 
  class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " 
  type="submit"> Continue &nbsp;<i class="fas fa-chevron-right"></i> 

</button>


</div><!--stage-0-ends-->


<div ng-show="stage == 1" ng-hide="stage != 1"  class="boxme">
<div class="border-bottom pb10 mb20 bolder txt-h5">Login Details</div>

<div class="relative mb15 block">
                <input type="text" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Email Address" ng-model="ldata.email" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-at" ></span>
              </div>

              <div class="relative mb15 block">
                <input type="password" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Password" ng-model="ldata.password" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>


              <div class="relative mb15 block">
                <input type="password" class="input-block input-reset pd-input-lg br3 bg-white shadow-inset-2"  required placeholder="Confirm Password" ng-model="ldata.password2" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>

<button
 ng-disabled="
 !ldata.firstname ||
 !ldata.surname ||
 !ldata.phone ||
 !ldata.email || 
 !ldata.password ||  
 !ldata.password2 ||
 (ldata.password2 != ldata.password)" 
  ng-click="stage = 2" class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " type="submit">  Continue &nbsp;<i class="fas fa-chevron-right"></i>  </button>



</div><!--stage-1-ends-->  


<div ng-show="stage == 2" ng-hide="stage != 2"  class="boxme">

<div ng-hide="hideForm" class=" pb10 mb0 bolder txt-h5" layout="row" layout-align="start center">
<span flex>Review Details</span>
<span><a title="Go Back" ng-click="stage = 0" class="btn-default btn-bordered shadow-none btn btn-block px20"> 
<i class="fas fa-redo"></i>
</a></span>
</div>


<div class="bordered border-radius-8">

<div class="border-bottom">
  <div class="py10 px10">
  <em class="txt-sm">Name</em>
  <div class="bolder">{{ldata.firstname +' '+ldata.surname}} <em class="txt-sm"></em></div>
</div>
</div><!--row-->






<div class="border-bottom">
  <div class="py10 px10">
  <em class="txt-sm">Email</em>
  <div class="bolder">{{ldata.email}}</div>
</div>
</div><!--row-->




<div class="border-bottom">
  <div class="py10 px10">
  <em class="txt-sm">Phone Number</em>
  <div class="bolder">{{ldata.phone}}</div>
</div>
</div><!--row-->

<div class="">
  <div class="py10 px10">
  <em class="txt-sm">Password</em>
  <div class="bolder">********** *********</div>
</div>
</div><!--row-->

</div><!--boderred-->


<div class="form-group"  ng-hide="hideForm">
<div class="pt10">
<label class="agree"><input name="agree" class="" type="checkbox" ng-model="ldata.agree" required>   
Agree to Our Terms of Use (<a href="terms">Read Here</a>)
</label>
</div>
</div>
<input type="hidden" ng-init="ldata.action = 'doReg'" ng-model="ldata.action">


     <button ng-disabled="loginForm.$error.required.length>0 || isLoading" ng-click="doReg(ldata)" class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2" type="submit"><i ng-if="isLoading" class=" txt-black  fas fa-circle-notch fa-spin"></i> {{isLoading ? '&nbsp;Working...':'Create Account'}}

      </button>

</div><!--stage-2-ends-->


<div class="text-center py20">Already registered? <a href="./login">Login here</a> </div>


</div><!--hideForm-->
</form>
</div>



</div><!--logger-base-->
</div><!--abs-center-->


<?php 
include 'footer-dashboard.php';
?>