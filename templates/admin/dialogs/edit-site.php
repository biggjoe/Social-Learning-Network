
<md-dialog class="responsive"> 

  <md-toolbar class="responsiver" ng-hide="ngDialogData.hideTitle">
      <div class="md-toolbar-tools" style="color: #fff !important;">
      	<span class="fas fa-edit"></span> 
        	<span>&nbsp; {{modalData.name | uppercase}}</span>
        <span flex></span>
        <md-button aria-label="Close This" class="md-icon-button" ng-click="closeThisDialog()"> <span class="fas fa-times fa-1-and-half"></span>
        </md-button>
      </div>
    </md-toolbar>

 <md-dialog-content>

<div ng-cloak  class=" md-dialog-content px20 py10"> 

<section>




<div class="">

<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>


<div ng-bind-html="notify"></div>

<div ng-hide="hideForm">

<form name="yearForm">

<div ng-if="modalData.val !== 'faq' 
&& modalData.val !=='MetaKeywords' 
&& modalData.val !=='MetaDescription'">
<div class="form-group pad-right-5" flex>

<label class="uppercase">{{modalData.name}}</label>

<input type="text" ng-init="data.label = modalData.val" ng-model="data.label" class="form-control input-sm" placeholder="{{modalData.name}}" required="">

</div>


</div>
<div ng-if="modalData.val ==='MetaKeywords' 
|| modalData.val ==='MetaDescription'">

<div class="form-group pad-right-5" flex>

<label> {{modalData.label}} </label>

<textarea rows="4"  ng-model="data.label"
 class="form-control input-sm"  placeholder="{{modalData.label}}"></textarea>

</div>

</div><!--if-->

<div ng-if="modalData.val ==='faq'">

<?php 

//$question  = $rws['question']; 
//$answer = $rws['answer']; 
//$id = $rws['id'];

?>

<div class="form-group" flex>

<label> Question </label>

<input type="text" ng-model="fdata.question" class="form-control input-sm" placeholder="Question" required="">

</div>


<div class="form-group" flex>

<label>Answer</label>

<textarea ui-tinymce="tinymceOptions" rows="4"  ng-model="fdata.answer | trusted" class="form-control input-sm"  placeholder="Answer"></textarea>

</div>

<input type="hidden" ng-model="fdata.id" required="">

</div><!--if-->

<input type="hidden" ng-init="data.field = modalData.field" ng-model="data.field" class="form-control input-sm" placeholder="{{modalData.field}}" required="">

</div>





<div class="pull-right">



<div class="form-group">

<button ng-hide="hideForm" ng-disabled="yearForm.$error.required.length > 0" ng-init="data.action = 'editSite'" ng-model="data.action" ng-click="editField(data)" class="btn btn-primary btn-sm"> Update </button>



</div>



</div>

<div class="clr"></div>



</form>



</div>
</div>
</section>

</div>

</md-dialog-content>

</md-dialog>