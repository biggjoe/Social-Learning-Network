<md-dialog class="responsive"> 

  <md-toolbar class="responsiver" ng-hide="ngDialogmodalData.hideTitle">
      <div class="md-toolbar-tools" style="color: #fff !important;">
      	<span class="fas fa-edit"></span> 
        	<span>&nbsp; Edit {{modalData.name | uppercase}}</span>
        <span flex></span>
        <md-button aria-label="Close This" class="md-icon-button" ng-click="closeThisDialog()"> <span class="fas fa-times fa-1-and-half"></span>
        </md-button>
      </div>
    </md-toolbar>

 <md-dialog-content>

<div ng-cloak  class=" md-dialog-content px20 py10"> 

<form name="nForm">

<div ng-bind-html="notify"></div>
<input type="hidden" ng-model="modalData.id">
<div ng-hide="hideForm">
	<div class="form-group"><label>Page Name</label>
<input type="text"  ng-disabled="true" ng-init="modalData.title = modalData.name | trusted" ng-model="modalData.name" class="form-control input-sm" placeholder="Page Name" required="">
</div>

<div class="form-group"><label>Page Intro</label>
<input type="text" ng-init="modalData.title = modalData.intro | trusted" ng-model="modalData.intro" class="form-control input-sm" placeholder="Page Intro" required="">
</div>


<input type="hidden" ng-init="modalData.action = 'editPage'" ng-model="modalData.action">
<div class="form-group" id="container">
<ng-wig ng-init="modalData.message = modalData.message" ng-model="modalData.message"></ng-wig>
      <p style="display: none;"></p>
</div>



<div class="ngdialog-buttons">
<button type="button" class="btn btn-md btn-primary" ng-click="editField(modalData)">Edit Page</button>
        </div>

</div><!--hideform-->

</form>
</div>
</md-dialog-content>

</md-dialog>