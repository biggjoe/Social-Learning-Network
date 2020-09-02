<?php 
/**
 * 
 */
class QaClass
{

function __construct(){}




public function getQuestion($qId,$author=false,$deptId=false){
$dbConn = new DbConn();
$genClass = new GeneralClass();
if($author !== false){
$usr = $genClass->getUser();
$thisuser = $usr['email'];
}
$ucols = $genClass->users_cols;
$sdy = $genClass->sqlPart($ucols,'y'); 



$sql =   "SELECT  $sdy, q.*, q.id AS question_id,
    (SELECT Count(*) FROM comments WHERE question_id = ? ) 
    as ans_num
    FROM questions q
    LEFT JOIN users y  ON q.author_id =   y.email
    LEFT JOIN comments c  ON q.id =   c.question_id
    WHERE q.id = ? ";
$cols =["$qId","$qId"];
if($deptId !== false){
$sql .=  " AND q.department_id = ?";
$cols =["$qId","$qId","$deptId"];
} 

$qt = $dbConn->getRow($sql,$cols);
if($qt['code'] ==200 && $qt['data'] !==false){
$rw = $qt['data'];
$ursu = ($rw['user_type'] == 'mentor') ? 'mentor':'user';
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['author_url'] = 'profile/'.$rw['username'];
$rw['is_question'] = true;
$rw['answer_list'] = array();
$rw['fn_name'] = 'getQuestion';
}else{
$rw = false;
}


return $rw;
}


public function getAnswer($qId,$author=false,$deptId=false){
$dbConn = new DbConn();
$genClass = new GeneralClass();
if($author !== false){
$usr = $genClass->getUser();
$thisuser = $usr['email'];
}
$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u'); 
$cmc = " ( SELECT Count(*) FROM comments WHERE answer_id = ? ) 
    as com_num ";
$upmc = " ( SELECT Count(*) FROM votes WHERE upvote = 1 AND answer_id = ? ) 
    as upvote ";
$dwnv = " ( SELECT Count(*) FROM votes WHERE downvote = 1 AND answer_id = ? ) 
    as downvote ";
$sql =   "SELECT 
u.email, u.surname, u.firstname, u.username, u.avatar, u.user_type,
u.email AS ans_email, u.surname AS ans_surname, u.firstname AS ans_firstname, u.username AS ans_username,
uq.username AS asker_username, uq.surname AS asker_surname, uq.firstname AS asker_firstname, uq.email AS asker_email,
q.department_id, q.title, q.url, u.avatar, u.firstname, u.surname, $cmc, $upmc, $dwnv, c.id AS parent_answer_id, c.* 
     FROM comments c
JOIN questions q ON q.id = c.question_id
JOIN users u ON u.id = c.author_id
JOIN users uq ON uq.email = q.author_id
WHERE c.id = ?";
$cols =["$qId","$qId","$qId","$qId"];
if($deptId !== false){
$sql .=  " AND q.department_id = ? ";
$cols =["$qId","$qId","$qId","$qId","$deptId"];
} 

/*
$asker_email = $answer['asker_email'];
$asker_username = $answer['asker_username'];
$asker_firstname = $answer['asker_firstname'];
$asker_surname = $answer['asker_surname'];
$asker_url = 'profile/'.$asker_username;
//
$ans_email = $answer['ans_email'];
$ans_username = $answer['ans_username'];
$ans_firstname = $answer['ans_firstname'];
$ans_surname = $answer['ans_surname'];
*/
$qt = $dbConn->getRow($sql,$cols);

if($qt['code'] ==200 && $qt['data'] !==false){
$rw = $qt['data'];
$rw['comment'] = stripslashes(html_entity_decode($rw['comment']));
$ursu = ($rw['user_type'] == 'mentor') ? 'mentor':'user';
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['author_url'] = 'profile/'.$rw['username'];
$rw['comment_id'] = (isset($rw['id']) && !empty($rw['id'])) ? $rw['id']:$qId;
$rw['comment_list'] = array();
$rw['is_answer'] = true;
$rw['is_not_answer'] = false;
$rw['fn_name'] = 'getAnswer';
}else{
$rw = false;
}
return $rw;


}//getAnswer



public function getComment($qId,$author=false){

$dbConn = new DbConn();
$genClass = new GeneralClass();
if($author !== false){
$usr = $genClass->getUser();
$thisuser = $usr['email'];
}


$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u'); 
$par_c = " ( SELECT comment FROM comments WHERE id = answer_id ) 
    as parent_comment ";
$upmc = " ( SELECT Count(*) FROM votes WHERE upvote = 1 AND answer_id = ? ) 
    as upvote ";
$dwnv = " ( SELECT Count(*) FROM votes WHERE downvote = 1 AND answer_id = ? ) 
    as downvote ";
    /*
    $commenter_email = $comment['com_email'];
$commenter_username = $comment['com_username'];
$commenter_firstname = $comment['com_firstname'];
$commenter_surname = $comment['com_surname'];
*/

$sql =  "SELECT pc.comment AS parent_comment, pc.create_date AS parent_create_date, qpc.url AS parent_url, up.username AS parent_username, up.email AS parent_email,  up.surname AS parent_surname, 
up.firstname AS parent_firstname, up.avatar AS parent_avatar, q.title, q.url, q.department_id, u.avatar, u.firstname, u.surname, $upmc, $dwnv, c.answer_id AS parent_answer_id, u.email, u.email AS com_email, u.firstname, u.firstname AS com_firstname, u.surname, u.surname AS com_surname, u.avatar, u.user_type AS com_user_type, u.user_type, u.username, u.username AS com_username, c.* 
     FROM comments c
JOIN questions q ON q.id = c.question_id
JOIN comments pc ON pc.id = c.answer_id
JOIN users u ON u.id = c.author_id
JOIN questions qpc ON pc.question_id = qpc.id
JOIN users up ON up.id = pc.author_id
WHERE c.id = ?";
$cols =["$qId","$qId","$qId"];

$qt = $dbConn->getRow($sql,$cols);

if($qt['code'] ==200 && $qt['data'] !==false){
$rw = $qt['data'];
$rw['comment'] = stripslashes(html_entity_decode($rw['comment']));
$ursu = ($rw['user_type'] == 'mentor') ? 'mentor':'user';
$rw['parent_answer_id'] = $rw['answer_id'];
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['parent_author_name'] = $rw['parent_firstname'].' '.$rw['parent_surname'];
$rw['author_url'] = 'profile/'.$rw['username'];
$rw['parent_author_url'] = 'profile/'.$rw['parent_username'];
$rw['comment_id'] = (isset($rw['id']) && !empty($rw['id'])) ? $rw['id']:$qId;
$rw['comment_list'] = array();
$rw['is_comment'] = true;
$rw['fn_name'] = 'getComment';
}else{
$rw = false;
}
return $rw;


}//getComment





public function getTopic($url,$thisuser=false,$limit=false,$offset=false){

$dbConn = new DbConn();
$genClass = new GeneralClass();
$limit = ($limit !== false) ? $limit : 20;
$offset = ($offset !== false) ? $offset : 0;
$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u');
$sqa =   "SELECT url, title, id as question_id, author_id AS question_author FROM `questions` WHERE `url` = ?";
$qra = $dbConn->getRow($sqa,["$url"]);



if($qra['code'] == 200 && $qra['data']!==false){
$rtu = $qra['data'];
$question_id = $rtu['question_id'];
}else{
return false;
}
 
$cmc = " ( SELECT Count(*) FROM comments WHERE answer_id = c.id ) 
    as com_num ";
$upmc = " ( SELECT Count(*) FROM votes WHERE upvote = 1 AND answer_id = c.id  ) 
    as upvote ";
$dwnv = " ( SELECT Count(*) FROM votes WHERE downvote = 1 AND answer_id = c.id  ) 
    as downvote ";
    /**/
$sql =   "SELECT c.comment, c.create_date, $sdc,
$cmc, $upmc, $dwnv
     FROM comments c
JOIN users u ON u.id = c.author_id
WHERE c.question_id = ?  AND answer_id = ? ORDER by c.id DESC    LIMIT ? OFFSET ?";
$cols =["$question_id","0","$limit","$offset"];

$qt = $dbConn->getRows($sql,$cols);


$arr = array();
if($qt['code'] ==200 && $qt['data'] !==false){
$rws = $qt['data'];
foreach ($rws as $key => $rw) {
$ursu = ($rw['user_type'] == 'mentor') ? 'mentor':'user';
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['question_id'] = $rtu['question_id'];
$rw['url'] = $rtu['url'];
$rw['question_author'] = $rtu['question_author'];
$rw['comment_list'] = array();
$rw['title'] = $rtu['title'];
$rw['comment'] = stripslashes(html_entity_decode($rw['comment']));
$rw['author_url'] = $ursu.'/profile/'.$rw['username'];
$rw['comment_id'] = (isset($rw['id']) && !empty($rw['id'])) ? $rw['id']:$qId;
$rw['is_answer'] = true;
$rw['fn_name'] = 'getTopic';
$arr[] = $rw;
}//foreach
}else{
$arr = false;
}



return $arr;
}//getTopic




public function getMoreFeedAnswerComments($qId){

$dbConn = new DbConn();
$genClass = new GeneralClass();

$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u'); 
/*$par_c = " ( SELECT comment FROM comments WHERE id = answer_id ) 
    as parent_comment ";*/
$upmc = " ( SELECT Count(*) FROM votes WHERE upvote = 1 AND answer_id = c.id ) 
    as upvote ";
$dwnv = " ( SELECT Count(*) FROM votes WHERE downvote = 1 AND answer_id = c.id ) 
    as downvote ";
    
$sql =   "SELECT  $sdc, $upmc, $dwnv, c.answer_id AS parent_answer_id, c.* 
     FROM comments c
JOIN users u ON u.id = c.author_id
WHERE c.answer_id = ?";
$cols =["$qId"];

$qt = $dbConn->getRows($sql,$cols);


$arrs = array();
if($qt['code'] ==200 && $qt['data'] !==false){
$rwx = $qt['data'];
foreach ($rwx as $key => $rw) {
$rw['comment'] = stripslashes(html_entity_decode($rw['comment']));
$rw['parent_answer_id'] = $rw['answer_id'];
$rw['author_url'] = 'profile/'.$rw['username'];
$rw['comment_id'] = $rw['id'];
$rw['is_inner_comment'] = true;
$rw['fn_name'] = 'getMoreFeedAnswerComments';
$arrs[] = $rw;
}//foreach
}else{

}

return $arrs;


}//getMoreFeedAnswerComments


public function getMoreFeedQuestionAnswers($qid){
$dbConn = new DbConn();
$genClass = new GeneralClass();  
$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u');



$cmc = " ( SELECT Count(*) FROM comments WHERE answer_id = c.id ) 
    as com_num ";
$upmc = " ( SELECT Count(*) FROM votes WHERE upvote = 1 AND answer_id = c.id  ) 
    as upvote ";
$dwnv = " ( SELECT Count(*) FROM votes WHERE downvote = 1 AND answer_id = c.id  ) 
    as downvote ";
    /**/
$sql =   "SELECT q.title, q.url, c.comment, c.create_date, $sdc,
$cmc, $upmc, $dwnv
     FROM comments c
JOIN questions q ON q.id = c.question_id
JOIN users u ON u.id = c.author_id
WHERE c.question_id = ?  AND answer_id = ? ORDER by c.id DESC LIMIT ? OFFSET ?";
$cols =["$qid","0","20","0"];

$qt = $dbConn->getRows($sql,$cols);


$arr = array();
if($qt['code'] ==200 && $qt['data'] !==false){
$rws = $qt['data'];
foreach ($rws as $key => $rw) {
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['comment_list'] = array();
$rw['comment'] = stripslashes(html_entity_decode($rw['comment']));
$rw['author_url'] ='profile/'.$rw['username'];
$rw['comment_id'] = (isset($rw['id']) && !empty($rw['id'])) ? $rw['id']:$qId;
$rw['is_answer'] = true;
$rw['fn_name'] = 'getMoreFeedQuestionAnswers';
$arr[] = $rw;
}//foreach
}else{
$arr = false;
}

return $arr;

}//getMoreFeedQuestionAnswers






public function getUserQuestions($user,$limit=false,$offset=false){

$dbConn = new DbConn();
$genClass = new GeneralClass();

$limit = ($limit !== false) ? $limit : 20;
$offset = ($offset !== false) ? $offset : 0;
$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u');


$cmc = " ( SELECT Count(*) FROM comments WHERE question_id = q.id ) 
    as ans_num ";
    /**/
$sql =   "SELECT q.*, $sdc, $cmc
     FROM questions q 
JOIN users u ON u.email = q.author_id
WHERE q.author_id = ? ORDER by q.id DESC   LIMIT ? OFFSET ?";
$cols =["$user","$limit","$offset"];

$qt = $dbConn->getRows($sql,$cols);



$arr = array();
if($qt['code'] ==200 && $qt['data'] !==false){
$rws = $qt['data'];
foreach ($rws as $key => $rw) {
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['question_id'] = $rw['id'];
$rw['author_url'] = 'profile/'.$rw['username'];
$rw['is_question'] = true;
$rw['answer_list'] = array();
$rw['fn_name'] = 'getUserQuestions';
$arr[] = $rw;
}//foreach
}else{
$arr = false;
}




return $arr;
}//getUserQuestions




public function getUserAnswers($user,$limit=false,$offset=false){

$dbConn = new DbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUserFromEmail($user);


$uid = $usr['id'];
$limit = ($limit !== false) ? $limit : 20;
$offset = ($offset !== false) ? $offset : 0;
$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u');


$cmc = " ( SELECT Count(*) FROM comments WHERE answer_id = c.id ) 
    as com_num ";

$upmc = " ( SELECT Count(*) FROM votes WHERE upvote = 1 AND answer_id = c.id  ) 
    as upvote ";
$dwnv = " ( SELECT Count(*) FROM votes WHERE downvote = 1 AND answer_id = c.id  ) 
    as downvote ";
$sql =   "SELECT c.*, q.url,q.title, $sdc, $cmc, $upmc, $dwnv
     FROM comments c 
JOIN users u ON c.author_id = u.id
JOIN questions q ON c.question_id = q.id
WHERE c.author_id = ? AND c.answer_id = ? ORDER by c.id DESC  LIMIT ? OFFSET ?";
$cols =["$uid","0","$limit","$offset"];

$qt = $dbConn->getRows($sql,$cols);


$arr = array();
if($qt['code'] ==200 && $qt['data'] !==false){
$rws = $qt['data'];
foreach ($rws as $key => $rw) {
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['comment'] = stripslashes(html_entity_decode($rw['comment']));
$rw['author_url'] = 'profile/'.$rw['username'];
$rw['is_answer'] = true;
$rw['comment_list'] = array();
$rw['fn_name'] = 'getUserAnswers';
$arr[] = $rw;
}//foreach
}else{
$arr = false;
}




return $arr;
}//getUserAnswers





public function getBlog($qId,$author=false){

$dbConn = new DbConn();
$genClass = new GeneralClass();
if($author !== false){
$usr = $genClass->getUser();
$thisuser = $usr['email'];
}
$ucols = $genClass->users_cols;
$sdc = $genClass->sqlPart($ucols,'u'); 
$a_comm = " ( SELECT Count(*) FROM article_comments WHERE article_id = ? ) 
    as com_num ";
$a_likes = " ( SELECT Count(*) FROM article_likes WHERE article_id = ? ) 
    as total_likes ";
$a_saves = " ( SELECT Count(*) FROM article_saves WHERE article_id = ? ) 
    as total_savings";
$a_file = " ( SELECT Count(*) FROM article_files WHERE article_id = ? ) 
    as total_files ";
$a_pur = " ( SELECT Count(*) FROM article_purchases WHERE article_id = ? ) 
    as total_purchases ";
$a_rate_sum = " ( SELECT sum(rate) FROM article_ratings WHERE article_id = ? ) 
    as rate_total_sum ";
$a_rate_count = " ( SELECT Count(*) FROM article_ratings WHERE article_id = ? ) 
    as rate_total_num ";
$sql =   "SELECT a.*, $a_likes, $a_saves, $sdc, $a_comm, $a_file, $a_pur, $a_rate_sum, $a_rate_count
     FROM articles a
LEFT JOIN users u ON u.email = a.mentor_id
WHERE a.id = ? AND a.mode = ? ";
$cols =["$qId","$qId","$qId","$qId","$qId","$qId","$qId","$qId","blog"];

$qt = $dbConn->getRow($sql,$cols);


if($qt['code'] ==200 && $qt['data'] !==false){
$rw = $qt['data'];
$rw['content'] = html_entity_decode($rw['content']);
$rw['author_name'] = $rw['firstname'].' '.$rw['surname'];
$rw['average_rating'] = ($rw['rate_total_sum'] > 0) ? $rw['rate_total_sum']/$rw['rate_total_num'] : 0;
$rw['author_url'] = (!empty($rw['username'])) ? 'profile/'.$rw['username'] : '';
$rw['comment_list'] = array();
$rw['fn_name'] = 'getBlog';
$rw['is_blog'] = true;
}else{
$rw = false;
}



return $rw;
}//getBlog




public function checkVoted($comId){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$rt = $dbConn->getRows("SELECT * FROM votes WHERE voter_id = ? AND answer_id = ? LIMIT ?",["$thisuser","$comId","1"]);
$arr = array();
if($rt['code'] == 200 && $rt['data']!==false){
if(count($rt['data']) == 1){
$rx = $rt['data'];
$arr['action'] = true;
$arr['vid'] = $rx[0]['id'];
$arr['upvote'] = $rx[0]['upvote'];
$arr['downvote'] = $rx[0]['downvote'];
$arr['answer_id'] = $rx[0]['answer_id'];
$arr['type'] = ($rx[0]['upvote'] == 1) ? 'upvote':'downvote';
}else{
$arr['action'] = false;  
}
}else{
$arr['action'] = false;   
}
return $arr;
}//checkVoted

public function reVote($comId,$type){
$dbConn = new DbConn();
if($type === 'upvote'){
$alta = 'downvote';
}elseif($type === 'downvote'){
$alta = 'upvote';  
}
$rt = $dbConn->executeSql("UPDATE votes SET $type = ?, $alta = ? WHERE id = ? ",["1","0","$comId"]);


$arr = array();
if($rt['code'] == 200){
return true;
}else{
return false;
}

}//reVote

public function saveVote($comId,$type){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];



$vtx = $this->checkVoted($comId);

if($vtx['action'] === true){
if($vtx['upvote']==1){
$next_type = 'downvote';
}elseif($vtx['downvote']==1){
$next_type = 'upvote';
}
$doV = $this->reVote($comId,$next_type);
if($doV){
return array('mess'=>'Done!','state'=>'1');  
}else{
return array('mess'=>'Failed!','state'=>'0');   
}

}else{
$now = time();
$cload = array(
"voter_id" => $thisuser,
"answer_id" => $comId,
"$type" => 1,
'vote_date' => $now
);
$rt = $dbConn->insertDb($cload,'votes');
$arr = array();
if($rt['code']==200){
$arr['vid'] = $rt['lastInsertId'];
$arr['mess'] = 'Done! Voted Newly';
$arr['state'] = '1';
}else{ 
$arr['message'] = 'failed'; 
$arr['state'] = '0';
}
return $arr;
}
}//saveVote



public function sendA2a($qid,$list){
$genClass = new GeneralClass();
$dbConn = new DbConn();
$notifyClass = new NotificationClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
#
$r =  $rts = array();
$adate =  time();
for ($i=0; $i < count($list); $i++) { 
$mentor = $list[$i]['mentor'];
$ch = $dbConn->getRows("SELECT * FROM a2a WHERE mentor  = ?  AND question_id  = ? AND user = ?", ["$mentor","$qid","$thisuser"]);
$isDey = count($ch['data']);
//
if($isDey ==  0){
$insLoad = array(
	'question_id'=> $qid,
	'mentor' => $thisuser,
	'user' => $thisuser,
	'adate' => $adate
);
$q3 = $dbConn->insertDb($insLoad,'a2a');
$uid = $q3['lastInsertId'];
if($q3['code'] == 200){
$r['mess']   = $rm = 'A2A Sent!';
$r['status']   = '1';
$doNotify = $notifyClass->notifya2a($thisuser,$mentor,$qid);//
if($doNotify == true){
$r['notified']   = '1';  
}else{
$r['notified']   = '0';  
}
}else{
$r['mess']   = $rm =  'A2A Not Sent!';
$r['status']   = '0';   
}
//
}else{
$r['mess']   = $rm =  'A2A already sent!';
$r['status']   = '0';       
}
//
$rts[$list[$i]['index']] = $rm;
//
}
//
$r['mlist'] = $rts;
$r['isDone'] = true;

//echo '';
//print_r($r['mlist']);
//exit();

return $r;
}//sendA2a






public function saveQuestion($data){
$genClass = new GeneralClass();
$dbConn = new DbConn();
$qaClass = new QaClass();
$notifyClass = new NotificationClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$question = $genClass->purifyContent(strip_tags($data['question']));
$did = $data['department_id'];
$is_directed = isset($data['is_directed']) ? $data['is_directed']:0;
$is_directed_at = isset($data['is_directed_at']) ? $data['is_directed_at']:'';
$uid = $usr['id'];
$username=$usr['username'];
$user_firstname = $usr['firstname'];
$user_surname = $usr['surname'];
$date =  time();
$u  = $genClass->SEO($data['question']);
$url = substr($u, 0, 211);
$ch  =  $dbConn->getRows("SELECT * FROM questions WHERE   url  = ?  AND title  = ?",["$url","$question"]);


$isDey = count($ch['data']);
if($isDey ==  0){
$qload = array('title' =>$question, 'department_id'=>$did, 'create_date' =>$date, 'author_id' =>$thisuser, 'url' =>$url, 'updated'=>$date, 'is_directed'=>$is_directed, 'is_directed_at'=>$is_directed_at);
$q3 = $dbConn->insertDb($qload,"questions");

$uid = $q3['lastInsertId'];
$notifyClass->sendNotify('question',$uid);
$dir = ($usr['user_type'] == 'user') ? 'account':'mentor';
$nma = '<a href ="profile/'.$username.'">'.$user_firstname.' '.$user_surname.'</a>';
$yudet = $nma.' asked you a direct question: '.$question;
$r =  array();
if($q3['code'] == 200){
$feedload = array('is_question'=>1, 'did'=>$did, 'cid'=>$uid, 'author'=>$thisuser, 'create_date'=>$date);
$feed = $notifyClass->feedNotification($feedload);
$fid = $feed['lastInsertId'];

$ft = $dbConn->getRow("SELECT * FROM feed WHERE id = ?",["$fid"]);
$ftr = $ft['data'];
$ftr['is_category'] = false;
$qs = $this->getQuestion($ftr['cid']);
$r['mess']   = 'Question Saved Successfully';
$r['class']   = 'good';
$r['status']   = '1';
$r['sent']   = true;
$r['data']   = $qs;
}else{
$r['mess']   = 'Error Saving Question';
$r['status']   = '0';
$r['class']   = 'error';	
$r['sent']   = false;
}

}else{
$r['mess']   = 'Question already exists';
$r['status']   = '0';	
$r['class']   = 'error';
$r['sent']   = false;	
}



return $r;
}//saveq






public function saveComment($data){

$genClass = new GeneralClass();
$dbConn = new DbConn();
$notifyClass = new NotificationClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$comm = htmlentities(addslashes($genClass->purifyContent($data['new_comment'])));
$qid = $data['question_id'];
$answer_id = $data['parent_answer_id'];
$dq =  $this->getQuestion($qid);
$did = $dq['department_id'];
$uid = $usr['id'];
$date =  time();
$cload = array('answer_id'=>$answer_id, 'question_id'=>$qid, 'comment'=>$comm, 'create_date'=>$date, 'author_id'=>$uid);

$q3 = $dbConn->insertDb($cload,"comments");
$uidx = $q3['lastInsertId'];
$notifyClass->sendNotify('comment',$uidx);
if($q3['code'] == 200){
$feedload = array('is_comment'=>1, 'did'=>$did,  'cid'=>$uidx, 'author'=>$thisuser, 'create_date'=>$date);
$feed = $notifyClass->feedNotification($feedload);
//
$q4 = $dbConn->executeSql("UPDATE questions SET updated = ? WHERE id = ?",["$date","$qid"]);

}
///
$r =  array();
if($q3['code'] == 200){
$sdx = $genClass->sqlPart($genClass->users_cols,'u');
$q5 = $dbConn->getRow(
  "SELECT c.*, q.title, q.url, $sdx FROM comments  c 
JOIN  users u ON   u.id  = c.author_id
JOIN  questions q ON   q.id  = c.question_id
WHERE c.id = ?",["$uidx"]);
$rwx  =  $q5['data'];
$rwx['comment'] = stripslashes(html_entity_decode($rwx['comment']));
$r['item']   = $rwx;
$r['mess']   = 'Comment Added';

$r['status']   = '1';
}else{
$r['mess']   = 'Comment Not  Added';
$r['status']   = '0';	
}


return $r;

}//saveComment











public function saveAnswer($data){

$genClass = new GeneralClass();
$dbConn = new DbConn();
$notifyClass = new NotificationClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$comment = htmlentities(addslashes($genClass->purifyContent($data['new_answer'])));
$qid = $data['question_id'];
$uid = $usr['id'];
$dq =  $this->getQuestion($qid);
$did = $dq['department_id'];
$date =  time();
$aload = array('question_id'=>$qid, 'comment'=>$comment, 'create_date'=>$date,  'author_id'=>$uid);
$q3 = $dbConn->insertDb($aload,'comments');
$uidx = $q3['lastInsertId'];
$dri = array('cid'=>$uidx,  'is_answer'=>1);
$newAnswer = $this->getAnswer($uidx);
$notifyClass->sendNotify('answer',$uidx);
if($q3['code'] == 200){
$feedload = array('is_answer'=>1,'did' => $did, 'cid'=>$uidx, 'author'=>$thisuser, 'create_date'=>$date);
$feed = $notifyClass->feedNotification($feedload);
//
$q4 = $dbConn->executeSql("UPDATE questions SET updated = ? WHERE id = ?",["$date","$qid"]);
}
$r =  array();
if($q3){
$r['mess']   = 'Answer Added';
$r['status']   = '1';
$r['newAnswer'] = $newAnswer;
}else{
$r['mess']   = 'Answer Not  Added';
$r['status']   = '0'; 
}

return $r;

}//saveAnswer



public function editTitle($data){
$genClass = new GeneralClass();
$dbConn = new DbConn();
$notifyClass = new NotificationClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$title = strip_tags($genClass->purifyContent($data['title']));
$u  = $genClass->SEO($title);
$url = substr($u, 0, 211);
$qid = $data['qid'];
$uid = $usr['id'];
$date =  time();
$ryu = $dbConn->getRow("SELECT public_can_edit, author_id FROM questions WHERE id = ?",["$qid"]);
$rqe = $ryu['data'];
$thisauthor = $rqe['author_id'];
if($rqe['author_id'] == 1){
$do = 1;
}elseif($rqe['author_id'] == 0 && ($thisauthor ==$thisuser)){
$do = 1;
}else{
  $do = 0;
}
if($do == 1){
$qrnu = count($dbConn->getRow("SELECT id FROM questions WHERE url = ? AND id <> ?",["$url","$qid"]));
$nrn = substr(time(), 0, 6);
if($qrnu > 0){$url = $url.'-'.$nrn;}
//
$q3 = $dbConn->executeSql(
"UPDATE questions SET title = ?, url = ? WHERE id = ?",["$title","$url","$qid"]);
$r =  array();
if($q3['code'] == 200){
$r['mess']   = 'Question Edited';
$r['status']   = '1';
}else{
$r['mess']   = 'Question Not  Edited';
$r['status']   = '0'; 
}
}else{

$r['mess']   = 'You are not Authorised to Edit this Question';
$r['status']   = '0';   
}

//echo '===';
//exit();

return $r;

exit();

}//editTitle





public function collatePreviousCommenters($aId){
$dbConn = new DbConn();
$sqz = $dbConn->getRows("SELECT u.email FROM comments c 
JOIN users u ON c.author_id = u.id 
WHERE c.answer_id = ?",["$aId"]);
$rez = $sqz['data'];
$arz = array();
foreach ($rez as $ky => $rt) {
$arz[] = $rt['email'];
}
return $arz;
}

public function collatePreviousAnswerers($qId){
$dbConn = new DbConn();
$sqz = $dbConn->getRows("SELECT u.email FROM comments c 
JOIN users u ON c.author_id = u.id 
WHERE c.question_id = ? AND c.answer_id = 0",["$qId"]);
$rez = $sqz['data'];
$arz = array();
foreach ($rez as $ky => $rt) {
$arz[] = $rt['email'];
}
return $arz;
}










}

 ?>