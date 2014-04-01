'use strict';

/* Controllers */



angular.module('proyectosAppControllers', ['ui.bootstrap','ngUpload'])

    .run(function ($rootScope, $state,Session) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate){
        // User isn’t authenticated
       if (Session.authenticate==null){
         console.log('Failed: ');
                   event.preventDefault(); 
                    $state.transitionTo("login");

       }
        
      }
    });
  })
  .controller('MisproyectosCtrl', ['$scope','$http','$modal','userProject','Session','USER_EVENT',function($scope,$http,$modal,userProject,Session,USER_EVENT) {
        userProject.get({userId:Session.userId},function(userProject) {
            if (userProject.status==USER_EVENT.Found)
            {
                $scope.arrProyectos =userProject.proyectos ;

                $scope.openDialog=function(id,tipo){
                    var templateUrl =''
                    var controlador = ''
                    $scope.idproyecto=id;
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
                            idProyecto: function () {

                                return id;

                            }

                        }
                    });

                }

            }

        });


  }])
  .controller('modalActualizarEstado', ['$scope','$modalInstance','listaEstados','listaEtapa','listaSalud','USER_EVENT','proyectoApi','proyectoD','idProyecto',function($scope, $modalInstance,listaEstados,listaEtapa,listaSalud,USER_EVENT,proyectoApi,proyectoD,idProyecto) {
        $scope.proyecto ={};
      //   $scope.proyecto.idProyecto =idProyecto;
        listaEstados.get({},function(listaEstados) {
            if (listaEstados.status==USER_EVENT.Found)
            {
$scope.estadoProyecto= listaEstados.statusProyecto;
            }
           });

        listaEtapa.get({},function(listaEtapa) {
            if (listaEtapa.status==USER_EVENT.Found)
            {
                $scope.etapaProyecto= listaEtapa.etapaProyecto;

            }
});
        listaSalud.get({},function(listaSalud) {
            if (listaSalud.status==USER_EVENT.Found)
            {
                $scope.saludProyecto= listaSalud.saludProyecto;


            }


        });

console.log(proyectoD)
        proyectoD.get({id:idProyecto},function(proyectoD) {
            if (proyectoD.status==USER_EVENT.Found)
            {

                $scope.proyecto= proyectoD.proyecto[0];
                console.log($scope.proyecto)

            }


        });


        $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

        //actualizacion y creacion del registro en el historial de proyecto



   $scope.actualizarProyecto = function () {



       var postData = new proyectoApi();
       postData.id = idProyecto;
       postData.$create($scope.proyecto, function(data){

           $scope.data = data;
           $modalInstance.dismiss('cancel');
       })



    };

  }])

   .controller('modalProgramacion', ['$scope','$modalInstance','$http','mesesPlanificacion','ApiListas','USER_EVENT','planificacionApi','idProyecto','listadoPlanificacion',function($scope, $modalInstance,$http,mesesPlanificacion,ApiListas,USER_EVENT,planificacionApi,idProyecto,listadoPlanificacion) {
$scope.planificacion = {};
$scope.meses =mesesPlanificacion

        ApiListas.etapaProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

               $scope.etapaProyecto= ApiListas.etapaProyecto;
            }
        });


        ApiListas.etapaProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.etapaProyecto= ApiListas.etapaProyecto;
            }
        });

        listadoPlanificacion.get({id:idProyecto},function(listadoPlanificacion) {
            if (listadoPlanificacion.status==USER_EVENT.Found)
            {

                $scope.arrProgramacion= listadoPlanificacion.programacion;
            }
        });



/*
        $http.get('json/programacion.json').success(function(data) {
$scope.arrProgramacion= data 
})
*/

  $scope.crearPlanificacion = function () {

      var postData = new planificacionApi();

      $scope.planificacion.mes1= $scope.meses[0];
      $scope.planificacion.mes2= $scope.meses[1];
      $scope.planificacion.mes3= $scope.meses[2];
      $scope.planificacion.mes4= $scope.meses[3];
      postData.idproyecto = idProyecto;
      console.log(postData.idproyecto);
      $scope.planificacion.idproyecto =idProyecto;

      postData.$create($scope.planificacion, function(data){

          $scope.data = data;
          $modalInstance.dismiss('cancel');
      })


  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }])
   .controller('crearProyectoCtrl', ['$state','$location','$scope','$modal','ApiListas','USER_EVENT','proyectoA','Session',function($state,$location,$scope,$modal,ApiListas,USER_EVENT,proyectoA,Session) {

        $scope.proyecto ={};
        $scope.mostrarMensaje=false;
        ApiListas.Empresas.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.empresa= ApiListas.Empresas;
            }
        });
        ApiListas.tipoEstrategia.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.estrategia= ApiListas.Estrategia;
            }
        });

        ApiListas.etapaProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.etapaProyecto= ApiListas.etapaProyecto;
            }
        });

        ApiListas.saludProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {
                console.log(ApiListas.Empresas)
                $scope.saludProyecto= ApiListas.saludProyecto;
            }
        });

        $scope.crearProyecto = function () {
            $scope.submitted=true;

if ($scope.form.$valid)
{
            var postData = new proyectoA();
$scope.proyecto.jefeProyecto = Session.userId;
            $scope.proyecto.jefeProyecto = Session.userId;
            $scope.proyecto.bP=Session.bP;
            postData.$create($scope.proyecto, function(data){


                $scope.data = data;
                $scope.submitted=true;
                $state.transitionTo("dashboard");
            })

}
            else
{
$scope.mostrarMensaje=true;
    $location.hash('mensaje');
    //TODO agregar mensaje
}

        };



  }])
   .controller('dashBoardCtrl', ['$scope','$http','$modal','mesesPlanificacion','restDashboard','Session','USER_EVENT',function($scope,$http,$modal,mesesPlanificacion,restDashboard,Session,USER_EVENT){

        $scope.pSanos=0;
        $scope.pAlerta = 0;
        $scope.pCriticos=0;
        restDashboard.porSalud.get({userId:Session.userId},function(proyectosporSalud) {

            if (proyectosporSalud.status==USER_EVENT.Found)
            {

                for(var i=0;i<proyectosporSalud.porSalud.length;i++){

                    switch (proyectosporSalud.porSalud[i].Tipo) {
                        case "1":
                            $scope.pSanos  =proyectosporSalud.porSalud[i].cantidad
                            break;
                        case "2":
                            $scope.pAlerta  =proyectosporSalud.porSalud[i].cantidad
                            break;
                        case "3":
                            $scope.pCriticos  =proyectosporSalud.porSalud[i].cantidad
                            break;
                    }


                }



            }
        });

        restDashboard.listadoBP.get({userId:Session.userId},function(proyectosBP) {


            if (proyectosBP.status==USER_EVENT.Found)
            {
                $scope.arrProyectos =proyectosBP.proyectos;
                console.log(proyectosBP.proyectos)
            }

        });

        restDashboard.planificacion.get({userId:Session.userId},function(planificacion) {


            if (planificacion.status==USER_EVENT.Found)
            {
                $scope.arrProgramacion =planificacion.programacion;
                $scope.meses =mesesPlanificacion

            }

        });


        //Proyectos por Etapa/Estado


        restDashboard.porTipo.get({userId:Session.userId},function(porTipo) {

$scope.porTipo = porTipo.porTipo;

        });






   }
])
  .controller('loginCtrl', ['$scope', 'googleService','$state','$routeParams', 'usersLoginRest','Session','USER_EVENT',function($scope, googleService,$state,$routeParams, usersLoginRest,Session,USER_EVENT) {
        $scope.mostrarMensaje=false
$scope.login = function () {

                googleService.login().then(function (data) {
                    //TODO: mejorar como puedo usar el metodo promise para evitar el settimeout.
                    setTimeout(function(){
                        usersLoginRest.get({userId:data.email}, function(usersLoginRest) {
                            if (usersLoginRest.status==USER_EVENT.userFound)
                            {
                                //crear Session de usuario
                                Session.create(data.id,data.email,usersLoginRest.rol,data.nombre,data.bp)
                                $state.transitionTo("dashboard");
                            }
                            else
                            {
                                //TODO FALTA DEFINIR MENSAJE Y METODO SI NO EXISTE EL USUARIO

                                $scope.mostrarMensaje=true;
                            }


                        });

                    },2000);



                }, function (err) {
                    console.log('Failed: ' + err);
                });
            };



   
   }]);


