<?php
if (!isset($_SESSION)) {session_start();} 

$ptitle = ' Home Page ';
$show_navigation = false;
$bodyClass = ' home-body-class '; 
$wrapperClass = ' home-wrap-class '; 
$pageNavClass = ' sticky-there ';
$doAngular = 'homeAngular';
$angularApp = ' ng-app="home.controller" ng-controller="homeCtrl" ';
$fnx = '<script type="text/javascript">
function navFn() {
var element = document.getElementById("navDiv");
element.classList.toggle("force-show");
}//myFunction
// When the user scrolls the page, execute myFunction
window.onscroll = function() {scrFun()};
// Get the header
var header = document.getElementById("dheader");
// Get the offset position of the navbar
var sticky = header.offsetTop;
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function scrFun() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky-there");
    header.classList.add("bg-white");
  } else {
    header.classList.remove("sticky-there");
    header.classList.remove("bg-white");
  }
}
</script>
';
include 'templates/base/header.php';
?>

<div class=" home-wrap-class ">
<div id="dheader" class=" py30  ">
	<div class="body-container">
<?php include 'templates/base/top-nav.php'; ?>
</div>
</div>

<div class="home-body-class neg-top-marg body-container">
<div class="pos-top-marg row-home">
<div class="row-col-12 row-col-lg-6 home-intro"> 
<h1 class="">Learning Together - Achieving Together</h1>
<h4 class=""><strong><u>Social Learning Network</u></strong> is a learning community for tertiary level students. We are simply improving the learning experience of students  through effective collaboration and mentorship</h4>

<div class="intro-buttons">
<a href="./register" class="intro-button primary">
JOIN FOR FREE
</a>
</div>
 </div><!--intro-->

 <div class="row-col-12 row-col-lg-6 home-illus">
<img src="images/dvx-min.png">
 </div>

</div><!--row-home-->

</div><!--bg-dark-->




<section class="feature-row main-after">


<div class="body-container">
<div class="row-flex">
<div class="col-flex w60-responsive text-center">
<h2>Created by Students for Students</h2>

<p>Here, you will find
answers to the tough questions in your field of study, be able share knowledge
with fellow students taking similar courses all over Nigeria and find mentors to
guide you through your academic journey.
</p>
</div>
</div><!--row-flex-->

</div>

</section>


<div class="qa-sect">
<div class="body-container" layout="row" layout-align="start center">
<div flex>
<h1 class="mb5 pb0">What do you need to know?</h1>
<p class="py5 my5">Whether you’re stuck on a departmental course or worried about an upcoming quiz test, there’s no question too tricky for our Mentors.</p>	
</div>


<div flex class="text-center">
<div class="intro-buttons">
<a href="./feed" class="intro-button secondary">
 <i class="fas fa-comment"></i> &nbsp; ASK QUESTION
</a>
</div>
</div>

</div>	    

</div><!--section-->


<section class="account-table relative">
<div class="shade-1"></div>

<div class="body-container">

<div class="pos-top-marg row-home align-items-center">
<div class="row-col-12 row-col-lg-6 home-intro "> 
<h1 class="color-white">Choose an Account that suits your needs</h1>
<h4 class="color-white"><strong><u>Social Learning Network</u></strong> runs on two types of user accounts</h4>


 </div><!--intro-->

 <div class="row-col-12 row-col-lg-6 home-illus">
<home-accounts></home-accounts>
 </div>

</div><!--row-home-->


</div><!--container-->


</section>





<section id="testimonials">
	
<div class="body-container">

<div class="text-center">
<h3>Some recent article from our users</h3>
<div class="subtext">Our Mentors and Regular users create some insightful articles which they use to educate others.
</div>
</div>


<div class="news-columns cta-testimonial">

<div class="column-box" ng-repeat="item in home_articles">
<div href="articles/" class="news-column">
<span class="testimonial-quote">
<p layout="row" layout-align="start center">
<span> <i class="fas {{item.mode == 'blog' ? 'fa-rss':'fa-user-graduate'}}"></i> </span>
</p>
<div class="bolder mb5">
<a href="article/{{item.url}}">{{item.title}}</a></div>
<div ng-bind-html="((item.content | trusted) | strip_tags) | limitTo:'180'"></div>
</span>
<div class="testimonial-meta txt-sm" layout="row" 
layout-align="start center">
<span flex> <i class="fas fa-clock"></i>&nbsp; {{item.create_date*1000 | getTime}} </span>
<span></span>
</div>
<p class="testimonial-author" style="font-size: 15px;">
- <a href="{{item.author_url}}">{{item.firstname +' '+item.surname}}</a>
</p>
</div>
</div><!--column-box-->





</div><!--body-container-->

</section>


<section class="account-table-2 relative">
<div class="shade-2"></div>

<div class="body-container">

<div class="pos-top-marg row-home align-items-center">
<div class="row-col-12 row-col-lg-6 home-intro "> 
<h1 class="color-white">You can also take Sensei.ng wherever you go</h1>
<h4 class="color-white"><strong><u>Social Learning Network</u></strong> is also available on mobile. Our sleek and user friendly interface makes it super easy to use on smaller screens.</h4>


 </div><!--intro-->

 <div class="row-col-12 row-col-lg-6 home-illus">
<img src="images/phone-copy-4.png">
 </div>

</div><!--row-home-->


</div><!--container-->

</section>







<section id="testimonials">
	
<div class="body-container">

<div class="text-center limita">
<h2>Boost learning and fast track 
your progress with Sensei Plus</h2>
<div class="subtext">
Get unlimited and fast-tracked answers
</div>
</div>




<div class="booster-pane">
	<h1>GET SENSEI PLUS</h1>

<div class="row-home align-items-center">
<div class="row-col-12 row-col-lg-6"> 

<ul>
	<li>Get boosted activity feed</li>
	<li>Get boosted activity feed</li>
	<li>Get boosted activity feed</li>
	<li>Get boosted activity feed</li>
	<li>Get boosted activity feed</li>
</ul>
</div><!--intro-->

 <div class="row-col-12 row-col-lg-6 text-center booster-rocket">
<i class="fas fa-rocket"></i>
 </div>

</div><!--row-home-->


<div flex class="text-center py20">
<div class="intro-buttons">
<a href="./feed" class="intro-button secondary">
 START A FREE TRIAL TODAY
</a>
</div>
</div>


</div><!--column-box-->


</div><!--body-container-->

</section>



</div>




<?php include 'templates/base/footer.php'; ?>