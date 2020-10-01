<md-dialog class="responsive"> 

  <md-toolbar class="responsiver" ng-hide="ngDialogData.hideTitle">
      <div class="md-toolbar-tools uppercase" style="color: #fff !important;">
      	<span class="fas fa-edit"></span> 
        	<span>&nbsp; {{modalData.type+' User'}}</span>
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
<div class="form-group pad-right-5" flex>
<label>Amount to {{modalData.type}}</label>
<input type="number" ng-model="data.amount" class="form-control input-sm" placeholder="Amount to {{modalData.type}}" required="">
</div>
<input type="hidden" ng-init="data.id = modalData.id" ng-model="data.id" required="">
</div>

<input type="hidden" ng-init="data.comm = {{userData.resellerComm}}" ng-model="data.comm">

<div class="form-group" flex ng-if="modalData.type == 'credit'">
<label style="cursor: pointer;">
<input type="checkbox" ng-init="data.applyComm = false" name="applyComm" ng-model="data.applyComm"> Apply Commission ({{userData.resellerComm}}%) </label>
</div>

<div ng-if="data.applyComm">
Total Due:  {{((data.amount/100)*data.comm)+data.amount | currency:'₦'}}
</div>

<!--ngif-->

<div class="pull-right">

<div class="form-group">
<button ng-hide="hideForm" ng-disabled="yearForm.$error.required.length > 0" ng-init="data.action = modalData.type+'User'" ng-model="data.action" ng-click="editField(data)" class="btn btn-primary btn-sm"> {{modalData.type}} User </button>

</div>

</div>
<div class="clr"></div>

</form>


</div>

</div>

</md-dialog-content>

</md-dialog>

