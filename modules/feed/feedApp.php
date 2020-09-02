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
$feedClass = new FeedClass;
$accountClass = new AccountClass;
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


if($request['action']  ==   'get_feed'){


$dbConn = new DbConn();
$qaClass = new QaClass();
$socialClass = new SocialClass();
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
$squser = "SELECT f.* FROM feed f WHERE 
 (f.is_question = 1  AND f.did IN (".$mydepts.") ) OR 
  (f.is_answer = 1  AND f.did IN (".$mydepts.") ) OR 
  (f.is_comment = 1  AND f.did IN (".$mydepts.") ) 
    ORDER BY  f.id desc  LIMIT ? OFFSET ?";
}else{
$isLoggedUser = false;
}

$sqquest = "SELECT f.* FROM feed f WHERE 
 (f.is_question = 1 ) OR 
  (f.is_answer = 1) OR 
  (f.is_comment = 1 )  
    ORDER BY  f.id desc  LIMIT ? OFFSET ?";

if($isLoggedUser ===true){
$frr = $dbConn->getRows($squser,["$limit","$offset"]);
$rws = $frr['data'];
$fnum  =  count($rws);
if($fnum === 0){
$frr = $dbConn->getRows($sqquest,["$limit","$offset"]);
$rws = $frr['data'];
$fnum  =  count($rws);
}

}elseif($isLoggedUser !==true){
$frr = $dbConn->getRows($sqquest,["$limit","$offset"]);
$rws = $frr['data'];
$fnum  =  count($rws);
}


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
}

}//foreach


}




header('content-type: application/json');
echo '{"feed":'.json_encode($arr).'}';
exit();



} 


if($request['action']  ==   'get_topic'){
$dbConn = new DbConn();
$qaClass = new QaClass();
$offset = $request['offset'];
$limit = $request['limit'];
$url = $request['url'];
if(isset($_SESSION['senseiUser']) || isset($_SESSION['senseiMentor'])){
$isLoggedUser = true;
$usr = $genClass->getUser();
$thisuser = $usr['email'];
}else{
$isLoggedUser = false;	
}
$rtq =  ($isLoggedUser===true) ? $qaClass->getTopic($url,$thisuser,$limit,$offset) : $qaClass->getTopic($url,false,$limit,$offset);

header('content-type: application/json');
echo '{"topic":'.json_encode($rtq).'}';
exit();

} 


if($request['action']  ==   'list_more_question_answers'){
$dbConn = new DbConn();
$qaClass = new QaClass();
$qid = $request['id'];
$rsp = $qaClass->getMoreFeedQuestionAnswers($qid);
header('content-type: application/json');
echo '{"answers":'.json_encode($rsp).'}';
exit();

} 


if($request['action']  ==   'list_more_answer_comments'){
$dbConn = new DbConn();
$qaClass = new QaClass();
$qid = $request['parent_answer_id'];
$rsp = $qaClass->getMoreFeedAnswerComments($qid);

header('content-type: application/json');
echo '{"answers":'.json_encode($rsp).'}';
exit();
} 
if($request['action']  ==   'save_comment'){
	$qaClass = new QaClass();
$rsp = $qaClass->saveComment($request);
header('content-type: application/json');
echo json_encode($rsp);
exit();

} 
if($request['action']  ==   'save_answer'){
$qaClass = new QaClass();
$rsp = $qaClass->saveAnswer($request);
var_dump($rsp);
exit();
header('content-type: application/json');
echo json_encode($rsp);
exit();
} 


if($request['action']  ==   'save_upvote'){
$comId = $request['id'];
$type = 'upvote';
$qaClass = new QaClass();
$rsp = $qaClass->saveVote($comId,$type);
var_dump($rsp);
exit();
header('content-type: application/json');
echo json_encode($rsp);
exit();
} 

if($request['action']  ==   'saveQuestion'){
$qaClass = new QaClass();
$rsp = $qaClass->saveQuestion($request);
header('content-type: application/json');
echo json_encode($rsp);
exit();
} 

if($request['action']  ==   'list_departments'){
$socialClass = new SocialClass();
$rsp = $socialClass->listDepartments();
header('content-type: application/json');
echo '{"departments":'.json_encode($rsp).'}';
exit();
} 


if($request['action']  ==   'save_downvote'){
$comId = $request['id'];
$type = 'downvote';
$qaClass = new QaClass();
$rsp = $qaClass->saveVote($comId,$type);
var_dump($rsp);
exit();
header('content-type: application/json');
echo json_encode($rsp);
exit();
} 



?>
