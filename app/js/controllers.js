'use strict';

/* Controllers */

angular.module('proyectosAppControllers', ['ui.bootstrap']).
  controller('MisproyectosCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
$http.get('json/proyectos.json').success(function(data) {
     $scope.arrProyectos = data;
 
     $scope.openDialog=function(){

   var modalInstance = $modal.open({
      templateUrl: 'partials/modal_Avance.html',
      controller: 'modalActualizarEstado',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

     }
   });

  }])
  .controller('modalActualizarEstado', ['$scope','$modalInstance',function($scope, $modalInstance) {



  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }])
  .controller('mainController', ['$scope',function($scope) {

  	 $scope.message='HOLA AMOR'



  }]);


