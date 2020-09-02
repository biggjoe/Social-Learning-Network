<?php 
/**
 * 
 */
class PaymentClass
{

  function __construct()
  {
}


public function getPayment($reference){
$dbConn = new DbConn();
$aq = "SELECT * FROM payments WHERE ref = ?";
$ut = $dbConn->getRow($aq,["$reference"]);
$rw = $ut['data'];
if($ut['code'] == 200 && $ut['data']!==false){
return  $rw;
}else{
return false;
}
}



public function executePayment($reference,$level=1){
$campaignClass = new CampaignClass();
$dbConn = new DbConn();
$pay = $this->getPayment($reference);
$user = $pay['user']; 
$amount = $pay['amount']; 
$campaignId = $pay['campaign_id'];
$frs = $campaignClass->subscribeUser($user,1);
$uplineId = $frs['uid'];
$uplineUser = $frs['user'];
$uState = $frs['state'];
$gr = $dbConn->executeSql("UPDATE users SET ref_completed = ? WHERE email = ? AND campaign_id = ?",["1","$user","$campaignId"]);
if($campaignClass->initPayUpline($uplineUser,$user,$amount,$campaignId)){
$done = $campaignClass->incrementDownline($uplineId);
return true;
}else{
return false;
}
}

public function getUserBalance($user){
$dbConn = new DbConn();
$sql = "SELECT * FROM wallet WHERE user = ?";
$qr = $dbConn->getRow($sql,["$user"]);

if($qr['code'] == 200 && is_array($qr['data'])){
$rw = $qr['data'];
}else{
$rw = falses;
}
return $rw;
}//getUserBalance

public function isEnoughBalance($user,$cost){
$genClass = new GeneralClass();
$dbConn = new DbConn();
$usr = $genClass->getUser();
$user = $usr['email'];
$sql = "SELECT * FROM wallet WHERE user = ?";
$qr = $dbConn->getRow($sql,["$user"]);
$rw = $qr['data'];
//
if($qr['code'] == 200 && $rw['balance'] >= $cost){
return true;
}elseif($qr['code'] == 200 && $rw['balance'] < $cost){
return false;     
}else{
return false;           
}

}





public function getWallet($user){
$dbConn = new DbConn();
$sql = "SELECT * FROM wallet WHERE user = ?";
$qr = $dbConn->getRow($sql,["$user"]);
if($qr['code']==200 && $qr['data']!==false){
return $qr['data'];  
}else{
return false;  
}
}


public function markPayment($ref,$status){
$qz = self::$dbConn->executeSql("UPDATE payments SET status = ? WHERE ref = ?",["$status", "$ref"]);
if($qz['code']==200){
$status = '1'; 
$mess = 'Success';
}else{ 
$status = '0'; 
$mess = 'Failed';
}
return array(
  "status" => $status ,
  "mess" => $mess
);
}


public function debitWallet($user,$amount,$reason=false){
$dbConn = new DbConn();
$sql = "SELECT * FROM wallet WHERE user = ?";
$qr = $dbConn->getRow($sql,["$user"]);
if($qr['code']==200 && $qr['data']!==false){
$rw = $qr['data'];
$curBalance = $rw['balance'];
$newBalance = $curBalance-$amount;
//
$scred = "UPDATE wallet SET balance = ? WHERE user = ?";
$cred = $dbConn->executeSql($scred, ["$newBalance", "$user"]);
$rts = ($cred['code']==200) ? true:false;
return $rts;
}else{
return false;  
}
}



public function creditWallet($user, $amount, $reason=false){
$dbConn = new DbConn();
$sql = "SELECT * FROM wallet WHERE user = ?";
$qr = $dbConn->getRow($sql,["$user"]);
if($qr['code']==200 && $qr['data']!==false){
$rw = $qr['data'];
$curBalance = $rw['balance'];
$newBalance = $curBalance + $amount;
//
$scred = "UPDATE wallet SET balance = ? WHERE user = ?";
$cred = $dbConn->executeSql($scred,["$newBalance","$user"]);

$rts = ($cred['code']==200) ? true:false;

}else{
$rts =  false;
}

return $rts;
}

public function saveTransaction($data){
$dbConn = new DbConn();
$qx = $dbConn->insertDb($data,'transactions');
return $qx;
}//saveTransaction

public function initiateTransaction($data){
  /*
  action: "submitPayment"
bank_name: "Ecobank"
date: 1597100400
depositRef: "88722GSSGAX0"
depositor_phone: "09083336677"
dueAmount: 987.34
pay_mode: "bank"
__proto__: Object*/
$genClass = new GeneralClass();
$dbConn = new DbConn();
$quick_ref = $this->genRef();
$ref = (isset($data['reference']) || isset($data['ref'])) ? $data['ref'] : $quick_ref['ref'];
$amt = $data['amount'];
$transactionName = $data['transactionName'];
$paymode = $data['pay_mode'];
if($data['pay_mode'] === 'bank'){
$payvendor = $data['bank_name']; 
}elseif ($paymode === 'card') {
$payvendor =  $data['pay_vendor'];
}
$depositRef = (isset($data['depositRef'])) ? $data['depositRef'] : '';
$depositDate = ($data['pay_mode'] == 'bank') ? $data['date'] : ''; 
$amount = $amt/100;
$usr = $genClass->getUser();
$customer = $usr['email'];
$depositor_phone = (isset($data['depositor_phone'])) ? $data['depositor_phone'] : '';
$time = time();
//
$check = $dbConn->getRows("SELECT ref FROM payments WHERE ref = ?",["$ref"]);
$isPayed = count($check['data']);
//
if($isPayed == 0){
$pload = array(
'amount'=>$amount,
'user'=>$customer,
'ref'=>$ref,
'date'=>$time,
'paymode'=>$paymode,
'payvendor'=>$payvendor,
'deposit_ref'=>$depositRef, 
'deposit_date'=>$depositDate, 
'depositor_phone'=>$depositor_phone
);
$qx = $dbConn->insertDb($pload,'payments');


$uid = $qx['lastInsertId'];
$tload = array(
'user'=>$customer,
'name'=>$transactionName,
'cost'=>$amount,
'reference'=>$ref,
'tdate'=>$time
);
//$qz = $dbConn->insertDb($tload,'transactions');
$rps = $dbConn->getRow("SELECT * FROM payments WHERE ref = ?",["$ref"]);
$rwd = $rps['data'];
return  array('uid' => $uid, 'ref' => $ref, 'pay_data'=>$rwd);
}else{
return  array("uid" => -1, "ref" => null, 'pay_data'=>[]);
exit();     
}

}//


public function fundWallet($request){
$genClass = new GeneralClass();
$dbConn = new DbConn();
$ref = $request['ref'];
$sql = "SELECT * FROM payments WHERE ref = ?";
$qr = $dbConn->getRow($sql,["$ref"]);
if($qr['code'] == 200 && $qr['data'] !== false){
$rw = $qr['data'];
$user = $rw['user'];
$amount =$rw['amount'];
$res = $this->creditWallet($user,$amount);
}else{
$res = false;
$user = null;
$amount = 0.00;
}
$status = ($res == true) ? '1':'0';
$mess = ($res == true) ? '<i class="fas fa-check-circle status-active"></i>&nbsp;Wallet Credited successfully':'<i class="fas fa-exclamation-triangle status-cancelled"></i> &nbsp;Unable to Credit Wallet. Please Contact Admin';
$tr = array(
'result'=>$res,
'user'=>$user,
'amount'=>$amount,
'mess'=>$mess,
'message'=>$mess,
'reference'=>$ref,
'status'=>$status
);

return $tr;
}//fundWallet


public function markTransaction($request){
$emailClass = new EmailClass();
$dbConn = new DbConn();
$ref = $request['reference'];
$istatus = $request['status'];
$qz = $dbConn->executeSql("UPDATE transactions SET status = ? WHERE reference = ?",
["$istatus","$ref"]);
if($qz['code']==200){
$status = '1'; $mess = 'Success';
}else{ 
$status = '0'; $mess = 'Failed';
}
$sendr = $emailClass->sendReceipt($ref);

return array("status" => $status,
"mess" => $mess
);

}



public function sendReceipt($ref){
$emailClass = new EmailClass();
$dbConn = new DbConn();
$sql = "SELECT t.name, t.cost, t.reference, t.tdate, t.status AS transaction_status, p.user, p.paymode, p.payvendor, p.status as pay_status, 
u.firstname, u.surname
FROM transactions t
JOIN payments p ON t.reference = p.ref
JOIN users u ON p.user = u.email
 WHERE t.reference = ?";
$qr = $dbConn->getRow($sql,["$ref"]);
$rw = $qr['data'];
$isBal = count($rw);
$rw['toName'] = $rw['firstname'].' '.$rw['surname'];
$rw['to'] = $rw['user'];
if($rw['pay_status'] == '1'){$type = 'blue';}
elseif($rw['pay_status'] == '-1'){
$type = 'red';
}

$senda = $emailClass->sendTxnReceipt($rw,$type);

return $senda;

}//sendReceipt

public function nullifyTransaction($request){
$dbConn = new DbConn();
$ref = $request['ref'];
$ida = '{"status":"closed"}';
$qx = $dbConn->executeSql("UPDATE payments SET status = ?, data = ? WHERE ref =  ?",["-1","$ida","$ref"]);
if($qx){$status =  true;}else{ $status =  false;}
return array("status" => $status);
}



public function verifyPayStackTransaction($ref,$sk){
$dbConn = new DbConn();
$url = 'https://api.paystack.co/transaction/verify/'.$ref;
$headers = array('Authorization: Bearer '.$sk);
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HEADER, 0);
curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$result = curl_exec($curl);
curl_close($curl);
$res = json_decode($result,true);


$qr = $dbConn->getRow("SELECT * FROM payments WHERE ref = ?",["$ref"]);
$irw = $qr['data'];
///
$message = $res['message'];
$gateway_response = $res['data']['gateway_response'];
$transaction_date = $res['data']['transaction_date'];
$amount = $res['data']['amount'];
$trueamount = $amount/100;
$data = json_encode($res['data']);
$user = $irw['user'];
$status = $res['data']['status'];
if($status=='success'){
$istat='1'; 
$class="good";
}
elseif ($status=='failed') {
  $istat='-1'; 
  $class="error";
}
elseif ($status=='abandoned') {
  $istat='-2'; 
  $class="error";
}
else{
  $istat='-1'; 
  $class="error";
}
//    
$qx = $dbConn->executeSql("UPDATE payments SET
user = ?, amount = ?, data = ?, status = ?
WHERE ref = ?", ["$user", "$trueamount", "$data", "$istat", "$ref"]);

if(($irw['amount'] >= $trueamount) && ($status=='success')) {
$mess = ' <i class="fas fa-check-circle status-active"></i> Your payment was completed successfully';
$status = $istat;
}elseif($irw['amount'] < $trueamount && ($status=='success')){
$mess = '<i class="fas fa-exclamation-triangle status-cancelled"></i> Your payment was received but the amount you paid (<s>N</s>'.number_format($trueamount).') did not tally with the amount you initiated for funding.';
$status = '0';
$qx = $dbConn->executeSql("UPDATE payments SET
user = ?, amount = ?, data = ?, status = ?
WHERE ref = ?", ["$user", "$trueamount", "$data", "30", "$ref"]);
}elseif($status=='failed'){
$mess = ' <i class="fas fa-exclamation-triangle status-cancelled"></i> Your payment was not successful -  <u>'.$gateway_response.'</u>';
$status = '0';
}elseif($status=='abandoned'){
$mess = '<i class="fas fa-exclamation-triangle status-cancelled"></i> Your payment was abandoned -  <u>'.$gateway_response.'</u>';
$status = '0';
}else{
$mess = '<i class="fas fa-exclamation-triangle status-cancelled"></i> Your payment was not successful -  <u>'.$gateway_response.'</u>';
$status = '0';  
}



return array(
"message"=>$mess,
"amount"=>$amount,
'transaction_date' => $transaction_date,
"data"=>$data,
"trueamount"=>$trueamount,
"gateway_response"=>$gateway_response,
"status"=>$status
);


}





public function genRef(){
$genClass = new GeneralClass();
$usr =  $genClass->getUser(); 
$thisuser = $usr['email'];
$fru = strtoupper(substr($thisuser, 0, 4));
$ini  = "vrn".$genClass->crand(4).time().$fru;
return array("ref" => $ini);

}








}//PaymentClass
