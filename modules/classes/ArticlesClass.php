<?php
//if (!isset($_SESSION)) {session_start();}
class ArticlesClass {

public function getArticles($offset=false,$limit=false){
$dbConn = new dbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUser();
$thisuser = $usr['email'];

if(isset($_SESSION['senseiUser'])){
$utype = 'user';
}elseif (isset($_SESSION['senseiMentor'])) {
$utype = 'mentor';
}

$lim = (isset($limit) && $limit !== false) ? $limit : 12; 

if($utype == 'user'){
$rsp = (isset($offset) && $offset !== false) ? 
$dbConn->getRows("SELECT  py.status, py.id, py.ref, a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.user_type, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM article_purchases ap 
JOIN articles a ON a.id = ap.article_id
LEFT JOIN article_ratings ar ON a.id = ar.article_id  
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
LEFT JOIN payments py ON py.id = ap.payment_id
JOIN users u ON u.email = ap.user
WHERE ap.user = ?  
GROUP BY a.id
ORDER BY a.id desc  LIMIT ? OFFSET ?",["$thisuser","$lim","$offset"])
:
$dbConn->getRows("SELECT  py.status, py.id, py.ref, a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.user_type, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM article_purchases ap 
JOIN articles a ON a.id = ap.article_id
LEFT JOIN article_ratings ar ON a.id = ar.article_id  
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
LEFT JOIN payments py ON py.id = ap.payment_id
JOIN users u ON u.email = ap.user
WHERE ap.user = ?  
GROUP BY a.id
ORDER BY a.id desc LIMIT ? ",["$thisuser","$lim"])
;


}elseif($utype == 'mentor'){
$rsp = (isset($offset) && $offset !== false) ? 
$dbConn->getRows("SELECT  a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM articles a 
LEFT JOIN article_ratings ar ON a.id = ar.article_id 
LEFT JOIN article_purchases ap ON a.id = ap.article_id 
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
JOIN users u ON u.email = a.mentor_id
WHERE a.mentor_id = ?  
GROUP BY a.id
ORDER BY a.id desc  LIMIT ? OFFSET ?",["article","$thisuser","$lim","$offset"])
:
$dbConn->getRows("SELECT  a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM articles a 
LEFT JOIN article_ratings ar ON a.id = ar.article_id 
LEFT JOIN article_purchases ap ON a.id = ap.article_id 
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares as ON a.id = asl.content_id  AND asl.content_type = ? 
JOIN users u ON u.email = a.mentor_id
WHERE a.mentor_id = ?  
GROUP BY a.id
ORDER BY a.id desc LIMIT ? ",["article","$thisuser","$lim"])
;
}


$rwv  =  $rsp['data'];
$isArt = count($rwv);
//WHERE a.mentor_id  = '$user'
$arr  =  array();
if($isArt > 0){
//do{
foreach ($rwv as $key => $rw) {
$rw['content'] = $rw['description'] = stripslashes(html_entity_decode($rw['content']));
$rw['total_sales'] = (int)$rw['total_sales'];
$rw['total_saves'] = (int)$rw['total_saves'];
$rw['total_shares'] = (int)$rw['total_shares'];
$rw['total_comments'] = (int)$rw['total_comments'];
$rw['total_ratings'] = (int)$rw['total_ratings'];
$ty = $dbConn->getRows("SELECT  af.url, af.name as filename, af.size, af.mime, af.adate AS create_date FROM  article_files af WHERE  af.article_id = ? order by af.id desc",["$rw[aid]"]);
$rx  =  $ty['data'];
$file_count = count($rx);
$rw['file_ccount'] = $file_count; 
$art = array();
foreach ($rx as $ky => $rxd) {
$art[] = $rxd; 
}//foreach
$rw['files'] = $art;
$arr[] = $rw;
}//foreach
}


return $arr;

}//getArticles




public function getPublicArticles($username,$userType,$offset=false,$limit=false){
$dbConn = new dbConn();
$genClass = new GeneralClass();
$usr = $genClass->getUserFromUsername($username);
$thisuser = $usr['email'];
$utype = $userType;

$lim = (isset($limit) && $limit !== false) ? $limit : 12; 

if($utype == 'user'){
$rsp = (isset($offset) && $offset !== false) ? 
$dbConn->getRows("SELECT  py.status, py.id, py.ref, a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.user_type, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM article_purchases ap 
JOIN articles a ON a.id = ap.article_id
LEFT JOIN article_ratings ar ON a.id = ar.article_id  
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
LEFT JOIN payments py ON py.id = ap.payment_id
JOIN users u ON u.email = ap.user
WHERE ap.user = ?  
GROUP BY a.id
ORDER BY a.id desc  LIMIT ? OFFSET ?",["$thisuser","$lim","$offset"])
:
$dbConn->getRows("SELECT  py.status, py.id, py.ref, a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.user_type, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM article_purchases ap 
JOIN articles a ON a.id = ap.article_id
LEFT JOIN article_ratings ar ON a.id = ar.article_id  
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
LEFT JOIN payments py ON py.id = ap.payment_id
JOIN users u ON u.email = ap.user
WHERE ap.user = ?  
GROUP BY a.id
ORDER BY a.id desc LIMIT ? ",["$thisuser","$lim"])
;


}elseif($utype == 'mentor'){
$rsp = (isset($offset) && $offset !== false) ? 
$dbConn->getRows("SELECT  a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM articles a 
LEFT JOIN article_ratings ar ON a.id = ar.article_id 
LEFT JOIN article_purchases ap ON a.id = ap.article_id 
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
JOIN users u ON u.email = a.mentor_id
WHERE a.mentor_id = ?  
GROUP BY a.id
ORDER BY a.id desc  LIMIT ? OFFSET ?",["article","$thisuser","$lim","$offset"])
:
$dbConn->getRows("SELECT  a.*, a.id as aid,  u.firstname, 
    u.surname, u.username, u.avatar,
count(DISTINCT  ap.id) AS total_sales,
count(DISTINCT  asv.id) AS total_saves,
count(DISTINCT  ac.id) AS total_comments,
count(DISTINCT  asl.id) AS total_shares,
CEILING((sum(DISTINCT ar.rate)/count(DISTINCT  ar.id))) AS total_ratings
FROM articles a 
LEFT JOIN article_ratings ar ON a.id = ar.article_id 
LEFT JOIN article_purchases ap ON a.id = ap.article_id 
LEFT JOIN article_saves asv ON a.id = asv.article_id 
LEFT JOIN article_comments ac ON a.id = ac.article_id 
LEFT JOIN all_shares asl ON a.id = asl.content_id  AND asl.content_type = ? 
JOIN users u ON u.email = a.mentor_id
WHERE a.mentor_id = ?  
GROUP BY a.id
ORDER BY a.id desc LIMIT ? ",["article","$thisuser","$lim"])
;
}



$rwv  =  $rsp['data'];
$isArt = count($rwv);
//WHERE a.mentor_id  = '$user'
$arr  =  array();
if($isArt > 0){
//do{
foreach ($rwv as $key => $rw) {
$rw['content'] = $rw['description'] = stripslashes(html_entity_decode($rw['content']));
$rw['total_sales'] = (int)$rw['total_sales'];
$rw['total_saves'] = (int)$rw['total_saves'];
$rw['total_shares'] = (int)$rw['total_shares'];
$rw['total_comments'] = (int)$rw['total_comments'];
$rw['total_ratings'] = (int)$rw['total_ratings'];
$ty = $dbConn->getRows("SELECT  af.url, af.name as filename, af.size, af.mime, af.adate AS create_date FROM  article_files af WHERE  af.article_id = ? order by af.id desc",["$rw[aid]"]);
$rx  =  $ty['data'];
$file_count = count($rx);
$rw['file_ccount'] = $file_count; 
$art = array();
foreach ($rx as $ky => $rxd) {
$art[] = $rxd; 
}//foreach
$rw['files'] = $art;
$arr[] = $rw;
}//foreach
}


return $arr;

}//getPublicArticles



}//vinClass

?>