<?php

/**
 * 
 */
class SocialClass
{
	
	function __construct()
	{
		# code...
	}




public function isUserFollowed($mentor,$user){
$dbConn = new DbConn();
$qt = $dbConn->getRows("SELECT * FROM mentor_follow WHERE user = ? AND mentor = ?",["$user","$mentor"]);
$isFol  =  count($qt['data']);
$status = ($isFol == 0 ) ? false : true;
return $status;
}



public function getUserDepartments($user=false){
$genClass = new GeneralClass();
$dbConn = new DbConn();
if(isset($user) && $user != false){
$userx = $user;
}else if(!isset($user) || $user == false){
$usr =  $genClass->getUser(); 
$userx = $usr['email']; 
} 
$sq = "SELECT f.id as fid, f.department_id, d.name FROM followed_departments f 
JOIN departments d ON f.department_id = d.id
 WHERE f.user = ?";
$qr2 = $dbConn->getRows($sq,["$userx"]);
$rws = $qr2['data'];
$ayt = array();
foreach ($rws as $key => $rt) {
$ayt[] = $rt;
}

//var_dump($ayt);
//exit();
return $ayt;
}//getDepartmentFollowers



public function getDepartmentFollowers($did){
$dbConn = new DbConn();	
$sq = "SELECT f.id, f.department_id, f.user FROM followed_departments f 
 WHERE f.department_id = ?";
$qr2 = $dbConn->getRows($sq,["$did"]);

$rws = $qr2['data'];
return $rws;
}//getDepartmentFollowers



public function usersFriendsArray($username = false){
$genClass = new GeneralClass();
$dbConn = new DbConn();
if(!isset($username) ||  empty($username) ||  $username === null || $username === ''){
if(isset($_SESSION['senseiMentor'])){
$user = $_SESSION['senseiMentor'];
}else if(isset($_SESSION['senseiUser'])){
$user = $_SESSION['senseiUser'];
}else if(isset($_SESSION['senseiAdmin'])){
$user = $_SESSION['senseiAdmin'];
}else{
return false;
}
}else{
$user = $username;   
}

$folers = $this->usersFollowersEmailArray($user);
$folis = $this->usersFollowingEmailArray($user);
$ipals = array_merge($folers,$folis);

$friends = array_unique($ipals);

return $friends;


}//usersFriedsArray



public function usersFollowersEmailArray($username=false){
$dbConn = new DbConn();
if(!isset($username) ||  empty($username) ||  $username === null || $username === ''){
if(isset($_SESSION['senseiMentor'])){
$user = $_SESSION['senseiMentor'];
}else if(isset($_SESSION['senseiUser'])){
$user = $_SESSION['senseiUser'];
}else if(isset($_SESSION['senseiAdmin'])){
$user = $_SESSION['senseiAdmin'];
}else{
return false;
}
}else{
$user = $username;   
}

$rl = $dbConn->getRows("SELECT  u.email FROM mentor_follow m 
JOIN users u ON m.user = u.email
  WHERE m.mentor = ?  AND m.user <> ? ORDER BY m.id desc",["$user","$user"]);
$rows = $rl['data'];
$isArt  =  count($rows);
$arr  =  array();
if($isArt > 0){
foreach ($rows as $key => $rw) {
$arr[] = $rw['email'];
}
}else{
$arr = array();    
}
return $arr;

}//usersFollowerEmailArray



public function usersFollowingEmailArray($username = false){
$dbConn = new DbConn();
if(!isset($username) ||  empty($username) ||  $username === null || $username === ''){
if(isset($_SESSION['senseiMentor'])){
$user = $_SESSION['senseiMentor'];
}else if(isset($_SESSION['senseiUser'])){
$user = $_SESSION['senseiUser'];
}else if(isset($_SESSION['senseiAdmin'])){
$user = $_SESSION['senseiAdmin'];
}else{
return false;
}
}else{
$user = $username;   
}
$rl = $dbConn->getRows("SELECT   u.email FROM mentor_follow m 
JOIN users u ON m.mentor = u.email
  WHERE m.user = ? AND m.mentor <> ?  ORDER BY m.id desc",["$user","$user"]);
$rows = $rl['data'];
$isArt  =  count($rows);
$arr  =  array();
if($isArt > 0){
foreach ($rows as $key => $rw) {
$arr[] = $rw['email'];
}    
}else{
$arr = array();    
}
return $arr;

}//usersFollowingEmailArray



public function listDepartments(){
$dbConn = new DbConn();
$rl = $dbConn->getRows("SELECT id, name FROM departments",[]);
$rows = $rl['data'];
return $rows;
}//listDepartments




public function collateUsersMentors($asker_email){
$dbConn = new DbConn();
$sqq = $dbConn->getRows("SELECT mentor FROM mentor_follow WHERE user = ?",["$asker_email"]);
$rew = $sqq['data'];
$art = array();
foreach ($rew as $ky => $rt) {
$art[] = $rt['mentor'];
}
return $art;
}



public function collateMentorsFollowers($ans_email){
$dbConn = new DbConn();
$sqq = $dbConn->getRows("SELECT user FROM mentor_follow WHERE mentor = ?",["$ans_email"]);
$rew = $sqq['data'];
$art = array();
foreach ($rew as $ky => $rt) {
$art[] = $rt['user'];
}
return $art;  
}

public function collateUsersInCategory($department_id){
$dbConn = new DbConn();
$sqz = $dbConn->getRows("SELECT user FROM followed_departments WHERE department_id = ?",["$department_id"]);
$rez = $sqz['data'];
$arz = array();
foreach ($rez as $ky => $rt) {
$arz[] = $rt['user'];
}
return $arz;
}




public function getDepartmentDetails($url){
$dbConn = new DbConn();
$sql = "SELECT d.id, d.id AS did, d.description, d.name, d.url, i.name AS school, 
i.id AS school_id FROM departments d 
JOIN institutions i ON  i.id = d.school_id
WHERE d.url = ?";
$qre = $dbConn->getRow($sql,["$url"]);
$rw  =  $qre['data'];
$pcount = count($rw);
///
$did = $rw['did'];
$fdr = $dbConn->getRows("SELECT id FROM followed_departments WHERE department_id = ?",["$did"]);
$rwd = $fdr['data'];

$rw['dept_follows'] = count($rwd);
//
$fdt = $dbConn->getRow("SELECT
  COUNT(DISTINCT c.id) AS answer_num,
  COUNT(DISTINCT q.id) AS question_num
FROM questions q
LEFT JOIN comments c ON q.id = c.question_id 
WHERE q.department_id = ? AND c.answer_id = 0
",["$did"]);
$rwt = $fdt['data'];

$rw['question_num'] = $rwt['question_num'];
$rw['answer_num'] = $rwt['answer_num'];


if(count($pcount)>0){
return $rw;
}else{
return  array();
}
}//getDepartmentDetails





}///SocialClass

?>