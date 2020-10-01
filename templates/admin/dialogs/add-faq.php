<?php 
include '../../../includes/db_conn.php'; ?>

<div class="ngdialog-message">
<h3 class="dialog-head pad-vert-10">
<span class="fa fa-user-circle-o"></span> ADD FAQ </h3>

<div class="pad-hor-20 pad-vert-10">
<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>
<div ng-bind-html="notify"></div>
<div ng-hide="hideForm">
<form name="yearForm">

<div class="form-group" flex>
<label> Question </label>
<input type="text" ng-model="data.question" class="form-control input-sm" placeholder="Question" required="">
</div>


<div class="form-group" flex>
<label>Answer</label>
<textarea ui-tinymce="tinymceOptions" rows="4" ng-model="data.answer" class="form-control input-sm"  placeholder="Answer"></textarea>
</div>




<div class="pull-right">

<div class="form-group">
<button ng-hide="hideForm" ng-disabled="yearForm.$error.required.length > 0" ng-init="data.action = 'addFAQ'" ng-model="data.action" ng-click="editField(data)" class="btn btn-success btn-sm"> ADD FAQ </button>
</div>

</div>
<div class="clr"></div>

</form>


</div>

</div>

