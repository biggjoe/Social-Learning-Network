<md-dialog class="responsive"> 

  <md-toolbar class="responsiver" ng-hide="ngDialogmodalmodalData.hideTitle">
      <div class="md-toolbar-tools" style="color: #fff !important;">
      	<span class="fas fa-edit"></span> 
        	<span>&nbsp; Edit FAQ</span>
        <span flex></span>
        <md-button aria-label="Close This" class="md-icon-button" ng-click="closeThisDialog()"> <span class="fas fa-times fa-1-and-half"></span>
        </md-button>
      </div>
    </md-toolbar>

 <md-dialog-content>
<div ng-cloak  class=" md-dialog-content px20 py10"> 
<div ng-bind-html="notify"></div>
<input type="hidden" ng-model="modalData.id">
<div ng-hide="hideForm">


<div class="form-group"><label>Question</label>
<input type="text" ng-model="modalData.question" class="form-control input-sm" placeholder="Question" required="">
</div>


<input type="hidden" ng-init="modalData.action = 'editFAQ'" ng-model="modalData.action">
<div class="form-group" id="container">
<ng-wig  ng-model="modalData.answer"></ng-wig>
</div>



<div class="ngdialog-buttons">
<button type="button" class="btn btn-md btn-primary" ng-click="editField(modalData)"> UPDATE FAQ</button>
        </div>

</div>

</div>

</md-dialog-content>
</md-dialog>
