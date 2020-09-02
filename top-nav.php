  <!-- Header
  ============================================= -->
  <script type="text/javascript">
function myFunction() {
  var element = document.getElementById("navDiv");
  console.log(element)
  element.classList.toggle("force-show");
}
</script>
<div class="header-row">
  
<div class="header-logo">
<a class="" href="./" title="<?php echo @$sitename;?>"><img src="images/logo.png" alt="VinRun" /></a>
</div><!--logo-->

  
<div class="header-spacer"></div>


<nav class="header-column">
<a class="mobile-nav sm-show fas fa-bars"  onclick="myFunction()"></a>
<ul id="navDiv" class="top-nav">
<li class=""><a class="" href="./">Home</a></li> 
<li class=""> <a class="" href="./feed">Q&A</a></li>

<?php if(!isset($_SESSION['senseiUser']) && !isset($_SESSION['senseiMentor'])){ ?>
<li class=""> <a class="header-sign-up" href="./register"> <i class="fas fa-user-plus"></i>&nbsp; SIGN UP</a></li>
<li class=""> <a class="" href="./get-started">Login</a></li>
<?php }else{ ?>
<li class=""> <a class=""> <i class="fas fa-user-circle-o"></i> Dashboard&nbsp;<i class="fas fa-chevron-down txt-sm"></i></a>
<ul>
<li class=""> <a class="" href="./{{module}}/feed"> <i class="fas fa-stream"></i>&nbsp; Activity Feed</a></li>
<li class=""> <a class="" href="./feed"> <i class="fas fa-question-circle"></i>&nbsp; Q&A</a></li>
<li class=""> <a class="" href="./{{module}}/settings"> <i class="fas fa-cogs"></i>&nbsp; Account Settings</a></li>
<li class=""> <a class="" href="./logout"> <i class="fas fa-sign-out-alt"></i>&nbsp; Log Out</a></li>
</ul>
        </li>
      <?php } ?>   
</ul>
</nav><!--header-col-->

</div><!--header-row-->
  <script type="text/javascript">

//document.getElementById("nvx").classList.add('MyClass');

//document.getElementById("nvx").classList.remove('MyClass');

//if ( document.getElementById("nvx").classList.contains('MyClass') ){
//console.log('contains MyClass')
//}else{
  //console.log('does nott contains MyClass')
//}
//
//document.getElementById("nvx").classList.toggle('MyClass');
//var shadesEl = document.querySelector('.quicknav');
//var shadesE = document.getElementById("nvx");
function myFunc() { 
            var para = document.getElementById("p"); 
            para.classList.toggle("paragraphClass"); 
            console.log(para.classList)
        } 
</script>