/*! angular-paystack 0.1.0 2016-19-12
 *  AngularJS directives for Paystack Payment Gateway
 *  git: https://github.com/toniton/angular-paystack.git
 */

(function (window, angular, undefined) {
    'use strict';
    /*
     !
     The MIT License

     Copyright (c) 2010-2013 Google, Inc. http://angularjs.org

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the 'Software'), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.

     angular-paystack
     https://github.com/toniton/angular-paystack.git

     @authors
     Toniton - https://ng.linkedin.com/in/toni-akinjiola-42ba7a94
     */

    (function () {
        angular.module('paystack.providers', []);
        angular.module('paystack', ['paystack.providers']);
    }).call(this);

    (function () {
        var options = {
            transport: 'https',
            preventLoad: false,
            key: ''
        };
        angular.module('paystack.providers').factory('paystackScriptLoader', [
            '$q', function ($q) {
                //console.log("Paystack library initialized");
                var getScriptUrl, includeScript, isPaystackLoaded, scriptId;
                scriptId = void 0;
                getScriptUrl = function (options) {
                    if (options.transport === 'auto') {
                        return '//js.paystack.co/v1/inline.js';
                    } else {
                        return options.transport + '://js.paystack.co/v1/inline.js';
                    }
                };
                includeScript = function (options) {
                    var omitOptions, script, scriptElem;
                    if (scriptId) {
                        scriptElem = document.getElementById(scriptId);
                        scriptElem.parentNode.removeChild(scriptElem);
                    }
                    script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = getScriptUrl(options);
                    return document.body.appendChild(script);
                };
                isPaystackLoaded = function () {
                    return angular.isDefined(window.PaystackPop) && angular.isDefined(window.PaystackPop.setup);
                };
                return {
                    load: function (options) {
                        var deferred;
                        deferred = $q.defer();
                        if (isPaystackLoaded()) {
                            deferred.resolve(window.PaystackPop);
                            return deferred.promise;
                        }
                        if (window.navigator.connection && window.Connection && window.navigator.connection.type === window.Connection.NONE && !options.preventLoad) {
                            document.addEventListener('online', function () {
                                if (!isPaystackLoaded()) {
                                    return includeScript(options);
                                }
                            });
                        } else if (!options.preventLoad) {
                            includeScript(options);
                        }
                        return deferred.promise;
                    }
                };
            }
        ]).provider('$paystack', function () {
            this.configure = function (_options) {
                angular.extend(options, _options);
            };
            this.$get = [
                'paystackScriptLoader', (function (_this) {
                    return function (loader) {
                        return loader.load(options);
                    };
                })(this)
            ];
            return this;
        });


angular.module('paystack')
.directive('paystackPayButton',  [
            '$paystack', '$http', '$timeout',  'doPay',
function (paystackApi, $http, $timeout, doPay) {
return {
                    restrict: 'EMA',
                    template: `<a href class="btn {{payClass}}"
                    ng-click="startPay()"
                     ng-disabled="pstk_data.isLoading || pstk_data.isPaying">
                     <i class="fas fa-credit-card" ng-hide="pstk_data.isLoading || modalItem.isPaying"></i> 
                    <i class="fas  faa-flash animated fa-circle" 
                    ng-if="pstk_data.isLoading   || pstk_data.isPaying"></i> &nbsp;{{text || 'Pay Now'}} </a>`,
                    replace: true,
                    scope: {
                        payload:'=',
                        btnclass: '@',
                        callback: '@',
                        text: '@'
                    },
controller: function ($scope, $rootScope, doPay) {
console.log('Parent $scope ::', $scope.$parent.$parent);
$scope.pstk_data = {};
console.log('Payload ::',$scope.payload)
var par_scope = $scope.$parent.$parent;
$scope.payClass = ($scope.btnclass) ?  $scope.btnclass : 'btn btn-primary';
paystackApi.then((function (_this) {
var errorIcon = '<i class="fas fa-exclamation-triangle status-cancelled"></i>&nbsp; ';
var goodIcon = '<i class="fas fa-check-circle status-active"></i>&nbsp; ';
$scope.startPay = function(){
initPay();//allPay
}


$scope.payCallback = function(response,$scope){
doPay.setScope('modalItem',
    {message:'Processing Payment...',
    isLoading:true,isPaying:true,hide_summary:false},$scope);
doPay.verifyDirectPaystack(response.trxref).then(function(res) {
  console.log(res)
doPay.setScope('modalItem',{message:res.message,isLoading:false},$scope);
if(res.status == '1'){

doPay.dispatchArticle(response.trxref).then(function(res2){
console.log('dispatchArticle ::',res2)
var tx = {status:res2.status,reference:res2.reference};
doPay.markTranx(res2).then(function(rw){ console.log('markTranx::', rw); });
doPay.setScope('modalItem',{message:res2.message},$scope);
if(res2.status == '1'){

$timeout(function() {
doPay.setScope('modalItem',{message:'Finalizing transaction...',isLoading:false},$scope);
doPay.settleUser(res2.reference).then(function(res3){
console.log('settleUser ::',res3)
doPay.setScope('modalItem',{message:res3.message,isLoading:false},$scope);
$timeout(function() {
//$scope.isCollating   =  true, $scope.isCollated  =   false;
//var winx = carData.dir+'/my-articles';
//$window.location.replace(winx);  
}, 4000);
}, function(){
doPay.setScope('modalItem',{message:'Error settling author.',isLoading:false},$scope);
});//settleUser

}, 2000);//finalizing delay


}else{
doPay.setScope('modalItem',{message:'Error settling author.',isLoading:false},$scope);
 
}

}, function(){
doPay.setScope('modalItem',{message:'Error dispatching Article to your library.',isLoading:false},$scope);
 
});//creditWallet


}//status ==1 so dispatchOrder
else{
doPay.setScope('modalItem',
  {message:res.message,isLoading:false},
  $scope);
}

}, function(error){
console.log(error);
doPay.setScope('modalItem',{message:'Payment Verifiation Error.<br> Please Requery this Payment Transaction',isLoading:false},$scope);
});//verifyPaystack

}//cardPayCallback


var initPay = function(){
$scope.pstk_data.isLoading = true;
par_scope.modalItem.isPaying  = true;
$scope.payload.pay_mode = 'card';
$scope.payload.pay_vendor = 'paystack';
par_scope.message = 'Sending Payment Data...';
doPay.sendPay($scope.payload).then(function(res) {
par_scope.message = 'Payment Data Sent...';
$scope.pstk_data.isLoading = false;
});


$scope.pay_pop = false;
if(angular.isDefined(window.PaystackPop) && angular.isDefined(window.PaystackPop.setup)){
$scope.pay_pop = true;
var handler = PaystackPop.setup({
key: $scope.payload.paystack_pk_key,//options.key,
email: $scope.payload.email,
amount: parseInt($scope.payload.amount),
ref: $scope.payload.reference,
metadata: $scope.payload.metadata,
callback: function(response){
//console.log('callback Started::',response);
$scope.payCallback(response, par_scope);

},
onClose: function(response){
console.log('onClose Initiated');
par_scope.onCloseCallback($scope.payload.reference);
}
                                                                                                                                                                                                                      
});
handler.openIframe();  
}else{
let valx =     {message :`Payment Gateway Initiation Failed.
     Please Reload page and try again`,
     isPaying:true,
     hide_summary:true,
     pay_error: `<span class="txt-lg">
     <i class="fa fa-exclamation-triangle status-cancelled"></i>
     </span> 
     <div class="txt-md py10">
     <div>
     &nbsp;Connection to the payment gateway failed</div> <div>
     Please Check your internet connection and try again. 
     </div> 
     </div>
     </span>`};
doPay.setScope('modalItem',valx,par_scope); 
doPay.setPlainScope('PayStack','This is not working....',par_scope);   
}



}//startPay


})(this));//paystackApi

},
link: function ($scope, element, attrs,ctrl) {
return paystackApi.then((function (_this) {
console.log("Paystack library is loaded");
var tranx =  function($scope){
}($scope);
})(this));
}
};
}
]);
}).call(this);
})(window, angular);