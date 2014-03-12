'use strict';

/* Controllers */



angular.module('proyectosAppControllers', ['ui.bootstrap','ngUpload']).
  controller('MisproyectosCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
$http.get('json/proyectos.json').success(function(data) {
     $scope.arrProyectos = data;

     $scope.openDialog=function(tipo){
var templateUrl =''
var controlador = '' 

switch (tipo) { 
    case 'status': 
        templateUrl = 'partials/modal_Avance.html'
        controlador =  'modalActualizarEstado'
         break 
    case 'programacion': 
          templateUrl = 'partials/modal_programacion.html'
        controlador =  'modalProgramacion'
         break 
    case 'adjuntos': 
         
         break 
    case 'ver': 
         
         break 
    }
   var modalInstance = $modal.open({
      templateUrl: templateUrl,
      controller: controlador,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

     }
   });

  }])
  .controller('modalActualizarEstado', ['$scope','$modalInstance','$http',function($scope, $modalInstance,$http) {

$http.get('json/saludProyecto.json').success(function(data) {
$scope.saludProyecto= data 
})

$http.get('json/etapaProyecto.json').success(function(data) {
$scope.etapaProyecto= data 
})

$http.get('json/estadoProyecto.json').success(function(data) {
$scope.estadoProyecto= data 
})


  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }])

   .controller('modalProgramacion', ['$scope','$modalInstance','$http','mesesPlanificiacion',function($scope, $modalInstance,$http,mesesPlanificiacion) {

$scope.meses =mesesPlanificiacion
$http.get('json/etapaProyecto.json').success(function(data) {
$scope.etapaProyecto= data 
})

$http.get('json/programacion.json').success(function(data) {
$scope.arrProgramacion= data 
})

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }])
   .controller('crearProyectoCtrl', ['$scope','$http','$modal',function($scope,$http,$modal) {
$scope.submitted=false
   $http.get('json/empresas.json').success(function(data) {
$scope.empresa= data 
})



  }])
   .controller('dashBoardCtrl', ['$scope','$http','$modal','mesesPlanificacion',function($scope,$http,$modal,mesesPlanificacion){
$scope.usuario =''
   $http.get('json/statusProyecto.json').success(function(data) {
$scope.arrProyectos= data 
})

$http.get('json/programacionProyectos.json').success(function(data) {
$scope.arrProgramacion= data 
$scope.meses =mesesPlanificacion
})


   }
])
  .controller('loginCtrl', ['$scope', 'googleService','$window',function($scope, googleService,$window) {

$scope.login = function () {
                googleService.login().then(function (data) {
                    // do something with returned data
            

                      $window.location.href = "#/dashboard"
                }, function (err) {
                    console.log('Failed: ' + err);
                });
            };



   
   }]);


