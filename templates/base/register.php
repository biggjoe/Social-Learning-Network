<?php
if (!isset($_SESSION)) {session_start();}
$doAngular = 'loginAngular';
$bodyClass =   "bg-gray-faint";
$angularApp = ' ng-app="login.controller" ng-controller="regCtrl" ';
$ptitle = ' Sign up page ';
$pgt = "'".$ptitle."'";
$site_name = 'Registration Page';
$bodyClass = ' ';
$header_class= ' sticky-pane z-highest ';
if(isset($_GET['ref']) && @$_GET['ref'] != ''){
$ref = $_GET['ref'];
$var = "'".$ref."'";
$refSupplied = "true";
$shouldRef = "true";
$init = ' ng-init=" 
ldata.ref = '.$var.' ;
ldata.is_referred = 1 ;  
ldata.refSupplied = '.$refSupplied.' ;  
ldata.shouldRef = '.$shouldRef.'" ';
//echo $run.$init; 
}else{
$shouldRef = "false";
$refSupplied = "false";
$init = ' ng-init="ldata.refSupplied = '.$refSupplied.'  ;  
ldata.shouldRef = '.$shouldRef.'" ';
} 
include 'header.php';
?>

<div class="abs-center block-responsive-only px20"  <?php echo $init; ?>>

<div class="text-center"><a href="./">
<span class="login-logo" >
  <img src="images/icon.png">
</span></a>
</div>

<div class=" logger-base"  ng-init="stage = 0 ; ldata.is_masked = true " >


<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>



<div class="px30-responsive pb30">
<form name="loginForm" ng-cloak>
<div class="up_slider" ng-show="reqDone" ng-bind-html="login_message"></div>
<div ng-hide="hideForm">

<i class="fas fa-hidden"></i>



<div ng-hide="stage != 0"  class="boxme">
<div class="mb20 text-center ">
<span class="txt-md bolder">How do you plan to use SLN?</span>
<p class="my0 py0 txt-sm txt-gray">What type of account do you want to create?</p>
</div>

<div class="relative mb15 block" layout="column">
<label class="utp mentor" ng-click="ldata.user_type = 'mentor'">
<div class="" layout="row" layout-align="start center">
  <span class="pr20 uicon"> <i class="fas fa-user-tie"></i> </span>
<span flex class="pr10">
Mentor Account
<span class="block"><a class="btn-text txt-sm" ng-click="lpc('mentor')">Who is a mentor?</a></span>
</span>
<span> <i ng-if="ldata.user_type && ldata.user_type == 'mentor'" class="fas fa-check-circle"></i> </span>
</div>

</label>

<label class="utp user bg-purple" ng-click="ldata.user_type = 'user'">
<div class="" layout="row" layout-align="start center">
  <span class="pr20 uicon"> <i class="fas fa-user-circle"></i> </span>
<span flex class="pr10">Regular User
<span class="block"><a class="btn-text txt-sm" ng-click="lpc('user')">Who is a regular user?</a></span>
</span>
<span> <i ng-if="ldata.user_type && ldata.user_type == 'user'" class="fas fa-check-circle"></i> </span>
</div>
</label>
</div>

<button ng-show="ldata.user_type"
 ng-disabled="!ldata.user_type" 
  ng-click="stage = 1" 
  class=" up_slider block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " 
  type="submit"> Continue &nbsp;<i class="fas fa-chevron-right"></i> 

</button>


</div><!--stage-0-ends-->



<div ng-show="stage == 1"  ng-hide="stage != 1"  class="boxme">
<div class="mb20 bolder txt-h5">
<a ng-click="stage = 0"> <i class="fas fa-arrow-left"></i> </a>&nbsp;
Were you referred by Someone?</div>


<div class="relative mb0 block" layout="column">

<div class="bordered border-radius-10 mb20 overflow-hidden"> 
<a class="utp color-primary mb0" ng-click="ldata.is_referred = 1">
<div class="" layout="row" layout-align="start center">
<span flex class="pr10">YES</span>
<span> <i ng-if="ldata.is_referred && ldata.is_referred == 1" class="fas fa-check-circle"></i> </span>
</div>
</a>

<div class="relative mt20 mb0 block up_slider" ng-if="ldata.is_referred && ldata.is_referred == 1" 
ng-hide="ldata.shouldRef">
                <input type="text" class="form-control input-block input-lg border-radius-10"  required placeholder="Referrer Username" ng-model="ldata.ref" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-user-plus" ></span>
              </div>


<div class="px20 py20 bordered border-radius-4 mt20 bolder txt-md" ng-show="ldata.shouldRef"
layout="row" layout-align="start center"
>
<span flex><i class=" fas fa-user-circle" ></i> &nbsp; {{ldata.ref}}</span>

<span><a ng-click="ldata.shouldRef = false " class="fas fa-edit"></a></span>
</div>

</div><!--bordered-->



<a class="utp color-danger" ng-click="ldata.is_referred = '0' ; ldata.ref = null ; ldata.shouldRef = false">
<div class="" layout="row" layout-align="start center">
<span flex class="pr10">NO</span>
<span> <i ng-if="ldata.is_referred && ldata.is_referred == '0'" class="fas fa-check-circle"></i> </span>
</div>
</a>
</div>



<button
 ng-disabled="!ldata.is_referred" 
  ng-click="stage = 2" 
  class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " 
  type="submit"> Continue &nbsp;<i class="fas fa-chevron-right"></i> 

</button>


</div><!--stage-0-ends-->


<div  ng-show="stage == 2" ng-hide="stage != 2"  class="boxme">
<div class="border-bottom pb10 mb20 bolder txt-h5">
<a ng-click="stage = 1"> <i class="fas fa-arrow-left"></i> </a>&nbsp;
Personal Details</div>

<div class="relative mb15 block">
                <input type="text" class="form-control input-block input-lg"  required placeholder="Firstname" ng-model="ldata.firstname" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-user-circle" ></span>
              </div>

              <div class="relative mb15 block">
                <input type="text" class="form-control input-block input-lg"  required placeholder="Surname" ng-model="ldata.surname" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>

              <div class="relative mb15 block">
                <input type="text" class="form-control input-block input-lg"  required placeholder="Phone Number" ng-model="ldata.phone" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>

<button
 ng-disabled="!ldata.firstname || !ldata.surname || !ldata.phone" 
  ng-click="stage = 3" 
  class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " 
  type="submit"> Continue &nbsp;<i class="fas fa-chevron-right"></i> 

</button>


</div><!--stage-0-ends-->


<div ng-show="stage == 3" ng-hide="stage != 3"  class="boxme">
<div class="border-bottom pb10 mb20 bolder txt-h5">
<a ng-click="stage = 2"> <i class="fas fa-arrow-left"></i> </a>&nbsp;
Login Details</div>

<div class="relative mb15 block">
                <input type="text" class="form-control input-block input-lg"  required placeholder="Email Address" ng-model="ldata.email" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-at" ></span>
              </div>

              <div class="relative mb15 block">
                <input type="password" class="form-control input-block input-lg"  required placeholder="Password" ng-model="ldata.password" required>
                <span class="o-20 absolute center-v right-1 pe-none fas fa-lock"></span>
              </div>


              <div class="relative mb15 block">
                <input type="password" class="form-control input-block input-lg"  required placeholder="Confirm Password" ng-model="ldata.password2" required>
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
  ng-click="stage = 4" class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " type="submit">  Continue &nbsp;<i class="fas fa-chevron-right"></i>  </button>



</div><!--stage-1-ends--> 

<div ng-show="stage == 4" ng-hide="stage != 4"  class="boxme"> 
<div class="border-bottom pb10 mb20 bolder txt-h5">
<a ng-click="stage = 3"> <i class="fas fa-arrow-left"></i> </a>&nbsp;
Interested Departments</div>

<form novalidate>
<div class="sticky py5 px5 border-bottom bg-white">
  <div layout="row" layout-align="start center">
  <span class="px10 boldest" flex></span>
<span>
  {{ldata.followed_departments.length}} Selected
</span>
</div>
<div class="py5">
  <input type="search" ng-model="msearch" placeholder="Search departments" 
  class="form-control txt-sm input-sm">
</div>
</div><!--sticky-->

<md-progress-linear  md-mode="indeterminate" ng-show="isFetching"></md-progress-linear>
<div class="mini-height mb20">
<md-list-item  class="md-1-line" ng-repeat="item  in axp = (department_list | filter:msearch) track by $index" ng-init="item.index = $index" ng-hide="item.hide" ng-click="toggleSelection(item)">
  <md-checkbox class="md-primary hidden" 
ng-model="item.selected"
aria-label="Select"
name="{{$index+'_item'}}"
value="{{item}}"
ng-checked="ldata.followed_departments.indexOf(item) > -1"
 aria-label
></md-checkbox>
<span class="md-icon-avatar has-awesome"> <i class="fas fa-bank"></i> </span>
<div  class="md-list-item-text py10"  layout="column"  flex>
<strong> 
{{item.name}} </strong>
</div>
<span  class="md-secondary">
<span class="txt-md" ng-class="item.selected == true ? ' color-primary ' : ' color-default '"
 
> <i class="fas {{item.selected ? 'fa-check-circle':''}}"></i></span>
</span>
<md-divider ng-if="!$last"></md-divider>
</md-list-item>

<md-list-item  class="md-1-line" ng-if="axp.length == 0">
<div  class="md-list-item-text"  layout="column"  flex>
<span><i class="fas fa-exclamation-triangle red"></i>  No results </span>
</div>
<span  class="md-secondary"></span>
</md-list-item>
</div>
</form>


<button
 ng-disabled="!ldata.followed_departments" 
  ng-click="stage = 5" class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2 " type="submit">  Continue &nbsp;<i class="fas fa-chevron-right"></i>  
</button>

</div><!--stage-4-->


<div ng-show="stage == 5" ng-hide="stage != 5"  class="boxme">

<div ng-hide="hideForm" class=" pb10 mb0 bolder txt-h5" layout="row" layout-align="start center">
  <span><a ng-click="stage = 4"> <i class="fas fa-arrow-left"></i> </a>&nbsp;</span>
<span flex>Review Details</span>
<span><a title="Go Back" ng-click="stage = 0 ; login_message = ''" class="btn-default btn-bordered shadow-none btn btn-block px20"> 
<i class="fas fa-redo"></i>
</a></span>
</div>


<div class="bordered border-radius-8">

<div class="border-bottom">
  <div class="py10 px10">
  <em class="txt-sm">Name</em>
  <div class="bolder">{{ldata.firstname +' '+ldata.surname}} <em class="txt-sm">({{ldata.user_type}})</em></div>
</div>
</div><!--row-->






<div class="border-bottom">
  <div class="py10 px10" layout="row">
    <div flex>
  <em class="txt-sm">Email</em>
  <div class="bolder">{{ldata.email}}</div>
</div>
    <div flex class="text-right">
  <em class="txt-sm">Password</em>
  <div class="" layout="row" layout-align="start center">
  <span flex class="bolder">{{ldata.is_masked ?  ' ********* ':ldata.password }}</span> 
  <span class="px20"><a ng-click="ldata.is_masked = !ldata.is_masked"> <i class="fas {{ldata.is_masked ? 'fa-eye':'fa-times'}}"></i><md-tooltip>{{ldata.is_masked ? 'Show Password':'Hide Password'}}</md-tooltip></a></span></div>
</div>
</div>
</div><!--row-->




<div class="border-bottom">
  <div class="py10 px10">
  <em class="txt-sm">Phone Number</em>
  <div class="bolder">{{ldata.phone}}</div>
</div>
</div><!--row-->




<div class="border-bottom">
  <div class="py10 px10" layout="row" layout-align="start center">
  <div flex>
    <em class="txt-sm">Interested Departments</em>
  <div class="bolder">{{ldata.followed_departments.length}}</div>
</div><!--col-->
<span > <a ng-click="lnc()">View</a> </span>
</div>
</div><!--row-->

<div class="">
  <div class="py10 px10">
  <em class="txt-sm">Referred By</em>
  <div class="bolder">{{ldata.ref == null ? 'No one':ldata.ref}}</div>
</div>
</div><!--row-->


</div><!--boderred-->


<div class="form-group"  ng-hide="hideForm">
<div class="pt20">
<label class="agree"><input name="agree" class="" type="checkbox" ng-model="ldata.agree" required>&nbsp;   
Agree to Our Terms of Use (<a href="terms">Read Here</a>)
</label>
</div>
</div>
<input type="hidden" ng-init="ldata.action = 'doReg'" ng-model="ldata.action">

<div class="up_slider" ng-show="reqDone" ng-bind-html="login_message"></div>


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