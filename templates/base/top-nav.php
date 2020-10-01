  <!-- Header-->
<script type="text/javascript">
function navFn() {
var element = document.getElementById("navDiv");
element.classList.toggle("force-show");
}//navFn
</script>
<?php echo @$fnx;?>

<div class="<?php echo @$pageNavClass; ?>">
<div class="header-row">
<div class="header-logo">
<a class="" href="./" title="<?php echo @$sitename;?>"><img src="images/logo.png" alt="<?php echo @$sitename;?>" /></a>
</div><!--logo-->

  
<div class="header-spacer"></div>
<nav class="header-column">
<a class="mobile-nav sm-show fas fa-bars"  onclick="navFn()"></a>
<ul id="navDiv" class="top-nav">
	<?php if(!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor']) && !isset($_SESSION['senseiAdmin'])){ ?>
<li class=""><a class="" href="./">Home</a></li> 
<?php }else { ?>
<li class=""><a class="" href="./account/feed">Home</a></li> 
<?php } ?>
<li class=""> <a class="" href="./faq">FAQ</a></li>
<li class=""> <a class="" href="./articles">Articles</a></li>
<li class=""> <a class="" href="./feed">Q&A</a></li>
<?php if(!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor']) && !isset($_SESSION['senseiAdmin'])){ ?>
<li class=""> <a class="header-btn sign-up" href="./register"> <i class="fas fa-user-plus"></i>&nbsp; SIGN UP</a></li>
<li class=""> <a class="header-btn login" href="./login"> <i class="fas fa-sign-in-alt"></i>&nbsp; LOGIN</a></li>
<?php }else{ ?>
<li class=""> <a class=""> <i class="fas fa-user-circle-o"></i> Dashboard&nbsp;<i class="fas fa-chevron-down txt-sm"></i></a>
<ul>
<li class=""> <a class="" href="./account/feed"> <i class="fas fa-stream"></i>&nbsp; Activity Feed</a></li>
<li class=""> <a class="" href="./feed"> <i class="fas fa-question-circle"></i>&nbsp; Q&A</a></li>
<li class=""> <a class="" href="./account/account-settings"> <i class="fas fa-cogs"></i>&nbsp; Account Settings</a></li>
<li class=""> <a class="" href="./logout"> <i class="fas fa-sign-out-alt"></i>&nbsp; Log Out</a></li>
</ul>
</li>
<li ng-if="userData.notifNum > 0" ng-cloak>
<a href="account/notifications">
<span><i class="fas fa-bell"></i></span><sup class="badge-counter">{{userData.notifNum}}</sup></a>
      </li>
<?php } ?>   
</ul>
</nav><!--header-col-->

</div><!--header-row-->

</div>
<script type="text/javascript">
function myFunc() { 
var para = document.getElementById("p"); 
para.classList.toggle("paragraphClass"); 
} </script>