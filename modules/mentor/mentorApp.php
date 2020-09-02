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



    if($request['action']  ==   'get_articles'){
$offset = $request['offset'];
$limit = $request['limit'];    
        $rsp = $articlesClass->getArticles($offset,$limit);
        
        $ars = array('articles'=>$rsp);
        header('content-type: application/json');
        echo json_encode($ars);
        exit();
        
        } 

