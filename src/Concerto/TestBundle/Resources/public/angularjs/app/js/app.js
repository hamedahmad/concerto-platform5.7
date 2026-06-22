'use strict';

var testRunner = angular.module('testRunner', [
    'ngSanitize',
    'angularFileUpload'
]).config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    $httpProvider.defaults.transformRequest = [
        function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }
    ];
}).config(function ($controllerProvider) {
    testRunner.controllerProvider = $controllerProvider;
}).config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});


var FocusAn = true;
var VollBild = true;

function testAus() {
    FocusAn = false;
    document.body.classList.add('paused');
    logFocus('aus')
}

function testAn() {
    FocusAn = true;
    document.body.classList.remove('paused');
    logFocus('an')
}

function logFocus(status)
{

    let focus_logs = document.getElementById('focus_logs');
    if(!focus_logs)
    {
        var x = document.createElement("TEXTAREA");
        x.setAttribute("id", "focus_logs");
        x.style.cssText = 'display:none;';
        focus_logs = document.getElementById('focus_logs');
        document.body.appendChild(x);
   }

    const heute  = new Date();
    const tag = heute.getDate()<10 ? '0'+ heute.getDate() : heute.getDate();
    const monat = (heute.getMonth()+1)<10 ? '0'+ (heute.getMonth()+1) : (heute.getMonth()+1);
    const jahr = heute.getFullYear()<10 ? '0'+ heute.getFullYear() : heute.getFullYear();
    const stunde = heute.getHours()<10 ? '0'+ heute.getHours() : heute.getHours();
    const minute = heute.getMinutes()<10 ? '0'+ heute.getMinutes() : heute.getMinutes();
    const sekunde = heute.getSeconds()<10 ? '0'+ heute.getSeconds() : heute.getSeconds();

    const VollZeit = tag + "."
            + monat  + "." 
            + jahr + " "  
            + stunde + ":"  
            + minute + ":" 
            + sekunde;

    const currFocusLogs = focus_logs.value;
    const aktuelleLogs = currFocusLogs.length ? JSON.parse(currFocusLogs) : [];
    const textZumSpeichern = {status:status,zeit:VollZeit}
    aktuelleLogs.push(textZumSpeichern)
    focus_logs.value = JSON.stringify(aktuelleLogs);
}

    window.addEventListener('blur', testAus);
    window.addEventListener('focus', testAn);
    console.log('focus listenaer Added');
