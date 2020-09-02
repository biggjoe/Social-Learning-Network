<?php
if (!isset($_SESSION)) {session_start();}
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
error_reporting(E_ALL);
ini_set('display_errors', '1');
ob_start();

require_once('../masterClass.php');
require '../../vendor/autoload.php';
$app_id = '808189';
$app_key = '94b15ec0f11a47b7d711';
$app_secret = '6a44c8eb0be078fb1627';
$app_cluster = 'eu';
$pusher = new Pusher\Pusher( $app_key, $app_secret, $app_id, 
  array( 'cluster' => $app_cluster, 'useTLS' => true ) );
#
$genClass = new GeneralClass;
$articlesClass = new ArticlesClass;
$accountClass = new AccountClass;
$feedClass = new FeedClass;
$payClass = new PaymentClass;
$dashClass = new DashClass;
#
$postdata = file_get_contents("php://input");
$request = json_decode($postdata,true);
$action = (is_array($request) && array_key_exists('action',$request))  ? $request['action'] : 'NULL';


##
if(isset($_REQUEST['data'])){
$formdata = json_decode($_REQUEST['data'],true);
}


if($action=='getThisPage'){
$dbConn = new dbConn();
$uid = $request['id'];
$qx = $dbConn->getRow("SELECT * FROM pages WHERE id = ?",["$uid"]);
if($qx['code']==200 && $qx['data'] !==false){
$row = $qx['data'];
$dt  = array(
    'id' => $row['id'], 
    'title' => html_entity_decode($row['title']),
    'name' => html_entity_decode($row['name']),
    'intro' => html_entity_decode($row['intro']),
    'content' => stripslashes(html_entity_decode($row['message']))
    );
}else{
$dt = array();
}
$ds = json_encode($dt);

header('content-type: application/json');
echo '{
"page":'.$ds.'}';

exit();
}





if($action=='allFaq'){
	$dbConn = new dbConn();
$qx = $dbConn->getRows("SELECT id, question, answer FROM faq",[]);
if($qx['code']==200 && $qx['data'] !==false){
$rx = $qx['data'];
$arr = array();  
foreach ($rx as $key => $row) {
$row['id'] = $row['id']; 
$row['question'] = html_entity_decode($row['question']);
$row['answer'] = stripslashes(html_entity_decode($row['answer']));
$arr[] = $row;
}//foreache
}else{
$arr = array();
}

$ds = json_encode($arr);
header('content-type: application/json');
echo '{"faq":'.$ds.'}';

exit();
}




if($request['action']  ==   'checkPublicUser'){
$dbConn = new DbConn();
$username = $request['username'];
$sql = " SELECT id FROM users WHERE username = ?";
$atr = [$username];
$rs = $dbConn->getRows($sql,$atr);
$rw = $rs['data'];
if(count($rw)>0){
$resp = true;
}else{
  $resp = false;
}
header('content-type: application/json');
echo '{"response":'.json_encode($resp).'}';
exit();
}


if($request['action']  ==   'searchReceipient'){
$dbConn = new DbConn();
$text = $request['text'];
$sql = " SELECT firstname,surname, email, user_type FROM 
users WHERE email LIKE ? OR 
firstname LIKE ? OR surname LIKE ?
";
$txt =  "%".$text."%";
$atr = [$txt,$txt,$txt];
$rs = $dbConn->getRows($sql,$atr);
$rw = $rs['data'];


header('content-type: application/json');
echo '{"result":'.json_encode($rw).'}';
exit();
}

if(
$action == 'get_user_public_details' || 
$action == 'get_user_public_questions' || 
$action == 'get_user_public_answers' || 
$action == 'get_user_public_articles' || 
$action == 'get_user_public_followers' || 
$action == 'get_user_public_following' || 
$action == 'get_user_public_feed'){
$act = $request['action'];
$username = $request['username'];
$rsp = $genClass->getUserPublic($act,$username);
$arx = array(
  'index'=>$request['index'],
  'request_type'=>$request['type'],
  'response'=>$rsp
);

header('content-type: application/json');
echo json_encode($arx);
exit();

}//getPublicDetails


if($action=='get_messages'){
$usr = $genClass->getUser();

$thisuser = $user = $usr['email'];

$offset = $request['offset'];
$limit = $request['limit'];    
$rsp = $dashClass->getMessages($offset,$limit);


$refNums  =  count($rsp);
$arr  =  array();
if($refNums > 0){
foreach ($rsp as $key => $rw) {
//print_r($rw);
$rw['message'] = stripslashes(html_entity_decode($rw['message']));
$rw['chat_dir'] = ($rw['pid'] == 0) ? $rw['id'] : $rw['pid'];
if($rw['sender'] === $thisuser){
$rw['other_party'] = $rw['receiver'];
}elseif($rw['receiver'] === $thisuser){
$rw['other_party'] = $rw['sender'];
}
$arr[] = $rw;
}//foreach
}



header('content-type: application/json');
echo '{"messages":'.json_encode($arr).'}';
exit();

}

if($action=='get_message_thread'){
  $dbConn = new dbConn();
$genClass = new GeneralClass();
$id = $request['pid'];
if(isset($_SESSION['vinrun_admin'])){
  $thisuser = 'admin';
}else{
$usr = $genClass->getUser();
$thisuser = $user = $usr['email'];}
$sql2  = "SELECT m.*,  u.firstname, 
u.surname,  u.email  FROM messages m 
LEFT JOIN users u ON m.sender = u.email AND  m.receiver = u.email 
 WHERE m.id = ? OR m.pid = ? AND (m.sender = ? OR m.receiver = ?)
ORDER BY m.id ASC";
///
$qt = $dbConn->getRows($sql2,["$id","$id","$thisuser","$thisuser"]);
//
if($qt['code'] == 200 && $qt['data'] !== false){
$rws  =  $qt['data'];
$refNums  =  count($rws);
}else{
$rws  =  [];
$refNums  =  0;
}

$arr  =  array();
if($refNums > 0){
foreach ($rws as $key => $rw) {
//$rw['message'] = stripslashes(html_entity_decode($rw['message']));
$rw['chat_dir'] = ($rw['pid'] == 0) ? $rw['id'] : $rw['pid'];
if($rw['sender'] == $thisuser){
$rw['other_party'] = $rw['receiver'];
}elseif($rw['receiver'] == $thisuser){
$rw['other_party'] = $rw['sender'];
}
$arr[] = $rw;
}//foreach
}



header('content-type: application/json');
echo '{"message_thread":'.json_encode($arr).'}';
exit();

}




if($action=='get_chat_push'){
$dbConn = new dbConn();
$genClass = new GeneralClass();
$id = $request['mid'];
$rw = $genClass->getMessageById($id);

header('content-type: application/json');
echo json_encode($rw);
exit();
}




if($action=='newMessage'){
$dbConn = new dbConn();
$genClass = new GeneralClass();
$notifyClass = new NotificationClass();
$data = $request;
$subject = $data['subject'];
$message = htmlentities(addslashes($data['message']));
$pid = $data['pid'];
$rs_data = array();
$usr = $genClass->getUser();

if($pid == 0){
  if(isset($_SESSION['vinrun_admin'])){
$receiver = $data['receiver'];
$sender = 'admin';    
}else{
$receiver = 'admin';
$sender = $usr['email'];
}
}else{
  if(isset($_SESSION['vinrun_admin'])){
$sender = 'admin';    
}else{
$sender = $usr['email'];
}
$qr = $dbConn->getRow("SELECT sender, receiver FROM messages WHERE id = ?",["$pid"]);
$rse = $qr['data'];
$receiver = ($rse['sender'] == $sender) ? $rse['receiver'] : $rse['sender'];
}
$time = time();


$qts = $dbConn->getRows("SELECT id FROM messages 
  WHERE pid = ? AND message = ? AND subject = ?", 
  ["0","$message","$subject"]);
$rconf = count($qts['data']);
 if($rconf > 0){
$state = '0'; $mess = 'This message has already been delivered.';
$class = 'error';
header('content-type: application/json');
echo '{"state":'.json_encode($state).',
"mess":'.json_encode($mess).',
"class":'.json_encode($class).'}';

exit();

 }else{
$insload = array(
'subject'=>$subject, 
'pid'=>$pid, 
'message'=>$message, 
'sender'=>$sender, 
'receiver'=>$receiver, 
'sdate'=>$time, 
'last_sender'=>$sender, 
'updated'=>$time
);
$q1 = $dbConn->insertDb($insload,'messages');
$idx = $q1['lastInsertId'];

//$updaT = mysqli_query($mysqli,"UPDATE messages SET 
//updated = '$time', message_num = message_num+1 WHERE id = '$pid'");


$detail = $sender.' sent a new message';
$qtnots = $notifyClass->notifyUser($detail,$receiver);
/*
$to = $receiver;  
$senderemail = "support@vinrun.com";
$sendername = $ust['firstname']. ' '.$ust['surname'];
$messBody = $data['message'];



$sEmail =  new EmailClass();
$senda = $sEmail->sendPlain($senderemail,$sendername,$to,$subject,$messBody,$type='plain');
*/
/*


$pid = (int)$pid;
$pusher->trigger( 'my-message-'.$pid.'channel', 'my-'.$pid.'event', 
  array('id' =>$idx, 'rmid' => $pid )
);
*/


if($q1['code']==200){
if($pid !== 0){
$channel_name = 'chat-push-channel-'.$pid;
$event_name = 'chat-push-event-'.$pid;
$trig_data = array('mid'=>$idx);
$socketId = $data['socketId'];
$pusher->trigger( $channel_name, $event_name, $trig_data, $socketId);
}
$rs_data = $genClass->getMessageById($idx);
$state = '1';
if($pid == '0'){ 
$mess = 'Message Sent!'; 
}else{
    $mess = 'Message Replied!';
//markMess($pid,0,$mysqli);
}
$class = 'good';
}else{
  
$state = '0'; 
if($pid == '0'){
$mess = 'Message Not Created!'; }else{$mess = 'Message Not Replied!';}
$class = 'error';
}



header('content-type: application/json');
echo '{"state":'.json_encode($state).',
"return_data":'.json_encode($rs_data).',
"mess":'.json_encode($mess).',
"class":'.json_encode($class).'}';

exit();
}
}//





if($action=='editUser'){
$dbConn = new DbConn();
$firstname = $request['firstname'];
$lastname = $request['surname'];
$phone = $request['phone'];
$company = $request['company'];
$id = $request['id'];
$sx = "SELECT * FROM  users WHERE  phone = ? AND id <> ?"; 
$rw = $dbConn->getRows($sx,["$phone","$id"]);
if($rw['code']==200 && $rw['data']!==false){
 $num = count($rw['data']); 
}


if(empty($firstname) || empty($lastname) || empty($phone)){
$mess = 'Some required fields are missing'; 
$state = "0";
$class = "error";
$go = 'no';
}

elseif($num > 0){  
$mess = 'A User with similar credentials already exist.';
$state = "0";
$class = "error";
$go = 'no';
}else{
$go = 'yes';
}

if($go == 'yes'){
$sql = "UPDATE users SET
firstname = ?, 
surname = ?,
phone = ?,
company = ?
WHERE id = ?
"; 
$qr = $dbConn->executeSql($sql, ["$firstname","$lastname","$phone","$company","$id"]);

if($qr['code']==200){
$mess = ' User Edited Successfully!';$class = "good"; $state = "1";
}else{
$mess = 'User Cannot be Edited now! Try Again later';$class = "error"; $state = "0";
}

}

header('content-type: application/json');
echo '{
    "mess":'.json_encode($mess).',
    "class":'.json_encode($class).',
    "state":'.json_encode($state).'
    }';

exit();
}




if($action=='reset_key'){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUser();
$user = $usr['email'];
$match_key = $usr['match_key'];
$public_key = $usr['public_key'];
#
$reg_time = time();
$ky = $genClass->crand(10).$reg_time;
$hs = $user.$ky.$reg_time;
$match_key = hash('sha512',$hs);
#
$type = $request['type'];
#
if($type == 'secret'){
$col = 'match_key';$val = $match_key;
$ms = 'Secret Key ';
}elseif($type == 'public'){
$col = 'public_key';$val = $ky;
$ms = 'Public Key ';
}
#
$sql = " UPDATE users SET $col = ? WHERE email = ? "; 
#
$qr = $dbConn->executeSql($sql, ["$val","$user"]);
#
if($qr['code']==200){
$mess = $ms.' reset Successfully!';
$class = "good"; 
$state = "1";
}else{
$mess = $ms.'  Cannot be reset now! Try Again later';
$class = "error"; 
$state = "0";
}
$r = array();
$r['mess'] = $mess;
$r['class'] = $class;
$r[$col] = $val;
$r['state'] = $state;
header('content-type: application/json');
echo json_encode($r);

exit();
}



if($action=='editPassword'){
$dbConn = new DbConn();
$id = $request['id'];
$current = $request['oldpassword'];
$newpassword = $request['password'];
$newpassword2 = $request['password2'];
///
$ucheck =  $dbConn->getRow("SELECT email, password FROM users WHERE id = ?",["$id"]);
$rph = $ucheck['data'];
$email = $rph['email'];

$hashedCurrent = hash('sha512',strtolower($email).$current); 
$hashed = hash('sha512',strtolower($email).$newpassword);

if($hashedCurrent != $rph['password']){
$go = 'no';
header('content-type: application/json');
echo '{"state":'.json_encode('0').',
"mess":'.json_encode('Wrong Current Password Supplied.').',
"class":'.json_encode('error').'}';
exit();
}
elseif($newpassword != $newpassword2){
$go = 'no';
header('content-type: application/json');
echo '{"state":'.json_encode('0').',
"mess":'.json_encode('Your new password did not match.').',
"class":'.json_encode('error').'}';
exit();

}else{
$go = 'yes';
}
if($go == 'yes'){
$csql = "UPDATE users SET password = ? WHERE email = ?";
$q1 = $dbConn->executeSql($csql,["$hashed","$email"]);

if($q1['code']==200){
$state = '1'; $mess = 'Password Updated!'; $class = 'good';
}else{
$state = '0'; $mess = 'Unable to Update Password!'; $class = 'error';
}


header('content-type: application/json');
echo '{"state":'.json_encode($state).',
"mess":'.json_encode($mess).',
"class":'.json_encode($class).'}';

exit();

}



}//





if($request['action']  ==   'get_activity_feed'){


$dbConn = new DbConn();
$qaClass = new QaClass();
$socialClass = new socialClass();
$offset = $request['offset'];
$limit = $request['limit'];
if(isset($_SESSION['senseiUser']) || isset($_SESSION['senseiMentor'])){
$usr = $genClass->getUser();
$isLoggedUser = true;
$thisuser = $usr['email'];
$idps  =  $socialClass->getUserDepartments($thisuser);
$arst = array();
foreach ($idps as $ky => $rwi) { 
  $arst[] = $rwi['department_id'];
}
$mydepts = implode(" , ", $arst);
$fll = $socialClass->usersFriendsArray($thisuser);
$friends = "'".implode("','", $fll)."'";

$sqr = "SELECT f.* FROM feed f WHERE 
 (f.is_question = 1  AND f.did IN (".$mydepts.") ) OR 
  (f.is_answer = 1  AND f.did IN (".$mydepts.") ) OR 
  (f.is_comment = 1  AND f.did IN (".$mydepts.") ) OR
  (f.is_article = 1  AND f.author IN ($friends) ) OR
  (f.is_comment = 1  AND f.author IN ($friends) )  OR
  (f.is_blog = 1  AND f.author IN ($friends) )  
    ORDER BY  f.id desc  LIMIT ? OFFSET ?";
}else{
$isLoggedUser = false;
$sqr = "SELECT f.* FROM feed f WHERE 
 (f.is_question = 1 ) OR 
  (f.is_answer = 1) OR 
  (f.is_comment = 1 )  
    ORDER BY  f.id desc  LIMIT ? OFFSET ?";
}
$frr = $dbConn->getRows($sqr,["$limit","$offset"]);



$rws = $frr['data'];
$fnum  =  count($rws);
$arr  =  $chko = array();


if($fnum > 0){

foreach ($rws as $key => $rw) {
    $rw['is_category'] = false;

if ($rw['is_question'] == 1) {
$rtq =  ($isLoggedUser===true) ? $qaClass->getQuestion($rw['cid'],false,false) : $qaClass->getQuestion($rw['cid'],false,false);
if($rtq !== false){
$arr[] = $rtq;
}

}elseif ($rw['is_answer'] == 1) {
$rtq =  ($isLoggedUser===true) ? $qaClass->getAnswer($rw['cid'],false,false) : $qaClass->getAnswer($rw['cid'],false,false);
if($rtq !== false){
$arr[] = $rtq;
}
}elseif ($rw['is_blog'] == 1) {
$rtq =  ($isLoggedUser===true) ? $qaClass->getBlog($rw['cid'],false) : $qaClass->getBlog($rw['cid'],false);
if($rtq !== false){
$arr[] = $rtq;
}

}elseif ($rw['is_comment'] == 1) {
$rtq =  ($isLoggedUser===true) ? $qaClass->getComment($rw['cid'],false) : $qaClass->getComment($rw['cid'],false);
if($rtq !== false){
$arr[] = $rtq;
}
}

}//foreach


}


header('content-type: application/json');
echo '{"activity_feed":'.json_encode($arr).'}';
exit();
}


if($request['action']  ==   'get_user_questions'){
$dbConn = new DbConn();
$qaClass = new QaClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$offset = $request['offset'];
$limit = $request['limit'];
$response = $qaClass->getUserQuestions($thisuser,$limit,$offset);
header('content-type: application/json');
echo '{"user_questions":'.json_encode($response).'}';
exit();
}



if($request['action']  ==   'get_user_answers'){
$dbConn = new DbConn();
$qaClass = new QaClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$offset = $request['offset'];
$limit = $request['limit'];
$response = $qaClass->getUserAnswers($thisuser,$limit,$offset);

header('content-type: application/json');
echo '{"user_answers":'.json_encode($response).'}';
exit();
}



?>