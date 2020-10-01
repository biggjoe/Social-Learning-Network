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
//item.expand_text = (w_counter.length > length)? true:false;
var lesserd = first_n_words;//$filter('limitTo')($scope.stripped, 200, 0);
var result =  (stripped_count < length) ? cbody : lesserd;
//console.log($scope.item.init_comment)
/**/
var do_mark = (stripped_count < length) ? '' : '...';
return result+' '+do_mark;
}//return
}]);

zapp.filter('strip_tags', ['$sce', function($sce){
return function (content) {

var cbody = content;
var stripped = String(cbody).replace(/<[^>]+>/gm, '');
return stripped;
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

zapp.filter('showSize', function($filter) {    
    return function(text) {
      
      text = parseInt(text);
      var kb = 1024;
      var mb = kb*1000;
      var gb = mb*1000;
      var roundedNormal = Math.round((text) * 100) / 100;
      var roundedKb = Math.round((text/kb) * 100) / 100;
      var roundedMb = Math.round((text/mb) * 100) / 100;
      var roundedGb = Math.round((text/gb) * 100) / 100;
      if(roundedNormal < kb){
        return roundedNormal+'B';
      }else if((roundedNormal >= kb) && (roundedNormal < mb)){
       return roundedKb+'Kb';
       }else if((roundedNormal > kb) && (roundedNormal >= mb) && (roundedNormal < gb) ){
       return roundedMb+'Mb';
      }else if((roundedNormal > kb) && (roundedNormal > mb) && (roundedNormal >= gb)){
      return roundedGb+'Gb';
     }
    }
}).filter('showMime', function($filter) {    
    return function(text) {
      if(text == 'doc' || text == 'docx'){
        return '<i class="fas fa-file-word word" title="MS Word File"></i>';
      }else if(text == 'pdf'){
        return '<i class="fas fa-file-pdf pdf" title="PDF File"></i>';
       }else if(text == 'ppt'){
         return '<i class="fas fa-file-powerpoint powerpoint" title="MS Powerpoint File"></i>';
      }else if(text == 'jpg' || text == 'jpeg' || text == 'pjpeg' ||
       text == 'png' || text == 'gif'){
      return '<i class="fas fa-file-image image" title="Image File"></i>';
    }else if(text == 'xls' || text == 'xlsx'){
      return '<i class="fas fa-file-excel excel" title="MS Excel File"></i>';
     }
     //else if(text == 'csv'){
      //return '<i class="fas file-csv excel" title="CSV File"></i>';
     //}
     else{
      if(text){ var itxt = text.toUpperCase();}else{var itxt = '';}
      return '<i class="fas fa-file-alt" title="'+itxt+' File"></i>';
     }
    }
}).filter('getMime', function($filter) {    
    return function(string) {
      var vrk = string.split('.');
      var arnum = vrk.length;
      var text = vrk[arnum-1];
      if(text == 'doc' || text == 'docx'){
        return '<i class="fas fa-file-word word" title="MS Word File"></i>';
      }else if(text == 'pdf'){
        return '<i class="fas fa-file-pdf pdf" title="PDF File"></i>';
       }else if(text == 'ppt'){
         return '<i class="fas fa-file-powerpoint powerpoint" title="MS Powerpoint File"></i>';
      }else if(text == 'jpg' || text == 'jpeg' || text == 'pjpeg' ||
       text == 'png' || text == 'gif'){
      return '<i class="fas fa-file-image image" title="Image File"></i>';
    }else if(text == 'xls' || text == 'xlsx'){
      return '<i class="fas fa-file-excel excel" title="MS Excel File"></i>';
     }
     //else if(text == 'csv'){
      //return '<i class="fas file-csv excel" title="CSV File"></i>';
     //}

     else{
      if(text){ var itxt = text.toUpperCase();}else{var itxt = '';}
      return '<i class="fas fa-file-alt" title="'+itxt+' File"></i>';
     }
    }
})