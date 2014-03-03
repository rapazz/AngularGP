'use strict';

/* Controllers */

angular.module('proyectosAppControllers', []).
  controller('MisproyectosCtrl', ['$scope','$http',function($scope,$http) {
$http.get('json/proyectos.json').success(function(data) {
     $scope.arrProyectos = data;
   });





  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('mainController', ['$scope',function($scope) {

  	 $scope.message='HOLA AMOR'



  }]);