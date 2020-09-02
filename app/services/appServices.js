var zapp = angular.module('app.services', ['app.factories']);

zapp.service('fileUpload', ['$http', function ($http) {          
return { 
uploadFileToUrl: function(fd, uploadUrl){
return $http.post(uploadUrl, fd, 
{transformRequest: angular.identity,headers: {'Content-Type': undefined}
});
}
}
}]);






zapp.service('dateMani', ['dateArrays', function (dateArrays) {          
var self = {};
self.market_day_calc = function(tda,language){
//console.log(language);
language = (language) ? language:"english";
var pos_market_days = dateArrays.pos_market_days[language];
var neg_market_days = dateArrays.neg_market_days[language];
var ref_eke_day = dateArrays.ref_eke_day;
//console.log(ref_eke_day)
const months = dateArrays.naija_months;
//console.log(months[language])
const now = new Date(tda);
const ref_date = ref_eke_day[language];
const then = new Date(ref_date);
//console.log('ref_date ::',then)
//console.log('today_date ::',now)
var daySeconds = 60*60*24*1000;
let now_seconds = now.getTime();
let now_date = now.getDate();
let then_seconds = then.getTime();
//console.log('now ::',now_seconds)
//console.log('then ::',then_seconds)
let diff_seconds = Math.ceil(now_seconds-then_seconds);
let is_neg = (diff_seconds < 0) ? true:false;
let diff_days = (is_neg) ? ((diff_seconds*-1)/daySeconds) : diff_seconds/daySeconds;
let dindex = diff_days%4;
let mar_day = (is_neg) ? 
neg_market_days[dindex] : pos_market_days[dindex];
var result = {};
result.xmarket_day = mar_day;
result.xday_difference = diff_days;
var thix = dateArrays.naija_days[language][now_date];
result.xigbo_day = thix;
result.xday_date = now_date;
result.xday_modul = dindex;
result.xday_unix = now_seconds;
var tmt = now.getMonth();
var tmy = now.getFullYear();
result.xday_month = tmt;
result.xday_year = tmy;
result.xday_igbo_month = dateArrays.naija_months[language][tmt];
result.xraw_date = tda;
result.xday_era = (is_neg) ? 'past':'future';
//console.log(result)
return result;
}//date_diff_now

return self;
}]);