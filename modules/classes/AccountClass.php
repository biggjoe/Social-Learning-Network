<?php 
/**
 * 
 */

class AccountClass
{
/**/
function __construct(){

}



public function checkAndSave($username,$email){
$dbConn = new dbConn();

$uscheck =  $dbConn->getRows("SELECT username FROM users WHERE username = ?",["$username"]);
$isUs = count($uscheck['data']);
//
$emcheck =  $dbConn->getRow("SELECT username FROM users WHERE email = ?",["$email"]);
$rt = $emcheck["data"];
if(strlen($rt['username']) >  0){
return true;
}elseif($isUs == 0){
$qdr = $dbConn->executeSql("UPDATE users SET username = ? WHERE email = ?",["$username","$email"]);
return true;
}else{
return false;	
}
}

public function saveUsername($data){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$username = $data['username'];
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$rs = array();
$uscheck =  $dbConn->getRows("SELECT username FROM users WHERE username = ?",["$username"]);
if($uscheck['code']==200 && $uscheck['data']!==false){
$isUs = count($uscheck['data']);
if($isUs>0){
$rs['message'] = 'Username already exists';	
$rs['status'] = '0';	
}else{
$upds =  $dbConn->executeSql("UPDATE users SET username = ? WHERE email = ?",["$username","$thisuser"]);
if($upds['code']==200){
$rs['message'] = 'Username saved Successfully';	
$rs['status'] = '1';	
}else{
$rs['message'] = 'Error saving username';	
$rs['status'] = '0';	
}
}
return $rs;	
}

}//saveUsername





public function userLogin($request){
	$dbConn = new DbConn();
	$genClass = new GeneralClass();
	$email = $request['email'];
	$password = $request['password'];
	$ip = $_SERVER['REMOTE_ADDR'];
	$rem = isset($request['remember']) ? $request['remember']:'';
	$prev = isset($request['prev']) ? $request['prev']:'';
	$_SESSION['PrevUrl'] = (isset($prev) && $prev!=='') ? $prev: NULL;
	
	$hashed = hash('sha512',strtolower($email).$password);
	
	//Lets search for this user
	$llg = "SELECT u.email FROM users u WHERE u.email = ? AND u.password = ?";
	$log_query = $dbConn->getRows($llg,["$email","$hashed"]);
	
	//Lets search for this user
	$llx = "SELECT u.* FROM users u WHERE u.email = ? AND u.password = ?";
	$logx = $dbConn->getRow($llx,["$email","$hashed"]);
	///
	
	$isUser = count($log_query['data']);
	$row_user = $logx['data'];
	$level = $row_user['level'];
	$email = $row_user['email'];
	$user_type = $row_user['user_type'];
	$uid  = $row_user['id'];
	
	
	if ($isUser == 1) { 
	//User is Found in our Database
	if($row_user['is_activated'] == '0'){
	$go = 'no';
	$state = '44';
	$mess = 'You Have not verified your account.  You can  verify your account by opening your email and clicking on the verification link we sent to you during registration';
	$ex = array(
		"state"=>$state,
	"email"=>$email,
	"mess"=>$mess,
	"uid"=>$uid,
	"isFound"=>'1', 
	"class"=>"error"
	);
	return $ex;
	
	}elseif($row_user['status'] == -1){
	$go = 'no';
	$state = '41';
	$mess = 'Your Account is blocked please contact admin';
	$ex = array(
	"state"=>$state,
	"status"=>$state,
	"email"=>$email,
	"mess"=>$mess,
	"message"=>$mess,
	"uid"=>$uid,
	"isFound"=>'1', 
	"class"=>"error"
	);
	return $ex;
	
	}else{
	$go = 'yes';
	}
	
	
	
	if($go == 'yes'){
	
	$genClass->redoSessionUser($user_type,$email,$level,$uid);
	
	if (isset($_SESSION['PrevUrl'])) {
	$nextUrl = $_SESSION['PrevUrl']; 
	$_SESSION['PrevUrl'] = NULL;
	unset($_SESSION['PrevUrl']);
	}else{
	$nextUrl = './'.$user_type;	
	}
	/**/
	
	$state = 1;
	$mess = 'Login Success';
	
	$ex = array(
	"state"=>$state,
	"email"=>$email,
	"mess"=>$mess,
	"uid"=>$uid,
	"isFound"=>'1',
	"nextUrl"=>$nextUrl,
	"allSession"=>$_SESSION, 
	"class"=>"good center"
	);
	return $ex;
	}
	
	}//if user was found end
	else{
	
	$state = '0';
	$mess = 'Details not found';
	$nextUrl = '';
	
	$ex = array(
	"state"=>$state,
	"mess"=>$mess,
	"isFound"=>'0',
	"nextUrl"=>$nextUrl,
	"allSession"=>$_SESSION, 
	"class"=>"error center"
	);
	return $ex;
	}
	
	
	
	
	}//userlogin
	



public function adminLogin($request){
	$dbConn = new DbConn();
	$genClass = new GeneralClass();
	$email = $request['email'];
	$password = $request['password'];
	$ip = $_SERVER['REMOTE_ADDR'];
	$rem = isset($request['remember']) ? $request['remember']:'';
	$prev = isset($request['prev']) ? $request['prev']:'';
	$_SESSION['PrevUrl'] = (isset($prev) && $prev!=='') ? $prev: NULL;
	
	$hashed = hash('sha512',strtolower($email).$password);
	
	//Lets search for this user
	$llg = "SELECT u.email FROM users u WHERE u.email = ? AND u.password = ? AND is_admin = ?";
	$log_query = $dbConn->getRows($llg,["$email","$hashed","1"]);
	
	//Lets search for this user
	$llx = "SELECT u.* FROM users u WHERE u.email = ? AND u.password = ? AND is_admin = ?";
	$logx = $dbConn->getRow($llx,["$email","$hashed","1"]);
	///
	
	$isUser = count($log_query['data']);
	$row_user = $logx['data'];
	$level = $row_user['level'];
	$email = $row_user['email'];
	$uid  = $row_user['id'];
	
	
	if ($isUser == 1) { 
	//User is Found in our Database
	if($row_user['is_activated'] == '0'){
	$go = 'no';
	$state = '44';
	$mess = 'You Have not verified your account.  You can  verify your account by opening your email and clicking on the verification link we sent to you during registration';
	$ex = array(
		"state"=>$state,
	"email"=>$email,
	"mess"=>$mess,
	"uid"=>$uid,
	"isFound"=>'1', 
	"class"=>"error"
	);
	return $ex;
	
	}elseif($row_user['status'] == -1){
	$go = 'no';
	$state = '41';
	$mess = 'Your Account is blocked please contact admin';
	$ex = array(
	"state"=>$state,
	"status"=>$state,
	"email"=>$email,
	"mess"=>$mess,
	"message"=>$mess,
	"uid"=>$uid,
	"isFound"=>'1', 
	"class"=>"error"
	);
	return $ex;
	
	}else{
	$go = 'yes';
	}
	
	
	
	if($go == 'yes'){
	
	$genClass->redoSessionUser('admin',$email,$level,$uid);
	
	if (isset($_SESSION['PrevUrl'])) {
	$nextUrl = $_SESSION['PrevUrl']; 
	$_SESSION['PrevUrl'] = NULL;
	unset($_SESSION['PrevUrl']);
	}else{
	$nextUrl = './admin';	
	}
	/**/
	
	$state = 1;
	$mess = 'Login Success';
	
	$ex = array(
	"state"=>$state,
	"email"=>$email,
	"mess"=>$mess,
	"uid"=>$uid,
	"isFound"=>'1',
	"nextUrl"=>$nextUrl,
	"allSession"=>$_SESSION, 
	"class"=>"good center"
	);
	return $ex;
	}
	
	}//if user was found end
	else{
	
	$state = '0';
	$mess = 'Details not found';
	$nextUrl = '';
	
	$ex = array(
	"state"=>$state,
	"mess"=>$mess,
	"isFound"=>'0',
	"nextUrl"=>$nextUrl,
	"allSession"=>$_SESSION, 
	"class"=>"error center"
	);
	return $ex;
	}
	
	
	
	
	}//adminlogin
	

public function regUser($request){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$settings = $genClass->getSettings();
$password = $request['password'];
$password2 = $request['password2'];
$phone = $request['phone'];
$email = $request['email'];
$surname = $request['surname'];
$firstname = $request['firstname'];
$user_type = $request['user_type'];
#
$rand = mt_rand();
$brk = explode("@", $email);
$usname = $brk[0];
$strt = 0;
$ip = $_SERVER['REMOTE_ADDR'];
//Check Email
$emcheck =  $dbConn->getRows("SELECT email FROM users WHERE email = ?",["$email"]);
$isEmail = count($emcheck['data']);
//Check Phone
$phonecheck =  $dbConn->getRows("SELECT phone FROM users WHERE phone = ?",["$phone"]);
$isPhone = count($phonecheck['data']);
$hashed = hash('sha512',strtolower($email).$password);
$validchars = array('-', '_', '.', '@'); 
$code =  $genClass->crand(10);

if(!ctype_alnum(str_replace($validchars, '', $email))) { 
$go = 'no';
$state = '0';
$mess = ' Invalid characters in your email address';
$d_response = array(
	"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);
return $d_response;
}
elseif ($emcheck['code'] == 200 && $isEmail > 0) {
$go = 'no';
$state = '0';
$mess = ' Email already in use.';
$d_response = array(
	"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);
return $d_response;
}elseif (!$genClass->isValidEmail($email)) {
$go = 'no';
$state = '0';
$mess = ' Please supply a valid email address';
$d_response = array(
	"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);
return $d_response;
}elseif (!$genClass->isValidPhone($phone)) {
$go = 'no';
$state = '0'; 
$mess = ' Please supply a valid phone number';
$d_response = array(
	"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);
return $d_response;
}elseif ($password != $password2) {
$go = 'no';
$state = '0';
$mess = ' Passwords did not match.';
$d_response = array(
	"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);
return $d_response;

}else{
	$go='yes';

}



if($go=='yes'){
$reg_time = time();
$ky = $genClass->crand(10).$reg_time;
$hs = $email.$ky.$reg_time;
$match_key = hash('sha512',$hs);
#
$uload = array(
	'user_type'=>$user_type,
	'phone'=>$phone, 
	'password'=>$hashed, 
	'email'=>$email, 
	'firstname'=>$firstname,
	'surname'=>$surname,
	'reg_time'=>$reg_time, 
	'verification_code'=>$code, 
	'last_seen'=>$reg_time,
	'is_activated'=>'1',
	'public_key'=>$ky,
	'match_key'=>$match_key
);
$query = $dbConn->insertDb($uload,'users');

$uid = $query['lastInsertId'];
//
$wload = array('user'=>$email);
$qucdf = $dbConn->insertDb($wload,'wallet');

////fire email
$to = $email;
$hisName = $firstname.' '.$surname;   
$senderemail = "support@sensei.ng";
$sendername = $settings['site_short_name'];
$subject = "Welcome to Sensei.ng";
$message = "
<p>Thank you <strong>$hisName</strong>.<br>
You are one step closer to becoming a verified user of ".$sendername.". </p>
<p>Kindly click on the 'Confirm Registration' Button below to complete your registration
</p>
<a class='btn-email' href='".$genClass->getbaseUrl()."/verify?code=".$code."'>
Confirm Registration
</a>

<p>
You may also copy and paste the link below in your browser if the button doesn't work. 
".$genClass->getbaseUrl()."/verify?code=".$code." </p>
<p>
Have a wonderful experience. 
</p>
";

$name = $email;
$messBody = $message;;
//$senda = $emailClass->sendPlain($senderemail,$sendername,$to,$subject,$messBody,$type='blue');
$genClass->redoSessionUser('user',$email,0,$uid);
$state = '1';
$mess = '<div>
<p> Thank You,  <br>Your registration has been received. <br>Kindly verify your registration by clicking on the verification link in the email we just sent to your email.</p>

<p class="py5 text-center">
<a class="btn-primary btn-bordered shadow-none btn btn-block" href="./account">Proceed to Dashboard<a>
</p>
</div>
';
$nextUrl = './account';
$d_response = array(
	"state"=>$state,
	"mess"=>$mess,
	"nextUrl"=>$nextUrl,
	"uid"=>$uid,
	"class"=>"good center block"
);

return $d_response;
}
}//regUser



public function getUserData($mode){
$genClass = new GeneralClass();
$dbConn = new DbConn();
	if($mode == 'admin'){
$uda = $genClass->getAdmin();		
	}elseif ($mode == 'user' || $mode == 'mentor') {
$uda = $genClass->getUser();
	}

return $uda;

}


public function updateUser($request){
$genClass = new GeneralClass();
$campaignClass = new CampaignClass();
$dbConn = new DbConn();
$usr =  $genClass->getUser(); 
$email = $usr['email']; 
$phone = $request['phone'];
$surname = $request['surname'];
$firstname = $request['firstname'];

if (!$genClass->isValidPhone($phone)) {
$go = 'no';
$state = '0'; 
$mess = ' Please supply a valid phone number';
//
return array(
"state" => $state,
"mess" => $mess,
"class" => "error center block"
);
//
}else{
$go='yes';
}
//
if($go=='yes'){
$reg_time = time();
$csql = "UPDATE users SET surname = ?, firstname = ?, phone = ? WHERE email = ?";
$q1 = $dbConn->executeSql($sql,["$surname","$firstname","$phone","$email"]);
$state = '1';
$mess = 'Profile Updated Successfully';
return array(
"state" => $state, 
"mess" => $mess,
"message" => $mess,
"nextUrl" => "/",
"class" => "good"
);

}
}


public function updatePassword($request){
$genClass = new GeneralClass();
$campaignClass = new CampaignClass();
$dbConn = new DbConn();
$usr =  $genClass->getUser(); 
$email = $usr['email']; 

$oldpassword = $request['oldpassword'];
$newpassword = $request['newpassword'];
$newpassword2 = $request['newpassword2'];

$hashed = hash('sha512',strtolower($email).$newpassword);
$hashedOld = hash('sha512',strtolower($email).$oldpassword);

/*Check Email
$emcheck =  mysqli_query($mysqli,"SELECT email, password FROM users WHERE 
    email = '$email'");
$rss = mysqli_fetch_assoc($emcheck);
$isEmail = mysqli_num_rows($emcheck);
*/


if ($newpassword != $newpassword2) {
$go = 'no';
$state = '0'; 
$mess = ' New Passwords do not match';


return array(
"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);


}elseif ($rss['password'] != $hashedOld) {
$go = 'no';
$state = '0'; 
$mess = ' Wrong old Password entered';

return array(
"state"=>$state,
	"mess"=>$mess,
	"class"=>"error center block"
);

}else{$go='yes';}

if($go=='yes'){
$reg_time = time();

$csql = "UPDATE users SET 
password = ? 
WHERE email = ?";
$q1 = $dbConn->executeSql($csql,["$hashed","$email"]);
$state = '1';
$mess = 'Password Updated Successfully';

return array (
"state"=>$state, 
"mess"=>$mess,
"class"=>"good"
);

}


}//savePassword








}//AccountClass



