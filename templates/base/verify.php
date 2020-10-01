<?php
if (!isset($_SESSION)) {session_start();}
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
//ob_start();

require_once('../../modules/masterClass.php');
#
$genClass = new GeneralClass();
$dbConn = new DbConn();
$settings = $genClass->getSettings();
$setx = false;

if(isset($_POST['setpass'])){ 
$pass = $_POST['password'];
$pass2 = $_POST['password2'];

$class = '';
$fuser = @$_SESSION['founduser'];
$check = $dbConn->getRows("SELECT * FROM users WHERE email = ?",["$fuser"]);
if($check['code'] == 200 && $check['data']!==false){
$rw = $check['data'];
$check2 = count($check["data"]);
#
$cr = $dbConn->getRow("SELECT * FROM users WHERE email = ?", ["$fuser"]);
//
$rws = $cr['data'];
$email = $rws['email'];
$hisName = $rws['firstname'].' '.$rws['surname'];
}else{
$ready='no'; $imessage = '
<div class="error">User does not exist</div>
';  
$class = 'bg-warning';
}
if (empty($pass) ||empty($pass2)  ){
$ready='no'; $imessage = '
<div class="error">Please provide a new passwords.</div>
';$class = 'bg-warning';
}

elseif ($pass !== $pass2){
$ready='no'; $imessage = '
<div class="error">Your Passwords does not match</div>
';$class = 'bg-warning';
}

elseif(empty($fuser)){
$ready='no'; $imessage = '
<div class="error">INVALID REQUEST</div>';
$class = 'bg-warning';
}
else{$ready = "yes";}
if($ready == "yes"){
$hashed = hash('sha512',strtolower($email).$pass);
$sqe = "UPDATE users SET verification_code = ?, password = ?  WHERE email = ?";
$querys = $dbConn->executeSql($sqe,["","$hashed","$fuser"]);
//echo '<textarea>';var_dump($querys);echo '</textarea>';
if($querys['code'] ==200){
////fire email
$to = $email;
//$hisName = $firstname.' '.$surname;   
$senderemail = "support@".$_SERVER['SERVER_NAME'];
$sendername = $settings['site_short_name'];
$subject = "Password Reset";
$xmessage = "
Thank you <strong>$hisName</strong>.<br>
You have successfully reset your password. <br/> <br/>
All your future logins will now be done with your new password. 
<br>
Have a wonderful experience. 
";

$messBody = $xmessage;

$sEmail =  new EmailClass();
$senda = $sEmail->sendPlain($senderemail,$sendername,$to,$subject,$messBody,$type='blue');


$imessage = '
<div class="bg-success txt-white px10 py10 border-radius-8">Your password has been successfully reset. <br>All your future logins must be done with your new password.
<p>Click <a href="./">Here </a> Proceed to Home</p>
</div>';
$class = ' ';
$_SESSION['vinUser'] = NULL;
unset($_SESSION['vinUser']);
$_SESSION['founduser'] = NULL;
unset($_SESSION['founduser']);

session_unset(); //destroys variables
session_destroy(); //destroys session;
//exit();
$setx = true;
}

}

}


if(isset($_GET['code'],$_GET['si'])){
$code =  $_GET['code'];
$i = $_GET['si'];
$rti = $dbConn->getRow("SELECT * FROM users WHERE verification_code = ? AND id = ?",["$code","$i"]);
if($rti['code']==200 && $rti['data']!==false){
$rcti = 1;
$ri = $rti['data'];
}else{
$rcti = 0;$ri = [];  
}
}else{
 $rcti = 0;   
}


$ptitle = ' Set New Password ';
$site_name = 'VinRun';
$bodyClass = ' ';
$header_class= ' sticky-pane z-highest '; 
include 'header.php';
?>

<div class="abs-center block-responsive-only px20">
<div class="text-center"><a href="./">
<span class="index-logo" >
  <img src="images/icon.png">
</span></a>
</div>
<div class="mt20 txt-md bolder color-primary text-center">SET NEW  PASSWORD</div>

<div class=" inline-block  logger-base">


<md-progress-linear ng-show="isLoading" md-mode="indeterminate"></md-progress-linear>


<div class="px30 py30">	


<div class="up_slider" ng-show="reqDone" ng-bind-html="login_message"></div>

<div ng-hide="hideForm">

        <div class="py10 px10 text-center <?php echo @$class; ?>"><?php echo @$imessage; ?></div>
        <?php if($rcti >0){  
          $_SESSION['founduser'] = $ri['email'];
          ?>
<div class="bolder txt-center  text-center py10">ENTER YOUR NEW PASSWORDS</div>

        <form name="lgForm" method="POST" action="<?php echo $_SERVER['REQUEST_URI'];?>">
        <div ng-hide="rs_state">


        <div class="form-group"><input type="password"  name="password" class="input-bordered input-block input-reset pd-input-lg br3 bg-white shadow-inset-2" placeholder="Your New Password" required="">
        </div>

        <div class="form-group"><input type="password"  name="password2" class="input-bordered input-block input-reset pd-input-lg br3 bg-white shadow-inset-2" placeholder="Confirm Password" required="">
        </div>


        <div class="form-group">
          <button class="block input-block txt-nm button-reset uppercase bg-primary color-white hover-white button-reset py15 px15 br3 shadow-inset-2"  name="setpass"
          type="submit"> Reset Password
      </button>
    </div>


    </div>
</form>

        <?php }elseif($rcti < 1 && !$setx){$goMess = '<div class="error padding">INVALID REQUEST</div>';  echo $goMess; }; ?>



            </div><!--hideForm-->


</div>






</div><!--logger-base-->
</div><!--abs-center-->


<?php 
include 'footer-dashboard.php';
?>