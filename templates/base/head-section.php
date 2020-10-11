<?php  
function sanitize_output($buffer) {
$search = array('/\>[^\S ]+/s','/[^\S ]+\</s','/(\s)+/s','/<!--(.|\s)*?-->/');
$replace = array('>','<','\\1','');
$buffer = preg_replace($search, $replace, $buffer);
return $buffer;
}
ob_start("sanitize_output");
$server = $_SERVER['SERVER_NAME'];
$uhost = $_SERVER['HTTP_HOST'];
$params = explode('.', $uhost);
$pr = (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] != 'on') ? 
'http://':'https://';
$baseUrl = $basex = $pr.$server.'/';
$sf = substr($_SERVER['PHP_SELF'],-8);
$ttm = '';//'?ver='.time();

$pshr = @file_exists('https://js.pusher.com/4.4/pusher.min.js');
$puusher = ($pshr===true) ? '
<script src="https://js.pusher.com/4.4/pusher.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/pusher-angular@latest/lib/pusher-angular.min.js"></script>'
:'<script src="app/angular/pusher-alt.js"></script>';

?>
<!DOCTYPE html>
<html lang="en">
<head>
<base href="<?php echo @$basex; ?>">
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, shrink-to-fit=no">
<link href="images/icon.png" rel="icon" />
<title ><?php echo @$ptitle;?> - Sln.ng</title>
<meta name="description" content="{{site_description}}">
<meta name="author" content="Joseph Achebe">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900' type='text/css'>
<!--<link rel="stylesheet" type="text/css" href="<?php echo $output; ?>"/>-->
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/animate.css" />
<link rel="stylesheet" type="text/css" href="vendor/fontawesome/css/all.min.css" />
<link rel="stylesheet" href="css/ngDialog-plus-loading-bar.css">
<link rel="stylesheet" href="css/angular-material.min.plus.fonts.css">
<link rel="stylesheet" href="css/ng-wig.css">
<?php	
$libraries = '<script src="app/angular/angular.min.js"></script>';
if(isset($doAngular)){
$libraries .= '

<script src="app/angular/angular-material.min.js"></script>
<script src="app/angular/ngDialog-plus-loading-bar.js"></script>
<script src="app/angular/angular-aria.min.js"></script>  
<script src="app/angular/angular-filter.min.js"></script>
<script src="app/angular/angular-sanitize.min.js"></script>
<script src="app/angular/angular-animate.min.js"></script>
<script src="app/angular/ng-wig.js"></script>
<script src="app/angular/angular.audio.js"></script>
<script src="app/angular/ngClipboard.js"></script>
'.$puusher.'
';
}
if(isset($doAngular) && $doAngular == 'homeAngular'){
$libraries .= '
<script src="app/controllers/homeControllers.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/filters/appFilters.js"></script>
<script src="app/services/appServices.js"></script>
<script src="app/directives/appDirectives.js"></script>';
}elseif(isset($doAngular) && $doAngular == 'loginAngular'){
$libraries .= '
<script src="app/controllers/loginControllers.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/filters/appFilters.js"></script>';
}elseif(isset($doAngular) && $doAngular == 'adminLoginAngular'){
$libraries .= '
<script src="app/controllers/adminLoginControllers.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/filters/appFilters.js"></script>';
}elseif(isset($doAngular) && $doAngular == 'ipageAngular'){
$libraries .= '
<script src="app/controllers/pageControllers.js"></script>

<script src="app/directives/appDirectives.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/filters/appFilters.js"></script>';
}elseif(isset($doAngular) && $doAngular == 'feedAngular'){
$libraries .= '
<script src="app/angular/angular-ui-router.min.js"></script>
<script src="app/routes/feedRoutes.js"></script>
<script src="app/controllers/feedControllers.js"></script>
<script src="app/services/appServices.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/directives/appDirectives.js"></script>
<script src="app/directives/feedDirectives.js"></script>
<script src="app/filters/appFilters.js"></script>
';

}elseif(isset($doAngular) && $doAngular == 'profileAngular'){
$libraries .= '
<script src="app/angular/angular-ui-router.min.js"></script>
<script src="app/routes/profileRoutes.js"></script>
<script src="app/controllers/profileControllers.js"></script>
<script src="app/services/appServices.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/directives/appDirectives.js"></script>
<script src="app/directives/feedDirectives.js"></script>
<script src="app/filters/appFilters.js"></script>
';


}elseif(isset($doAngular) && $doAngular == 'articleAngular'){
$libraries .= '
<script src="app/angular/angular-ui-router.min.js"></script>
<script src="app/angular/angular-paystack.js"></script>
<script src="app/routes/articleRoutes.js"></script>
<script src="app/controllers/articleControllers.js"></script>
<script src="app/services/appServices.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/directives/appDirectives.js"></script>
<script src="app/filters/appFilters.js"></script>
';

}elseif(isset($doAngular) && $doAngular == 'accountAngular'){
$libraries .= '
<script src="app/angular/angular-ui-router.min.js"></script>
<script src="app/routes/accountRoutes.js"></script>
<script src="app/controllers/accountControllers.js"></script>
<script src="app/services/appServices.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/directives/appDirectives.js"></script>
<script src="app/directives/feedDirectives.js"></script>
<script src="app/filters/appFilters.js"></script>
';

}elseif(isset($doAngular) && $doAngular == 'adminAngular'){
$libraries .= '
<script src="app/angular/angular-ui-router.min.js"></script>
<script src="app/routes/adminRoutes.js"></script>
<script src="app/controllers/adminControllers.js"></script>
<script src="app/services/appServices.js"></script>
<script src="app/factories/appFactories.js"></script>
<script src="app/directives/appDirectives.js"></script>
<script src="app/directives/adminDirectives.js"></script>
<script src="app/directives/feedDirectives.js"></script>
<script src="app/filters/appFilters.js"></script>
';

}elseif(!isset($doAngular) || empty($doAngular)){


}
$libraries .= '<script src="app/controllers/generalController.js"></script>';

?>
</head>
<body class="<?php  echo @$bodyClass;  ?>">
<div class="<?php  echo @$wrapperClass;  ?>"   <?php echo @$angularApp; ?> ><!---->
<div class="abs-center color-primary" ng-if="false"><h2>  
	<i class="fas faa-flash animated  fa-spin fa-cog"></i> &nbsp; &nbsp;  
	<i class="fas faa-flash animated  fa-spin fa-cog"></i> &nbsp; &nbsp;   
	<i class="fas faa-flash animated  fa-spin fa-cog"></i>  
</h2></div>
<?php include 'head-nav.php';  ?>
