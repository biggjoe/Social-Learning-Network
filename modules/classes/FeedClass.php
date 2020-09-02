<?php

class FeedClass {


/*
public function saveComment($data){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$now = time();
$cload = array(
'comment' => $data['new_comment'],
'question_id' => $data['question_id'],
'author_id' => $usr['uid'],
'create_date' => $now,
'answer_id' => $data['id']
);
$rt = $dbConn->insertDb($cload,'comments');
$arr = array();
if($rt['code']==200){
$arr['data'] = $this->getComment($rt['lastInsertId'],false);
$arr['message'] = $rt['message'];
$arr['state'] = '1';
}else{ 
$arr['message'] = 'failed'; 
$arr['state'] = '0';
}
return $arr;
}//saveComment

public function saveAnswer($data){
$dbConn = new DbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];
$now = time();
$cload = array(
'comment' => $data['new_answer'],
'question_id' => $data['question_id'],
'author_id' => $usr['uid'],
'create_date' => $now,
'answer_id' => 0
);
$rt = $dbConn->insertDb($cload,'comments');
$arr = array();
if($rt['code']==200){
$arr['data'] = $this->getAnswer($rt['lastInsertId'],false);
$arr['message'] = $rt['message'];
$arr['state'] = '0';
}else{ 
$arr['message'] = 'failed'; 
$arr['state'] = '0';
}
return $arr;
}//saveAnswer

*/








}//FeedClass


?>