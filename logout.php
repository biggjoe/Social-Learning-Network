<?php
if (!isset($_SESSION)) {session_start();}
//clean old sessions
//clean old sessions


$_SESSION['vinUser'] = NULL;
$_SESSION['vinrun_admin'] = NULL;
$_SESSION['sessionid'] = NULL;
$_SESSION['vinUser_level'] = NULL;
$_SESSION['vinrun_admin_level'] = NULL;
unset($_SESSION['vinUser']);
unset($_SESSION['vinrun_admin']);
unset($_SESSION['sessionid']);
unset($_SESSION['vinUser_level']);
unset($_SESSION['vinrun_admin_level']);
//declare & assign fresh session variables
session_destroy();
$nextUrl = './';
header('Location: '.$nextUrl);
?>