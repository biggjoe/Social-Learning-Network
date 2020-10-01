var zapp = angular.module('app.factories', []);
zapp.factory('pushReq', ['$http', function ($http) {
var self = {};
var resloveReq = (res)=>{return res;} 
var rejectReq = (error,index)=>{return {error:error,index:index};}  
self.send = function (index,data) {
                return $http.post('modules/general/generalApp.php',
                  data).then(resloveReq,rejectReq(index));
            }

return self;
    }]);
zapp.service('fileUpload', ['$http', function ($http) {          
return { 
uploadFileToUrl: function(fd, uploadUrl){
return $http.post(uploadUrl, fd, 
{transformRequest: angular.identity,headers: {'Content-Type': undefined}
});
}
}
}]);
zapp.service('run', ['$rootScope', '$http',
	function ($rootScope,$http) {          
var self = {};
self.getUserData = function() {
var para = {action:'getUserData'}, 
vLink = 'modules/account/accountApp.php';
return $http.post(vLink,para).then(function(res) {
//console.log('getUserData : ', res)
return res.data;
});
}//getUserData


self.getList = function(dt,$scope){
  console.log(dt)
$scope[dt['loading']] = true;
$scope[dt['loaded']] = false;
let appLink = dt['url'];
let payLoad = {action:'get_'+dt['scope']}
$http.post(appLink,payLoad).then(function(rp) {
console.log(rp);
rs = rp.data;
var skp = dt['scope']
$scope[dt['loading']] = false;
$scope[dt['loaded']] = true;
$scope[skp]  = rs[skp];
})
}//getList

self.getloadMore = function(dt,$scope){
//console.log('Fetching Feed...',dt);
dt['loaded'] = (dt['loaded']) ? dt['loaded']:'isFetched'
//console.log('Parent Scope...',$scope);
    $scope[dt['loading']]  = true;
    $scope[dt['btn_text']] = 'Loading More Items...';
    $scope[dt['btn_icon']] = 'fa-spin fa-circle-notch';
    $scope[dt['loaded']]  = false;
    let appLink = dt['url'];
    let ipar = dt['params'];
    let defaults = {offset:$scope[dt['feed_offset']], 
    limit:$scope[dt['feed_rows']]};
    let payLoad = {...ipar,...defaults};
    $http.post(appLink,payLoad).then(function(res){
      let scope = dt['feed_scope'];
   console.log('scope : ',scope, ' res :: ',res);

    $scope[dt['loading']]  = false;
    $scope[dt['loaded']]  = true;
    $scope[dt['btn_text']] = 'Load More';
    $scope[dt['btn_icon']] = 'fa-chevron-down';
    $scope.isFetching  = false;
    let newFeed = res.data[dt['feed_scope']];
    //console.log('newFeed :: ',newFeed)
    $scope[scope] = (newFeed.length > 0 ) ?
     $scope[scope].concat(newFeed) : $scope[scope];
    if(newFeed.length > 0){
    $scope[dt['feed_offset']] = $scope[dt['feed_offset']]+$scope[dt['feed_rows']];
    $scope[dt['disable_btn']]  = false;
  }else{
    $scope[dt['feed_end']]  = true;
    $scope[dt['disable_btn']]  = true;
    $scope[dt['btn_text']] = 'End of List';
    $scope[dt['btn_icon']] = 'fa-ban';
    }
    });//$http

}//getloadMore

return self;

}]);
zapp.factory('parse', ['$http', '$timeout', '$rootScope', '$window',
  function($http, $timeout, $rootScope, $window) {

var self = {};

self.dress_notice = function(obj) {
console.log(obj);
var message = (obj.message) ? obj.message : 
(obj.mess) ? obj.mess :'';
var iclass = (obj.class) ? obj.class:'';
var status = (obj.status) ? obj.status : 
(obj.state) ? obj.state : '';
var bg_class = (status == '1') ? ' bg-success ':
(status == '0') ? ' bg-warning ':
(status == '-1') ? ' bg-danger ':
(status == '44') ? ' bg-neutral ':
' ';
var bg_icon = (status == '1') ? ' fa-check-circle ':
(status == '0') ? ' fa-exclamation-triangle ':
(status == '-1') ? ' fa-exclamation-triangle ':
(status == '44') ? ' fa-info-circle ':
' ';
var html = `<div class="notice-div br2 mb10
 `+bg_class+`">
<div class="notice-icon-section txt-md text-center"> <i class="fas `+bg_icon+`"></i> </div>
<div class="notice-message-section px20 py20">`+message+`</div>
</div>`;
console.log(html)
return html;
};

return self;
}]);


zapp.factory('modal', ['$rootScope', 'ngDialog', function ($rootScope, ngDialog) {
var rets = {};
var is = '';
rets.show = function(data,$scope) {
//$rootScope.modalData = data.data;
console.log(data.data);
let idata = data.data;
//if(data.plain){'<p>my template</p>'}
let iclass = (idata.class_name && idata.class_name !== undefined) ?
  idata.class_name:'ngdialog-theme-default';
let closeMeDoc = (idata.doc_close && idata.doc_close !== undefined) ?
true:false;
var isPlain = (data.plain && data.plain !== '') ? data.plain: false;
var dial = ngDialog.open({
template:data.page,
controller: data.ctrl,
scope : $scope,
data:data,
name:data.data.name,
plain:isPlain,
width:data.data.width,
showClose:false,
closeByDocument:closeMeDoc,
className:iclass
});
//console.log($rootScope);

dial.closePromise.then(function (param) {
}).$result;
is += dial.id;
//console.log()
}




rets.close = function() {
ngDialog.close()
}
return rets;

}]);

zapp.factory('toast', ['$sce', 'ngDialog',
 function ($sce, ngDialog) {
var rets = {};
rets.show = function(data,$scope) {
var span = document.createElement('span');
span.innerHTML = data.message;
var tMess = $sce.trustAsHtml(span.textContent);
var hideTitle = 
(data.hideTitle!==undefined && data.hideTitle!=='') ? data.hideTitle : false;
var idata = {
  message:data.message,
  title:data.title, 
  hideTitle:hideTitle
}
var dial = ngDialog.open({
template:'templates/dialogs/custom_toast.html',
scope : $scope,
data:idata,
showClose:true,
closeByDocument:false
});
}



rets.close = function() {
ngDialog.close()
}
return rets;

}]);



zapp.factory('cartApp', ['$sce', '$http', 'ngDialog', '$q',
 function ($sce, $http, ngDialog, $q) {
var self = {};
var app_url = 'modules/general/vinApp.php';  
 self.save = (cartItems)=>{
  console.log(cartItems);
  if(cartItems.storage_mode == 'server'){
$id = cartItems.storage_id;
$http.post('modules/general/vinApp.php',
  {action:'updateCart',data:cartItems,id:$id}).then(function(res2){
console.log('server res :: ',res2);
rz = res2.data;
})

  }else{
var strItems = JSON.stringify(cartItems);
window.localStorage.setItem('cartItems',strItems);
  }
 }  
  
 self.saveToDb = function(){
  self.getCart().then(function(res1){
    console.log('cartItems :: ',res1)
$http.post('modules/general/vinApp.php',{action:'saveCart',data:res1}).then(function(res2){
console.log('server res :: ',res2);
rz = res2.data;
if(rz.state == '1'){
self.emptyCart();  
}
})

});
 }


self.getCart = ()=> {
  // perform some asynchronous operation, resolve or reject the promise when appropriate.
    var ca = window.localStorage.getItem("cartItems");
  if(ca !=='' && ca !==undefined && ca !== null && ca !== 'null' && ca !== 'undefined'){
 var parsexItems = JSON.parse(window.localStorage.getItem('cartItems'));
  }else{var parsexItems = {selected:[]}; }

//console.log(parsexItems.selected)

  return $q(function(resolve, reject) {
    //setTimeout(function() {
      if(!parsexItems || parsexItems.selected.length == 0){
    //console.log('paser is 0')
    $http.post(app_url,{action:'getCart'}).then(function(res){
    resolve(res.data.data);
    })
      }
      else if (parsexItems) {
        parsexItems['storage_mode'] = 'local';
        resolve(parsexItems);
      } else {
        reject('Error');
      }
    //}, 1000);
  });
}

self.remove = ()=>{
    window.localStorage.removeItem("cartItems");
 }  
self.emptyCart = function() {
window.localStorage.removeItem("cartItems");
}
self.dispatchOrder = (request_token)=> {
  var plink = 'modules/general/vinApp.php';
  var para = {action:'dispatchOrder', request_token:request_token};
  return $http.post(plink,para).then(function(res) {
  console.log(res);
  var rs = res.data;
  return rs;
  
  });
  
  }



 self.saveProgress = function(){
   window.localStorage.setItem('next_action','true');
   window.localStorage.setItem('next_url','./account/checkout');
  } 

  self.getProgress = function(){
 var action = JSON.parse(window.localStorage.getItem('next_action'));
 var next_url = JSON.parse(window.localStorage.getItem('next_url'));
 return {action:action,next_url:next_url};
   }


self.startCheckout = function(){
return window.location.replace('./account/checkout');
}




self.removeItem  = (obj)=>{
console.log(obj)
self.getCart().then(function(res){
  console.log('Recovered cartItem :: ',res)
let cartItem = res;
var idx = cartItem.selected.indexOf(obj);
console.log('indexOf :: ',idx)
if (idx > -1) {
cartItem.selected.splice(idx, 1);
}
console.log('After remove cartItem :: ',cartItem)
self.save(cartItem);
});

/**/
}//removeItem


return self;

}]);//cartApp

zapp.factory('doBuy', ['$http', '$q', '$timeout',
 function ($http, $q, $timeout) {
 self = {};
  
self.payAndDispatch = function(cartItem,cost,$scope){
$scope['isLoading'] = true;
let app_url = 'modules/general/vinApp.php';
return $http.post(app_url,{action:'payAndDispatch',cart:cartItem,cost:cost})
.then(function(rsp){
console.log(rsp);
return rsp.data;
});//
}//payAndDispatch


return self;

}]);//cartApp



zapp.factory('doPay', ['$http', '$timeout', '$rootScope', '$window',
  function($http, $timeout, $rootScope, $window) {
var payLink = 'modules/payment/paymentApp.php';
var self = {};

self.sendPay = function(tx) {
  console.log(tx)
var adata = 
{
reference:tx.ref, 
amount:tx.amount, 
transactionName:tx.transactionName,
article_id:tx.article_id, 
pay_vendor:tx.pay_vendor, 
pay_mode:tx.pay_mode,  
action:'initiateTransaction'
};
return $http.post(payLink,adata).then(function(res) {
console.log(res); 
return res;

});

};

self.fundWallet = function(ref) {
var idat = {action:'fundWallet',ref:ref};
return $http.post(payLink,idat).then(function(res){
return res.data;
});
}//fundWallet


self.setSite = function() {
var idat = {action:'siteDetails'};
return $http.post(payLink,idat).then(function(res){
return res.data;
});
}

self.setVals = function() {
var idat = {action:'userDetail'};
return $http.post(payLink,idat).then(function(res){
return res.data;
});
},



self.setScope = function(name,values,$scope){ 
angular.forEach(values, function(value, key) {
  $scope[name][key] = value;
});

}//

self.setPlainScope = function(name,value,$scope){
  $scope[name] = value;
}//

self.showFalseReload = function(message,scope,$scope){
$scope[scope].isLoading = false;
$scope[scope].message = message;   
$scope[scope].isCollating   =  true, 
$scope[scope].isCollated  =   false; 
$scope[scope].isCarded = false;
$timeout(function() {
//$window.location.reload();  
$scope[scope]['closeModal']();  
}, 10000); 
}

self.endPay = function(scope,$scope){
$timeout(function() {
$scope[scope]['closeModal'](); 
}, 10000); 
}

self.nullifyPay =  function(reference) {
var ndata = {ref:reference, action:'nullifyTransaction'};
return $http.post(payLink,ndata).then(function(res) {
console.log(res); 
return res.data;

});
};

self.dispatchArticle = function(reference) {
var para = {action:'dispatchArticle', reference:reference,};
return $http.post(payLink,para).then(function(res) {
console.log(res);
return res.data;

});

}

self.settleUser = function(ref) {
var para = {action:'settleUser', reference : ref };
return $http.post(payLink,para).then(function(res) {
console.log(res);
return res.data;

});

}


self.payCallback = function(response, $scope){
console.log('res:: ',response,  'Scope:: ', $scope)
self.setScope('modalItem',
    {message:'Processing Payment...',
    isLoading:true,isPaying:true},$scope);
self.verifyDirectPaystack(response.trxref).then(function(res) {
  console.log(res)
self.setScope('modalItem',
    {message:res.message,isLoading:false,isPaying:true},$scope);
if(res.status == '1'){
self.activateSubscription(response.trxref).then(function(res2){
console.log('activate_subscription :: ',res2)
var tx = {status:res2.status,reference:res2.reference};
self.markTranx(tx);
}, function(){
self.setScope('modalItem',{message:'Error Setting up subscription. Please Contact Admin.',isLoading:false},$scope);
 
});//creditWallet
}//status ==1 so save order
else{
self.setScope('modalItem',{message:res.message,isLoading:false},$scope);
 
}

}, function(error){
console.log(error);
self.setScope('modalItem',{message:'Payment Verifiation Error.<br> Please Requery this Payment Transaction',isLoading:false},$scope);
});//verifyPaystack

}//cardPayCallback




self.verifyDirectPaystack = function(reference) {
var bdata = {ref:reference, action:'verifyPaystackDirectTransaction'};
return $http.post(payLink,bdata).then(function(res) {
console.log(res);
return res.data;

});

}//verifyDirectPaystack



self.markTranx = function(tx) {
var ndata = {reference:tx.reference, status:tx.status, 
  action:'markTransaction'};
console.log('Sending markTransaction')
return $http.post(payLink,ndata).then(function(res) {
  console.log(res)
return res.data;

});
}//markTranx

return self;

}]);
//doPay

var tConfig = function($mdThemingProvider) {

  $mdThemingProvider.definePalette('amazingPaletteName', {
    '50': 'E0F2F1',
    '100': 'B2DFDB',
    '200': '80CBC4',
    '300': '4DB6AC',
    '400': '26A69A',
    //'500': '00897B',
    '500': '179dd6',
    '600': '179dd6',
    '700': '00796B',
    '800': '00695C',
    '900': '004D40',
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName')

}

zapp.config(tConfig);
