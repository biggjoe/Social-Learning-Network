<?php 
if (!isset($_SESSION)) {session_start();}ob_start();
include_once '../../includes/db_conn.php';
include_once '../../includes/bbcode.php';
$thisUser =  cleansql($mysqli,$_SESSION['vinUser']);
$rt = mysqli_query($mysqli,"SELECT id, surname, firstname, email, phone FROM users WHERE email = '$thisUser'");
$rww  = mysqli_fetch_assoc($rt);
$init = ''; $init = 'doList()';
$val = $_GET['val'];
if($val=='password'){
$label = 'Password';
}elseif ($val=='profile') {
$label = 'Profile';	# code...
}
?>
<div class="ngdialog-message"<?php echo $init; ?>>
<h3 class="dialog-head pad-vert-10">
<span class="fa fa-user-circle-o"></span> Edit <?php echo $label; ?></h3>

<div class="pad-hor-20 pad-vert-10">
<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>
<div ng-bind-html="notify"></div>
<div ng-hide="hideForm">
<form name="yearForm">
<input type="hidden" ng-init="data.id = '<?php echo $rww['id']; ?>'" ng-model="data.id" required="">
<?php if($val == 'password'){ ?>
<div class="form-group pad-right-5" flex>
<label>Current <?php echo $label; ?></label>
<input type="text" ng-init="data.label = ''" ng-model="data.oldpassword" class="form-control input-sm" placeholder="Current <?php echo $label; ?>" required="">
</div>

<div class="form-group" flex>
<label>New <?php echo $label; ?></label>
<input type="password" ng-init="data.label = ''" ng-model="data.password" class="form-control input-sm" placeholder="New <?php echo $label; ?>" required="">

</div>


<div class="form-group" flex>
	<label>Retype New <?php echo $label; ?></label>
<input type="password" ng-init="data.label = ''" ng-model="data.password2" class="form-control input-sm" placeholder="Retype New <?php echo $label; ?>" required="">
</div>

<input type="hidden" ng-init="data.action = 'editPassword'" ng-model="data.action" required="">

<?php } ?>


<?php if($val == 'profile'){ ?>
<div layout="row">

<div class="form-group pad-right-5" flex>
<label>Surname</label>
<input type="text" ng-init="data.surname = '<?php echo $rww['surname']; ?>'" ng-model="data.surname" class="form-control input-sm" placeholder="Surname" required="">
</div>

<div class="form-group pad-left-5" flex>
<label>Firstname</label>
<input type="text" ng-init="data.firstname = '<?php echo $rww['firstname']; ?>'" ng-model="data.firstname" class="form-control input-sm" placeholder="Firstname" required="">

</div>

</div>


<div class="form-group" flex>
<label>Phone</label>
<input type="text" ng-init="data.phone = '<?php echo $rww['phone']; ?>'" ng-model="data.phone" class="form-control input-sm" placeholder="Phone" required="">
</div>



<input type="hidden" ng-init="data.action = 'editUser'" ng-model="data.action" required="">

<?php } ?>


<div class="pull-right">

<div class="form-group">
<button ng-disabled="yearForm.$error.required.length > 0"  ng-click="editField(data)" class="btn btn-success btn-sm"> Update <?php echo $label; ?> </button>
</div>

</div>
<div class="clr"></div>

</form>


</div>

</div>

