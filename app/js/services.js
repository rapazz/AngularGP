'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('proyectosAppServices', []).
  value('version', '0.1');

//Funcion que arma la programacion.
angular.module('proyectosAppServices', [])
.service('Session',['$http', function ($http) {
  this.create = function (sessionId, userId, userRole,nombre,bP) {
    this.id = sessionId;
    this.userId = userId;
      this.userName = nombre
    this.userRole = userRole;
      this.authenticate= true;
      this.bp;
      $http.defaults.headers.common['proyectosApp'] =sessionId;
  };

  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
    this.userName = null;
      this.authenticate= null;
  };
  return this;
}])
    .service('mesesPlanificacion', function () {
        
        var dateStr ="";
  var dateObj = new Date()
  var mm =dateObj.getMonth()
  var ArrMeses =[]
  var meses = mm
  for (var i=0;i<=3;i++)
  {
   
   switch(meses)
   {
     case 0:
       ArrMeses.push("ENERO")
         break;
     case 1:
        ArrMeses.push("FEBRERO")
          break;
     case 2:
        ArrMeses.push("MARZO")
          break;
     case 3:
        ArrMeses.push("ABRIL")
          break;
     case 4:
        ArrMeses.push("MAYO")
          break;
     case 5:
        ArrMeses.push("JUNIO")
          break;
     case 6:
        ArrMeses.push("JULIO")
          break;
     case 7:
        ArrMeses.push("AGOSTO")
          break;
     case 8:
        ArrMeses.push("SEPTIEMBRE")
          break;
     case 9:
        ArrMeses.push("OCTUBRE")
          break;
     case 10:
        ArrMeses.push("NOVIEMBRE")
          break;
     case 11:
        ArrMeses.push("DICIEMBRE")
          break;
       
   }
       meses = (meses>11)?0:(meses +1)
  }

var objMeses={}
objMeses.mes1 = ArrMeses[0] 
objMeses.mes2 = ArrMeses[1] 
objMeses.mes3 = ArrMeses[2] 
objMeses.mes4 = ArrMeses[3]   

  return ArrMeses
  
        })
.service('googleService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
            var clientId = '831491199430-80elp5cleulr6rc317b0dtbq7ce0ga5p.apps.googleusercontent.com',
                apiKey = 'f3X4tAwnQhCpZ6Nuy7HPHzTB',
                scopes = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile',
                domain = '',
                deferred = $q.defer();
 
            this.login = function () {
             
                gapi.auth.authorize({ 
                    client_id: clientId, 
                    scope: scopes, 
                    immediate: false, 
                    hd: domain 
                }, this.handleAuthResult);

                return deferred.promise;
            }
 
            this.handleClientLoad = function () {
                gapi.client.setApiKey(apiKey);
                gapi.auth.init(function () { });
                window.setTimeout(this.checkAuth, 1);
            };
 
            this.checkAuth = function() {

                gapi.auth.authorize({ 
                    client_id: clientId, 
                    scope: scopes, 
                    immediate: true, 
                    hd: domain 
                }, this.handleAuthResult);

                 return deferred.promise;
            };
 
            this.handleAuthResult = function(authResult) {

                if (authResult && !authResult.error) {
                    var data = {};
                    gapi.client.load('oauth2', 'v2', function () {
                        var request = gapi.client.oauth2.userinfo.get();
                        request.execute(function (resp) {

                            data.email = resp.email;
                            data.nombre =resp.name;
                            data.id = resp.id;
                        });
                    });
                    deferred.resolve(data);
                } else {
                    deferred.reject('error');
                }

                return deferred.promise;
            };
 this.logOut = function(){
 gapi.client.load('oauth2', 'v2', function () {
                        gapi.auth.setToken(null);
                      })

 }
            this.handleAuthClick = function(event) {
                gapi.auth.authorize({ 
                    client_id: clientId, 
                    scope: scopes, 
                    immediate: false, 
                    hd: domain 
                }, this.handleAuthResult);
                return false;
            };
 
        }]);

  