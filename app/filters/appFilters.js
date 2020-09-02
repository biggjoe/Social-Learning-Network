var zapp = angular.module('app.filters', []);

zapp.filter('getDateTime', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
      var nowUnix = new Date();
      var refUnix = new Date(parseInt(theDate));
      if(nowUnix.getDate() == refUnix.getDate()){
        return angularDateFilter(theDate, 'h:mm a');
      }else{
       return angularDateFilter(theDate, 'MMM d @ h:mm a');
     }
    }
});
zapp.filter('getFullDate', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
      var nowUnix = new Date();
      var refUnix = new Date(parseInt(theDate));
       return angularDateFilter(theDate, 'MMM d, yyyy');
     
    }
});
zapp.filter('getTime', function($filter) {    
    var angularDateFilter = $filter('date');
    return function(theDate) {
      //console.log('Ref :: ',theDate)
      var nowUnix = new Date();
      var refUnix = new Date(parseInt(theDate));

//console.log('Now GetYear :: ',nowUnix.getFullYear())
//console.log('nowUnix getMonth:: ',nowUnix.getMonth())
//console.log('refUnix getMonth:: ',refUnix.getMonth())
      if(nowUnix.getDate() == refUnix.getDate() 
        && (refUnix.getMonth() == nowUnix.getMonth()) 
        && (refUnix.getFullYear() == nowUnix.getFullYear())  ){
        return angularDateFilter(theDate, 'h:mm a');
      }else if(
        (refUnix.getFullYear() == nowUnix.getFullYear()) 
        && (refUnix.getMonth() != nowUnix.getMonth())){
       return angularDateFilter(theDate, 'MMM d @ h:mm a');
       }else if(
        (refUnix.getFullYear() == nowUnix.getFullYear()) 
        && (refUnix.getMonth() == nowUnix.getMonth())
        && nowUnix.getDate() != refUnix.getDate()
        ){
       return angularDateFilter(theDate, 'MMM d @ h:mm a');
      }else if( refUnix.getYear() !== nowUnix.getYear() ){
      return angularDateFilter(theDate, 'MMM d, yyyy');
     }
    }
})
;

zapp.filter('trimWordsxx', ['$sce', function($sce){
return function (content, length, marker) {
// console.log(content, length, marker)
content ? String(content).replace(/<[^>]+>/gm, '') : ''; 
var wordCounter = content.split(' ');
var firstNWords = wordCounter.slice(0,length).join(' ');
marker = (marker) ? marker : '...';
return firstNWords + ' ' + marker ;
}//return
}]);


zapp.filter('trimWords', ['$sce', function($sce){
return function (content, length, item) {

var cbody = content;
//$scope['comment'] = $scope['item']['comment'];
var stripped = String(cbody).replace(/<[^>]+>/gm, '');
var w_counter = stripped.split(' ');
var first_n_words = w_counter.slice(0,length).join(' ');
var stripped_count = w_counter.length ;
item.expand_text = (w_counter.length > length)? true:false;
var lesserd = first_n_words;//$filter('limitTo')($scope.stripped, 200, 0);
var result =  (stripped_count < length) ? cbody : lesserd;
//console.log($scope.item.init_comment)
/**/
var do_mark = (stripped_count < length) ? '' : '...';
return result+' '+do_mark;
}//return
}]);

zapp.filter('trusted', ['$sce', function($sce) {
    var div = document.createElement('div');
    return function(text) {
        div.innerHTML = text;
        return $sce.trustAsHtml(div.textContent);
    };
}]);

zapp.filter('getStatus', ['$sce', function($sce){
  return function(number){
    number = parseInt(number);
    if(number < 0){
      return '<i class="fas fa-exclamation-triangle status-cancelled" title="Failed or Cancelled"></i>';
    } else if(number == 0){
       return '<i class="fas fa-hourglass-half status-pending" title="Pending"></i>';
      } else if(number == 1){
       return '<i class="fas fa-check-circle status-active" title="Completed"></i>';
       }
    }
}]);