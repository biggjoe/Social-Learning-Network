<?php 

?>

<md-dialog class="responsive"> 

  <md-toolbar class="responsiver" ng-hide="ngDialogData.hideTitle">
      <div class="md-toolbar-tools" style="color: #fff !important;">
      	<span class="fas fa-edit"></span> 
        	<span>&nbsp; {{modalData.email | uppercase}}</span>
        <span flex></span>
        <md-button aria-label="Close This" class="md-icon-button" ng-click="closeThisDialog()"> <span class="fas fa-times fa-1-and-half"></span>
        </md-button>
      </div>
    </md-toolbar>

 <md-dialog-content>

<div ng-cloak  class=" md-dialog-content px20 py10"> 


<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>
<div ng-bind-html="notify"></div>
<div ng-hide="hideForm">
<form name="yearForm">
<input type="hidden" ng-init="data.id = modalData.id" ng-model="data.id" required="">


<div layout="row">

<div class="form-group pr5" flex>
<label>Surname</label>
<input type="text" ng-init="data.surname = modalData.surname" ng-model="data.surname" class="form-control input-sm" placeholder="Surname" required="">
</div>

<div class="form-group pl5" flex>
<label>Firstname</label>
<input type="text" ng-init="data.firstname = modalData.firstname" ng-model="data.firstname" class="form-control input-sm" placeholder="Firstname" required="">

</div>

</div>


<div class="form-group" flex>
<label>Phone</label>
<input type="text" ng-init="data.phone = modalData.phone" ng-model="data.phone" class="form-control input-sm" placeholder="Phone" required="">
</div>



<input type="hidden" ng-init="data.action = 'editUser'" ng-model="data.action" required="">





<div class="pull-right">

<div class="form-group">
<button ng-disabled="yearForm.$error.required.length > 0"  ng-click="editField(data)" class="btn btn-primary btn-sm"> Update Profile </button>
</div>

</div>
<div class="clr"></div>

</form>

</div>

</div>

</md-dialog-content>
</md-dialog>
