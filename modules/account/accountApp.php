<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');
if (!isset($_SESSION)) {session_start();}
ob_start();

require_once('../masterClass.php');
#
$dbConn = new DbConn();
$genClass = new GeneralClass;;
$accountClass = new AccountClass;
#
$postdata = file_get_contents("php://input");
$request = json_decode($postdata,true);
$action = $request['action'];


if(isset($_REQUEST['data'])){
$formdata = json_decode($_REQUEST['data'],true);
}


if($request['action']  ==   'getUser'){
    $rsp=$genClass->getUser();

    
    header('content-type: application/json');
    echo json_encode($rsp);
    exit();
    }

    
    
    if($request['action']  ==   'userLogin'){
    $rsp=$accountClass->userLogin($request);
    header('content-type: application/json');
    echo json_encode($rsp);
    exit();
    }    
    if($request['action']  ==   'adminLogin'){
    $rsp=$accountClass->adminLogin($request);
    
    header('content-type: application/json');
    echo json_encode($rsp);
    exit();
    }

if($request['action']  ==   'userRegister'){
$rsp=$accountClass->regUser($request);

header('content-type: application/json');
echo json_encode($rsp);
exit();
}

if($request['action']  ==   'save_username'){
$rsp=$accountClass->saveUsername($request);
header('content-type: application/json');
echo json_encode($rsp);
exit();
}

if($request['action']  ==   'getUserData'){
$mode = $request['mode'];
$userData = $accountClass->getUserData($mode);

header('content-type: application/json');
echo json_encode($userData);
exit();
}



if($action == 'updateUser') {
$usr = $genClass->getUser();
$email = $usr['email'];
$phone = $request['phone'];
$surname = $request['surname'];
$firstname = $request['firstname'];

if (!$genClass->isValidPhone($phone)) {
$go = 'no';
$state = '0'; 
$mess = 'Please supply a valid phone number';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',"mess":'.json_encode($mess).',"class":"error center block"}';
exit();
}else{$go='yes';}

if($go=='yes'){
$reg_time = time();

$csql = "UPDATE users SET
surname = ?, 
firstname = ?  
WHERE email = ?";
$q1 = $dbConn->executeSql($csql,
	["$surname","$firstname","$email"]);
$state = '1';
$mess = 'Profile Updated Successfully';
header('content-type: application/json');
echo '{"state":'.json_encode($state).', "mess":'.json_encode($mess).',"class":"good"}';
exit();
}
}


if($action == 'updatePassword') {
$usr = $genClass->getUser();
$email = $usr['email'];
$oldpassword = $request['oldpassword'];
$newpassword = $request['newpassword'];
$newpassword2 = $request['newpassword2'];

$hashed = hash('sha512',strtolower($email).$newpassword);
$hashedOld = hash('sha512',strtolower($email).$oldpassword);

//Check Email
$emcheck =  $dbConn->getRows("SELECT email, password FROM users WHERE 
    email = ?",["$email"]);
$rss = $emcheck['data'];
$isEmail = count($rss);
//
if ($newpassword != $newpassword2) {
$go = 'no';
$state = '0'; 
$mess = ' New Passwords do not match';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',"mess":'.json_encode($mess).',"class":"error center block"}';
exit();
}elseif ($rss['password'] != $hashedOld) {
$go = 'no';
$state = '0'; 
$mess = ' Wrong old Password entered';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',"mess":'.json_encode($mess).',"class":"error center block"}';
exit();
}else{$go='yes';}

if($go=='yes'){
$reg_time = time();
$csql = "UPDATE users SET 
password = ? 
WHERE email = ?";
$q1 = $dbConn->executeSql($csql,["$hashed","$email"]);

$state = '1';
$mess = 'Password Updated Successfully';
header('content-type: application/json');
echo '{"state":'.json_encode($state).', "mess":'.json_encode($mess).',"class":"good"}';
exit();
}
}





if($action == 'userPasswordReset'){
$genClass = new GeneralClass();
$dbConn = new DbConn();
$settings = $genClass->getSettings();
$semail = $request['email'];
$sq = "SELECT * FROM users  WHERE  email = ? ";
$qup = $dbConn->getRows($sq,["$semail"]);
if($qup['code']==200 && $qup['data']!==false){
$row_us = $qup['data'];
$trt = count($row_us);

//exit();
if (empty($semail)) {
$go = 'no';
$state = '0';
$mess = 'Please Enter your Email adddress';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',"mess":'.json_encode($mess).',"class":"error block"}';
exit(); 


}elseif($trt > 0){
$qr = $dbConn->getRow("SELECT * FROM users WHERE email = ?",["$semail"]);

$row = $qr['data'];
$ui = $row['id'];
$useremail = $row['email'];
$active = $row['is_activated'];
$validation_code  = $row['verification_code'];
$firstname = $row['firstname'];
$surname = $row['surname'];
}//nums > 0
else{
$go = 'no';
$state = '0';
$mess = 'Your registration details not found .';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',"mess":'.json_encode($mess).',"class":"error  block"}';
exit(); 
}
}//query ok
else{
$go = 'no';
$state = '0';
$mess = 'System Error. Please contact Site Admin';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',"mess":'.json_encode($mess).',"class":"error  block"}';
exit(); 
}    



$code =  $genClass->crand(8);

////fire email
$baseUrl = $settings['base_url'];
$to = $useremail;
$hisName = $firstname.' '.$surname;   
$senderemail = "support@vinrun.com";
$sendername = $settings['site_short_name'];
$subject = 'You requested to reset your password ';
$message = "
Thank you <strong>$hisName</strong>.<br>
There was a request to reset password from your account at ".$sendername.".
If you confirm that you actually made that request please click on the 'RESET PASSWORD ' button below.
<br>
<a class='btn-email' href='".$baseUrl."/set-password?code=".$code."&si=".$ui."'>
RESET PASSWORD
</a>

<br>
You may also copy and paste the link below in your browser if the button doesn't work. 
<br>
".$baseUrl."/set-password?code=".$code."&si=".$ui."
 <br>
Please disregard this email if the request did not come from you.
 <br>
See you back soon.";

$name = $useremail;
$messBody = $message;


$sEmail =  new EmailClass();
$senda = $sEmail->sendPlain($senderemail,$sendername,$to,$subject,$messBody,$type='blue');



$update = $dbConn->executeSql("UPDATE users set verification_code='$code' WHERE email = ?",["$useremail"]);

$state = '1';
$mess = 'We sent a verification link to your email address. <br>Please open your email and click on this link to complete your password recovery process.';




header('content-type: application/json');
echo  '{
"state":'.json_encode($state).',
"mess":'.json_encode($mess).',
"uid":'.json_encode($iduser).',
"class":"good "
}';

exit();



}

?>
